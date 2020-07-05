const express = require("express");
const { ValidationError, Op } = require("sequelize");
const handleValidationError = require("../helpers/handleValidationError");
const Order = require("../models/sequelize/Order");
const User = require("../models/sequelize/User");
const Address = require("../models/sequelize/Address");
const PaymentService = require("../services/PaymentService");
const router = express.Router();

const confirmPaymentUrl = "http://google.fr/";
const cancelOrderUrl = "http://youtube.com";

router.get("/", (req, res) => {
  const queryOptions = {
    paranoid: false,
    include: [{
      model: Address,
      as: 'billing'
    }, {
      model: Address,
      as: 'shipping'
    }]
  }
  if (!req.user.isAdmin()){
    queryOptions.where = {UserId: req.user.id}
  }
  Order.findAll(queryOptions)
    .then(orders => res.json(orders))
    .catch(err => {
      console.error(err)
      return res.sendStatus(500)
    });
});

router.post("/", async (req, res) => {
  const {billing, shipping} = req.body;
  const billingAddress = await Address.create(billing);
  const shippingAddress = await Address.create(shipping);
  const orderData = {
    amount: req.body.amount,
    currency: req.body.currency,
    cart: req.body.cart,
    UserId: req.user.id,
    status: 'created',
    shippingId: shippingAddress.id,
    billingId: billingAddress.id
  }
  const order = await Order.create(orderData);
  const transaction = order.toJSON()
  //Add data for payment plateform
  transaction.shipping = shippingAddress.toJSON();
  transaction.billing = billingAddress.toJSON();
  transaction.customerId = req.user.id;
  transaction.orderId = order.id;

  PaymentService.createTransaction(transaction)
    .then(async response => {
      order.transactionId = response.data.transaction.id;
      await order.save();
      const checkoutUrl = `${response.data.checkoutUrl}?validUrl=${confirmPaymentUrl}&cancelUrl=${cancelOrderUrl}`;
      return res.status(201).json({
        order,
        checkoutUrl
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    })
});

router.get("/:id", (req, res) => {
  Order.findByPk(req.params.id, {
    include: [{
      model: Address,
      as: 'billing'
    }, {
      model: Address,
      as: 'shipping'
    }]
  })
    .then(order => {
      if(!req.user.isAdmin() && !order.isOwner(req.user)) { return res.sendStatus(403) }
      return res.json(order)
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    });
});

router.post("/:id/refund", async (req, res) => {
  if (!req.user.isAdmin()) { return res.sendStatus(403) }
  const order = await Order.findByPk(req.params.id)
  return PaymentService.refund(order, req.body.amount)
    .then(refund => res.json(refund))
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    })
})

router.post("/confirm/:id", async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  order.status = 'confirmed';
  return order.save()
    .then(order => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
})

module.exports = router;

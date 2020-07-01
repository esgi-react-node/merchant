const express = require("express");
const { ValidationError, Op } = require("sequelize");
const handleValidationError = require("../helpers/handleValidationError");
const Order = require("../models/sequelize/Order");
const User = require("../models/sequelize/User");
const { Address } = require("../models/sequelize");
const PaymentService = require("../services/PaymentService");
const router = express.Router();

const confirmPaymentUrl = "http://google.fr/";
const cancelOrderUrl = "http://youtube.com";

router.get("/", (req, res) => {
  Order.findAll({
    paranoid: false,
    include: [{
      model: Address,
      as: 'billing'
    }, {
      model: Address,
      as: 'shipping'
    }]
  })
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

router.post("/", async (req, res) => {
  const {billing, shipping} = req.body;
  const billingAddress = await Address.create(billing);
  const shippingAddress = await Address.create(shipping);
  let order = {
    amount: req.body.amount,
    currency: req.body.currency,
    cart: req.body.cart,
    UserId: req.body.UserId,
    status: 'created',
    shippingId: shippingAddress.id,
    billingId: billingAddress.id
  }
  order = await Order.create(order);

  //Add data for payment plateform
  order = order.toJSON();
  order.shipping = shippingAddress;
  order.billing = billingAddress;
  order.customerId = order.UserId;
  order.tag = `orderId: ${order.id}`;

  PaymentService.createTransaction(order)
    .then(response => {
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
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});



module.exports = router;

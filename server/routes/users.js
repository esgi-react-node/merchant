const express = require("express");
const User = require("../models/sequelize/User");
const { ValidationError, Op } = require("sequelize");
const verifyToken = require("../middlewares/verifyToken");
const handleValidationError = require("../helpers/handleValidationError");
const router = express.Router();

// CGET
router.get("/", (req, res) => {
  const { username, article: articleConditions, ...conditions } = req.query;
  if (username) {
    conditions.username = { [Op.startsWith]: req.query.username };
  }
  console.log(conditions);

  User.findAll({
    where: conditions,
    paranoid: false
  })
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// GET
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});

// PUT
router.put("/:id", (req, res) => {
  User.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(([nbUpdated, result]) =>
      nbUpdated ? res.json(result[0]) : res.sendStatus(404)
    )
    .catch((error) => {
      handleValidationError(res, error);
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});

module.exports = router;

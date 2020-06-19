const express = require("express");
const Article = require("../models/sequelize/Article");
const handleValidationError = require("../helpers/handleValidationError");
const { ValidationError } = require("sequelize");
const router = express.Router();

// CGET
router.get("/", (req, res) => {
  Article.findAll({
    paranoid: false
  })
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// POST
router.post("/", (req, res) => {
  Article.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((error) => {
      handleValidationError(res, error);
    });
});

// GET
router.get("/:id", (req, res) => {
  Article.findByPk(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});

// PUT
router.put("/:id", (req, res) => {
  Article.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(([nbUpdated, result]) =>
      nbUpdated ? res.json(result[0]) : res.sendStatus(404)
    )
    .catch((error) => {
      handleValidationError(res, error);
    });
});

// // DELETE
// router.delete("/:id", (req, res) => {
//   User.destroy({
//     where: { id: req.params.id },
//   })
//     .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
//     .catch((err) => res.sendStatus(500));
// });

module.exports = router;

const sequelize = require("../../lib/sequelize");
const Article = require("./Article");
const User = require("./User");
const Order = require("./Order");
const Credential = require('./Credential');

sequelize
  .sync({ alter: true })
  .then((result) => console.log("Sequelize models synced"))
  .catch((result) => console.error("Error while syncing models"));

module.exports = {
  sequelize,
  Article,
  User,
  Order,
  Credential
};

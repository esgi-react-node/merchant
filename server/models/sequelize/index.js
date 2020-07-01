const sequelize = require("../../lib/sequelize");
const User = require("./User");
const Order = require("./Order");
const Credential = require('./Credential');
const Address = require('./Address');

sequelize
  .sync({ alter: true })
  .then((result) => console.log("Sequelize models synced"))
  .catch((result) => console.error("Error while syncing models"));

module.exports = {
  sequelize,
  User,
  Order,
  Credential,
  Address
};

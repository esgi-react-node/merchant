const sequelize = require("../../lib/sequelize");
const Article = require("./Article");
const User = require("./User");

sequelize
  .sync({ alter: true })
  .then((result) => console.log("Sync OK"))
  .catch((result) => console.error("Sync KO"));

module.exports = {
  sequelize,
  Article,
  User,
};

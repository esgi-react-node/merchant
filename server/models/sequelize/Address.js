const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const User = require("./User");

// Generation du model
class Address extends Model {}
Address.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    town: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Address",
    paranoid: true,
  }
);

Address.belongsTo(User);
User.hasMany(Address);

module.exports = Address;

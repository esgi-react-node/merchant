const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

// Generation du model
class Address extends Model {}
Address.init(
  {
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Type should be invoice or delivery
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
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

module.exports = Address;

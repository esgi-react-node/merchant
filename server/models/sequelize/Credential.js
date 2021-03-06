const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

// Generation du model
class Credential extends Model {}
Credential.init(
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Credential",
    paranoid: true,
  }
);

module.exports = Credential;

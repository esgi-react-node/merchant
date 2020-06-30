const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const User = require('./User');

// Generation du model
class Order extends Model {}
Order.init(
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cart: {
      type: DataTypes.JSON,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'created',
    },
  },
  {
    sequelize,
    modelName: "Order",
    paranoid: true,
  }
);

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;

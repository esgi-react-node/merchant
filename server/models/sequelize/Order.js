const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const User = require('./User');
const Address = require('./Address');

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
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Order",
    paranoid: true,
  }
);

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsTo(Address, {as: 'billing'});
Order.belongsTo(Address, {as: 'shipping'});
Address.hasMany(Order);

module.exports = Order;

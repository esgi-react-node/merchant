const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const User = require('./User');
const Article = require('./Article');

// Generation du model
class Order extends Model {}
Order.init(
  {
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

OrderArticles = sequelize.define('orderArticles', {
  quantity: DataTypes.INTEGER
});
Order.belongsToMany(Article, {through: OrderArticles});
Article.belongsToMany(Order, {through: OrderArticles});

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;

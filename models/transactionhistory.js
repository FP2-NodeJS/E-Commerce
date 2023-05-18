'use strict';
const {
  Model, TableHints
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionHistory.belongsTo(models.User,{
        foreignKey:"UserId"
      })
      TransactionHistory.belongsTo(models.Product,{
        foreignKey:"ProductId"
      })
    }
  }
  TransactionHistory.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter quantity'
        },
        notEmpty:{
          args: true,
          msg:"quantity can't be empty"
        },
        isNumeric: true
      }
    },
    total_price: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter total price'
        },
        notEmpty:{
          args: true,
          msg:"total price can't be empty"
        },
        isNumeric: true
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};
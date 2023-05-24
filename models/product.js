'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{
        foreignKey:"CategoryId"
      })
      Product.hasMany(models.TransactionHistory,{
        foreignKey:"ProductId"
      })
    }
  }
  Product.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter thee title'
        },
        notEmpty:{
          args: true,
          msg:"title can't be empty"
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter the price'
        },
        notEmpty:{
          args: true,
          msg:"price can't be empty"
        },
        isNumeric: true,
        min: 0,
        max: 50000000
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull : false,
      validate:{
        notNull: {
          msg: 'Please enter the STOCK'
        },
        notEmpty:{
          args: true,
          msg:"STOCK can't be empty"
        },
        isNumeric: true,
        min: {
          args: 5,
          msg: "minimum value is 5"
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
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
          min: {
            args: 0,
            msg: "minimum value is 0"
          },
          max: {
            args: 50000000,
            msg: "maximum value is 50.000.000"
          }
        }
      },
      stock: {
        type: Sequelize.INTEGER,
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
      CategoryId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
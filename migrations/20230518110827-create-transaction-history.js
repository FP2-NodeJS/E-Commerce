'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('TransactionHistories');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
          notNull: {
            msg: 'Please enter type'
          },
          notEmpty:{
            args: true,
            msg:"type can't be empty"
          }
        }
      },
      sold_product_amount: {
        type: Sequelize.INTEGER,
        allowNull : false,
        validate:{
          notNull: {
            msg: 'Please enter sold product amount'
          },
          notEmpty:{
            args: true,
            msg:"sold product amount can't be empty"
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
    await queryInterface.dropTable('Categories');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notNull: {
            msg: 'Please enter your name'
          },
          notEmpty:{
            args: true,
            msg:"full name can't be empty"
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail: true,
          notNull: {
            msg: 'Please enter your email'
          },
          notEmpty:{
            args: true,
            msg:"email can't be empty"
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notNull: {
            msg: 'Please enter your password'
          },
          notEmpty:{
            args: true,
            msg:"password can't be empty"
          },
          len: {
            args:[6,10],
            msg:"password should have 6-10 character"
          }
        }
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notNull: {
            msg: 'Please enter your gender'
          },
          notEmpty:{
            args: true,
            msg:"gender can't be empty"
          },
          isIn:{
            args: [["male","female"]],
            msg:"should  be male or female"
          }
        }
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notNull: {
            msg: 'Please enter your role'
          },
          notEmpty:{
            args: true,
            msg: "role can't be empty"
          },
          isIn:{
            args: [["admin","customer"]],
            msg:"should  be admin or customer"
          }
        }
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
          notNull: {
            msg: 'Please enter your balance'
          },
          notEmpty:{
            args: true,
            msg:"balance can't be empty"
          },
          min: {
            args: 0,
            msg: "minimum value is 0"
          },
          max: {
            args: 100000000,
            msg: "maximum value is 100.000.000"
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
    await queryInterface.dropTable('Users');
  }
};
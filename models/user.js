'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.TransactionHistory,{
        foreignKey: "UserId"
      })
    }
  }
  User.init({
    full_name: {
      type:DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      type: DataTypes.STRING,
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
      type:DataTypes.STRING,
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
      type:DataTypes.STRING,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter your balance'
        },
        notEmpty:{
          args: true,
          msg:"balance can't be empty"
        },
        min:0,
        max: 100000000,
        isNumeric: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user) => {
        const hashedPass = hashPassword(user.password)

        user.password = hashedPass
      }
    }
  });
  return User;
};
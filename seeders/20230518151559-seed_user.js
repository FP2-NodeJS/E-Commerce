'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users",[{
      id: 1,
      full_name: "admin",
      email: "admin@admin.com",
      password:"admin",
      gender:"female",
      role:"admin",
      balance: 10000000,
      createdAt : new Date(),
      updatedAt : new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

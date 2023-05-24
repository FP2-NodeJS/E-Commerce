'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users",[{
      full_name: "admin",
      email: "admin@admin.com",
      password:"$2b$10$letDGlVSaua0hkjHhkqNeueIvz1QLfDdApHC1pTpHGH//b/vY./m2", // password :admin1
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

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addConstraint("Products",{
      fields:["CategoryId"],
      type: "foreign key",
      name: "categoryId_fk",
      references:{
        table:"Categories",
        field:"id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })

    await queryInterface.addConstraint("TransactionHistories",{
      fields:["ProductId"],
      type: "foreign key",
      name: "productId_fk",
      references:{
        table:"Products",
        field:"id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })

    await queryInterface.addConstraint("TransactionHistories",{
      fields:["UserId"],
      type: "foreign key",
      name: "userId_fk",
      references:{
        table:"Users",
        field:"id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

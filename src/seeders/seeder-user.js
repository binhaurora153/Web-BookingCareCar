"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        password: "123456", //plain text
        firstName: "ThienBinh",
        lastName: "Aurora",
        address: "HUE",
        gender: 1,
        typeRole: "ROLE",
        keyRole: "R1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * // PORT=8080 // NODE_ENV =development
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
      email: 'user1@usernet.com',
      username: 'user1',
      firstName: 'User',
      lastName: 'One',
      hashedPassword: bcrypt.hashSync('password')
    },
  {
      email: 'user2@usernet.com',
      username: 'user2',
      firstName: 'User',
      lastName: 'Two',
      hashedPassword: bcrypt.hashSync('password')
    },
  {
      email: 'user3@usernet.com',
      username: 'user3',
      firstName: 'User',
      lastName: 'Three',
      hashedPassword: bcrypt.hashSync('password')
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, { where: { firstName: 'User'}});
  }
};

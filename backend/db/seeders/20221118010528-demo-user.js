'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
<<<<<<< HEAD
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [{
=======
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

    await queryInterface.bulkInsert('Users', [
    {
>>>>>>> dev
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
    },
    {
      email: 'user4@usernet.com',
      username: 'user4',
      firstName: 'User',
      lastName: 'Four',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user5@usernet.com',
      username: 'user5',
      firstName: 'User',
      lastName: 'Five',
      hashedPassword: bcrypt.hashSync('password')
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['user1', 'user2', 'user3'] }
    }, {});
  }
};

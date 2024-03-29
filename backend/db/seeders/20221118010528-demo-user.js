'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Users';

module.exports = {

  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert(options, [
    {
      email: 'user1@usernet.com',
      username: 'userOne',
      firstName: 'User',
      lastName: 'One',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user2@usernet.com',
      username: 'userTwo',
      firstName: 'User',
      lastName: 'Two',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user3@usernet.com',
      username: 'userThree',
      firstName: 'User',
      lastName: 'Three',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user4@usernet.com',
      username: 'userFour',
      firstName: 'User',
      lastName: 'Four',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user5@usernet.com',
      username: 'userFive',
      firstName: 'User',
      lastName: 'Five',
      hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user6@usernet.com',
        username: 'userSix',
        firstName: 'User',
        lastName: 'Two',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user7@usernet.com',
        username: 'userSeven',
        firstName: 'User',
        lastName: 'Two',
        hashedPassword: bcrypt.hashSync('password')
      },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {
      where: { username: ['user1', 'user2', 'user3','user4','user5'] }
    });
  }
};

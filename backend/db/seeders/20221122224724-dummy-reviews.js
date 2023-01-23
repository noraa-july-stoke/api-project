'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Reviews';

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

    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        review: "What a lovely stay we had!",
        stars: 3
      },
      {
        spotId: 1,
        userId: 4,
        review: "Great views! Friendly hosts!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: "What a lovely stay we had!",
        stars: 3
      },
      {
        spotId: 2,
        userId: 4,
        review: "Great views! Friendly hosts!",
        stars: 4
      }, {
        spotId: 3,
        userId: 3,
        review: "What a lovely stay we had!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: "Great views! Friendly hosts!",
        stars: 4
      }, {
        spotId: 6,
        userId: 3,
        review: "What a lovely stay we had!",
        stars: 2
      },
      {
        spotId: 1,
        userId: 4,
        review: "Great views! Friendly hosts!",
        stars: 3
      }

    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(options, null, {where: {spotId: [2]}})
  }
};

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
        spotId: 2,
        userId: 2,
        review: "This place has roaches!!! Watch out!!!",
        stars: 0
      },
      {
        spotId: 2,
        userId: 1,
        review: "Best place in town, don't listen to the other guy!!!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: "Traaaashhhhhh",
        stars: 0
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

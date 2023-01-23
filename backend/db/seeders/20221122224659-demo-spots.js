'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots';

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
        ownerId: 2,
        address: "123 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0259,
        lng: -71.9670,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 100
      },
      {
        ownerId: 1,
        address: "122 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0260,
        lng: -71.9680,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 110
      },
      {
        ownerId: 1,
        address: "121 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 120
      },
      {
        ownerId: 3,
        address: "120 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 120
      },
      {
        ownerId: 2,
        address: "106 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 120
      },
      {
        ownerId: 2,
        address: "105 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 120
      },
      {
        ownerId: 1,
        address: "104 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 120
      },
      {
        ownerId: 1,
        address: "103 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 120
      },
      {
        ownerId: 1,
        address: "102 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 120
      },
      {
        ownerId: 2,
        address: "101 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 120
      },
      {
        ownerId: 2,
        address: "100 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "The House of Your Dreams",
        description: "A cute little place to stage your perfect adventure",
        price: 120
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(options, null, { where: {name: ["Spot 1", "Spot 2", "Spot 3"]}})
  }
};

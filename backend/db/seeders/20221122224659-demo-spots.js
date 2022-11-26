'use strict';

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
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0259,
        lng: -71.9670,
        name: "Spot 1",
        description: "A cute little spot",
        price: 100.00
      },
      {
        ownerId: 1,
        address: "122 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of Amßerica",
        lat: 41.0260,
        lng: -71.9680,
        name: "Spot 2",
        description: "A cute little spot",
        price: 110.10
      },
      {
        ownerId: 2,
        address: "121 Shady Lane",
        city: "Nowhereville",
        state: "New York",
        country: "United States of America",
        lat: 41.0270,
        lng: -71.9640,
        name: "Spot 3",
        description: "A cute little spot",
        price: 120.20
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

    await queryInterface.bulkDelete("Spots", null, { where: {name: ["Spot 1", "Spot 2", "Spot 3"]}})
  }
};

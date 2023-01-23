'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'SpotImages';

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
        url: "https://images.pexels.com/photos/2816284/pexels-photo-2816284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 1,
        url: "source.com/image",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/1862402/pexels-photo-1862402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 2,
        url: "source.com/image",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/2189666/pexels-photo-2189666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 3,
        url: "source.com/image",
        preview: false
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/577697/pexels-photo-577697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 4,
        url: "source.com/image",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/2282445/pexels-photo-2282445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 5,
        url: "source.com/image",
        preview: false
      }, {
        spotId: 6,
        url: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800",
        preview: true
      }, {
        spotId: 7,
        url: "https://images.pexels.com/photos/1795508/pexels-photo-1795508.jpeg?auto=compress&cs=tinysrgb&w=800",
        preview: true
      }, {
        spotId: 8,
        url: "https://images.pexels.com/photos/4450429/pexels-photo-4450429.jpeg?auto=compress&cs=tinysrgb&w=800",
        preview: true
      }, {
        spotId: 9,
        url: "https://images.pexels.com/photos/2439595/pexels-photo-2439595.jpeg?auto=compress&cs=tinysrgb&w=800",
        preview: true
      }, {
        spotId: 10,
        url: "https://images.pexels.com/photos/3330118/pexels-photo-3330118.jpeg?auto=compress&cs=tinysrgb&w=800",
        preview: true
      }, {
        spotId: 11,
        url: "https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        preview: true
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

    await queryInterface.bulkDelete(options, null, {
      where: { spotId: [1] }
    });



  }
};

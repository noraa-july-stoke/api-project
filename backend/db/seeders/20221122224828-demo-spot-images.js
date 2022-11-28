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
        url: "source.com/image",
        preview: true
      },
      {
        spotId: 1,
        url: "source.com/image",
        preview: false
      },
      {
        spotId: 2,
        url: "source.com/image",
        preview: true
      },
      {
        spotId: 2,
        url: "source.com/image",
        preview: false
      },
      {
        spotId: 3,
        url: "source.com/image",
        preview: true
      },
      {
        spotId: 3,
        url: "source.com/image",
        preview: false
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

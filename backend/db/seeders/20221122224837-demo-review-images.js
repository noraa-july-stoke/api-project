'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ReviewImages';

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
        reviewId: 1,
        url: "source.com/image1"
      },
      {
        reviewId: 1,
        url: "source.com/image2"
      },
      {
        reviewId: 1,
        url: "source.com/image3"
      },
      {
        reviewId: 2,
        url: "source.com/image4"
      },
      {
        reviewId: 2,
        url: "source.com/image5"
      },
      {
        reviewId: 2,
        url: "source.com/image6"
      },
      {
        reviewId: 3,
        url: "source.com/image7"
      },
      {
        reviewId: 3,
        url: "source.com/image8"
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
      where: { reviewId: [1] }
    })
  }
};

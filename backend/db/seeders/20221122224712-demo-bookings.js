'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Bookings';

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
        userId: 4,
        startDate: new Date('December 20, 2023'),
        endDate: new Date('December 23, 2023')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('December 24, 2023'),
        endDate: new Date('December 26, 2023')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('December 20, 2023'),
        endDate: new Date('December 23, 2023')
      },
      {
        spotId: 2,
        userId: 4,
        startDate: new Date('December 24, 2023'),
        endDate: new Date('December 26, 2023')
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

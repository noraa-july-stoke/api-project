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



    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 4,
        startDate: new Date('December 20, 2023'),
        endDate: new Date('December 23, 2023')
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

    await queryInterface.bulkDelete("Bookings", null, {
      where: { spotId: [1] }
    });
  }
};

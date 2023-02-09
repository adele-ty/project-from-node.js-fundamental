'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserAssignments', [{
      UserId: '1bdd7ef7-9163-4b3c-a9f1-867877a2d14f',
      GroupId: '7f44ad0b-bf9c-49d6-a1d8-10d3122c9096',
      createdAt: '2023-01-28 16:16:03.123+00',
      updatedAt: '2023-01-28 16:16:03.123+00'
    },
    {
      UserId: '1bdd7ef7-9163-4b3c-a9f1-867877a2d14f',
      GroupId: '71991073-e587-439f-92e8-fe1353438d42',
      createdAt: '2023-01-28 16:16:03.123+00',
      updatedAt: '2023-01-28 16:16:03.123+00'
    },
    {
      UserId: '8495d53f-94b8-4acf-a019-e1b62d02f31f',
      GroupId: 'cad86002-b48f-406b-a641-e82261e96f31',
      createdAt: '2023-01-28 16:16:03.123+00',
      updatedAt: '2023-01-28 16:16:03.123+00'
    }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}

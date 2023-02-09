'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [{
      id: uuidv4(),
      name: 'John',
      permissions: ['READ'],
      createdAt: '2023-01-28 16:16:03.123+00',
      updatedAt: '2023-01-28 16:16:03.123+00'
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups', null, {})
  }
}

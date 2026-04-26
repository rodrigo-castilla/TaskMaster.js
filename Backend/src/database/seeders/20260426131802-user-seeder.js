'use strict';
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(12)

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

    await queryInterface.bulkInsert('Users', [
      { username: 'User 1', email: 'user1@gmail.com', password: bcrypt.hashSync('user1password', salt) },
      { username: 'User 2', email: 'user2@gmail.com', password: bcrypt.hashSync('user2password', salt) },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const { sequelize } = queryInterface
    try {
      await sequelize.transaction(async (transaction) =>{
        const opts = { transaction }
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', opts)
        await sequelize.query('TRUNCATE TABLE Users', opts)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', opts)
      })
    } catch (err) {
      console.log(err)
    }
  }
};

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
          'table',
          {
              id: {
                  type: Sequelize.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
              },
              policyID: Sequelize.INTEGER,
              statecode: Sequelize.STRING,
              county: Sequelize.STRING,
              eq_site_limit: Sequelize.INTEGER,
              hu_site_limit: Sequelize.INTEGER,
              fl_site_limit: Sequelize.INTEGER,
              fr_site_limit: Sequelize.INTEGER,
              tiv_2011: Sequelize.INTEGER,
              tiv_2012: Sequelize.INTEGER,
              eq_site_deductible: Sequelize.INTEGER,
              hu_site_deductible: Sequelize.INTEGER,
              fl_site_deductible: Sequelize.INTEGER,
              fr_site_deductible: Sequelize.INTEGER,
              point_latitude: Sequelize.STRING,
              point_longitude: Sequelize.STRING,
              line: Sequelize.STRING,
              construction: Sequelize.STRING,
              point_granularity: Sequelize.INTEGER,
              createdAt: Sequelize.DATE,
              updatedAt: Sequelize.DATE
          }
      )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

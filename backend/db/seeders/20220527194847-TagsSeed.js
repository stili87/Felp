'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Tags', [{
     type: 'Resturant'
   },
   {
    type: 'LawFirm'
  },
  {
    type: 'Education'
  },{
    type: 'Grocery Store'
  },{
    type: 'Sports'
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Tags', null, {});
  }
};

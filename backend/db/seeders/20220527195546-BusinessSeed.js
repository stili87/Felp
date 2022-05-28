'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Businesses', [{
     userId: 1,
     websiteUrl: 'https://saltandsmokebbq.com/',
     photoUrl: 'https://saltandsmokebbq.com/wp-content/uploads/2020/01/untitled-6-2.jpg',
     title: 'Salt & Smoke', //x
     description: 'A BBQ resturant', //x
     address: '5625 Hampton Ave',//x
     city: 'St. Louis', //x
     state: 'MO', //x
     zipcode: '63109',//x
     phone: '314-727-0200',//x
     tagId: 1
   }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Businesses', null, {});
  }
};

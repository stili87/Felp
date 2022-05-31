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
     title: 'Salt & Smoke', 
     description: 'A BBQ resturant', 
     address: '5625 Hampton Ave',
     city: 'St. Louis', 
     state: 'MO',
     zipcode: '63109',
     phone: '314-727-0200',
     tagId: 1,
     hours: '8:00 AM - 10:00 PM '
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

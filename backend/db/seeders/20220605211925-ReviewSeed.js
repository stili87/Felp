'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [{
     userId: 1,
     rating: 3,
     comment:'What a great place to eat!',
     businessId: 2
   },
   {
    userId: 2,
    rating: 5,
    comment:'Fantastic smoked BBQ that I will get again and again.',
    businessId: 1
  },
  {
    userId: 4,
    rating: 4,
    comment:'A great law firm that really helped me with my financial issues',
    businessId: 3
  },
  {
    userId: 3,
    rating: 2,
    comment:'I had a disagreement with a teacher and they kicked me out.  Still learned a bit though.',
    businessId: 4
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};

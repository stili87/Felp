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
     hours: '8:00am - 10:00pm',
     lng: -90.294000,
     lat: 38.580030
   },
   {
    userId: 3,
    websiteUrl: 'http://www.onestopizza.com/index.html',
    photoUrl: 'http://www.onestopizza.com/uploads/8/3/4/9/83496072/1467999250.png',
    title: 'Onesto Pizza & Trattoria', 
    description: 'Pizza & Italian specialties made in an upbeat setting.', 
    address: '5401 Finkman St',
    city: 'St. Louis', 
    state: 'MO',
    zipcode: '63109',
    phone: '314-802-8883',
    tagId: 1,
    hours: '4:00pm - 10:00pm',
    lng: -90.286820,
    lat: 38.576590
  },
  {
    userId: 2,
    websiteUrl: 'https://klinelawstl.com/',
    photoUrl: 'https://klinelawstl.com/wp-content/uploads/2019/05/Leigh-About-Us-1.jpg',
    title: 'The Kline Law Firm LLC', 
    description: 'A bankruptcy law firm. ', 
    address: '5102 Hampton Ave.',
    city: 'St. Louis', 
    state: 'MO',
    zipcode: '63109',
    phone: '636-352-2030',
    tagId: 2,
    hours: '8:00am - 5:00pm',
    lng: -90.292810,
    lat: 38.584650
  },
  {
    userId: 4,
    websiteUrl: 'https://stlcc.edu/',
    photoUrl: 'https://blogs.missouristate.edu/web/files/2018/04/logo-stlcc-300x300.jpg',
    title: 'St. Louis Community College', 
    description: 'St. Louis educational institution.', 
    address: '5600 Oakland Ave',
    city: 'St. Louis', 
    state: 'MO',
    zipcode: '63110',
    phone: '314-644-9100',
    tagId: 3,
    hours: '8:00am - 5:00pm',
    lng: -90.278440,
    lat: 38.629300
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

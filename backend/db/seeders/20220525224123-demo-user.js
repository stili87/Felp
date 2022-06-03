'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        fullName: 'Demo Lition',
        biography: "I am a demo user",
        picSrc: 'https://www.hrlact.org/wp-content/uploads/2020/12/generic-user-icon.jpg'
      },
      {
        email: 'stili87@gmail.com',
        username: 'stili87',
        hashedPassword: bcrypt.hashSync('password'),
        fullName: 'Andrew Stilinovic',
        biography: "Hello, from St. Louis Missouri.  I am learning to be a software engineer",
        picSrc: 'https://klinelawstl.com/wp-content/uploads/2019/05/Andrew1.jpg'

      },
      {
        email: 'john@johnAllan.com',
        username: 'johnAllan',
        hashedPassword: bcrypt.hashSync('password'),
        fullName: 'John Allan Hinds',
        biography: "Hello, from New Jersey.  I am a former professional poker player",
        picSrc: 'https://pbs.twimg.com/profile_images/1349201944376700928/bDUxYtla_400x400.jpg'
      },
      {
        email: 'joe@joeDonahay.com',
        username: 'ArchdukeJosef',
        hashedPassword: bcrypt.hashSync('password'),
        fullName: 'Joseph Donahay',
        biography: "Hello, from Kansas City.  I am a high school histroy teacher",
        picSrc: 'https://sites.google.com/site/donahayacademy/_/rsrc/1395360574107/home/JoeDelphi2.jpg'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};

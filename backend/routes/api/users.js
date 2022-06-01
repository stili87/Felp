const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.')
    .custom((value) => {
      return User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided User Name is already in use by another account');
          }
        });
    }),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('biography')
    .exists({checkFalsy: true})
    .withMessage('Biography must be filled out.'),
  check('fullName')
    .exists({checkFalsy: true})
    .withMessage('Biography must be filled out.'),
  handleValidationErrors
];

  router.get('/', asyncHandler( async (req, res) => {
    const users = await User.findAll()
    res.json(users)
  }))


  router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username, biography, fullName } = req.body;
      const user = await User.signup({ email, username, password, biography, fullName });
      await setTokenCookie(res, user);
      return res.json({
        user,
      });
    }),
  );

  module.exports = router;

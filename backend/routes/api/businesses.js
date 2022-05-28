const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateBusiness = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide the title of your business.')
      .isLength({max: 100})
      .withMessage('Business Name must not be more than 100 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a desciption of your business')
      .isLength({max: 10000})
      .withMessage('Business Description must not be more than 10,000 characters'),
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Please provide the address of your business.')
      .isLength({ max: 100 })
      .withMessage('Address must not be more than 100 characters'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('Please provide the city of your business.')
      .isLength({ max: 100 })
      .withMessage('City must not be more than 100 characters'),
    check('zipcode')
      .exists({ checkFalsy: true })
      .withMessage('Please provide the zipcode of your business.')
      .isLength({ max: 25 })
      .withMessage('Zipcode must not be more than 25 characters'),
    check('phone')
      .exists({ checkFalsy: true })
      .withMessage('Please provide the phone number of your business.')
      .isLength({ max: 15 })
      .withMessage('Phone must not be more than 15 characters'),
    check('tagId')
        .exists({checkFalsy: true})
        .withMessage('Please pick a tag'),
    handleValidationErrors
  ];

  router.post('/', validateBusiness, requireAuth, asyncHandler(async (req, res) => {
    console.log(req.user)
  }))

  module.exports = router;

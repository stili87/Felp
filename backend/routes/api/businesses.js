const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {Business} = require('../../db/models')

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

  router.get('/', asyncHandler(async (req,res) => {
    const allBussinesses = await Business.findAll()
   res.send(allBussinesses)

  }))

  router.post('/', validateBusiness, requireAuth, asyncHandler(async (req, res) => {
        const newBusiness = await Business.create(req.body)
        return res.json(newBusiness)
  }))

  router.put('/', validateBusiness, requireAuth, asyncHandler(async (req, res) => {
    const { 
      id,
      userId,
      title,
      description,
      address,
      city,
      state,
      zipcode,
      phone,
      photoUrl,
      websiteUrl,
      tagId} = req.body

    const editBusiness = await Business.findByPk(id)
    const newBusiness = await editBusiness.update({ userId,
      title,
      description,
      address,
      city,
      state,
      zipcode,
      phone,
      photoUrl,
      websiteUrl,
      tagId})

    return res.json(newBusiness)
}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {

  const deleteBusiness = await Business.findByPk(req.body.id)
  await deleteBusiness.destroy()
  return res.json(req.body.id)
}))

  module.exports = router;

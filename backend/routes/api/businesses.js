const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Business } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const validateBusiness = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the title of your business.')
    .isLength({ max: 25 })
    .withMessage('Business Name must not be more than 25 characters.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a desciption of your business.')
    .isLength({ max: 60 })
    .withMessage('Business Description must not be more than 60 characters.'),
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the address of your business.')
    .isLength({ max: 50 })
    .withMessage('Address must not be more than 100 characters.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the city of your business.')
    .isLength({ max: 35 })
    .withMessage('City must not be more than 100 characters.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the state of your business.')
    .isLength({ max: 2 })
    .withMessage('City must not be more than 2 characters.'),
  check('zipcode')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the zipcode of your business.')
    .isLength({ max: 5 })
    .withMessage('Zipcode must not be more than 5 characters.'),
  check('phone')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the phone number of your business.')
    .isLength({ max: 15 })
    .withMessage('Phone must not be more than 15 characters.'),
  check('tagId')
    .exists({ checkFalsy: true })
    .withMessage('Please pick a tag.'),
  check('hours')
    .exists({ checkFalsy: true })
    .withMessage('Please submit hours.')
    .isLength({ max: 17 })
    .withMessage('Hours must not be more than 17 characters.'),
  handleValidationErrors
];

router.get('/', asyncHandler(async (req, res) => {
  const allBussinesses = await Business.findAll()
  res.send(allBussinesses)
}))

router.post('/',  singleMulterUpload('image'), validateBusiness, requireAuth, asyncHandler(async (req, res) => {
  const {hours,
    userId,
    title,
    description,
    address,
    city,
    state,
    zipcode,
    phone,
    websiteUrl,
    tagId, 
    } = req.body


    const photoUrl = await singlePublicFileUpload(req.file);

  const newBusiness = await Business.create({
    hours,
    userId,
    title,
    description,
    address,
    city,
    state,
    zipcode,
    phone,
    websiteUrl,
    tagId, 
    photoUrl})

  return res.json(newBusiness)
}))

router.put('/', singleMulterUpload('image'), validateBusiness, requireAuth, asyncHandler(async (req, res) => {
  
  const {
    hours,
    id,
    userId,
    title,
    description,
    address,
    city,
    state,
    zipcode,
    phone,
    websiteUrl,
    tagId } = req.body
    let photoUrl;
    let newBusiness
    
    const editBusiness = await Business.findByPk(id)

if(req.file){
    photoUrl = await singlePublicFileUpload(req.file);
    newBusiness = await editBusiness.update({
      hours,
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
      tagId
    })
}else {
  newBusiness = await editBusiness.update({
    hours,
    userId,
    title,
    description,
    address,
    city,
    state,
    zipcode,
    phone,
    websiteUrl,
    tagId
})
}

  return res.json(newBusiness)
}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {

  const deleteBusiness = await Business.findByPk(req.body.id)
  await deleteBusiness.destroy()
  return res.json(req.body.id)
}))

module.exports = router;

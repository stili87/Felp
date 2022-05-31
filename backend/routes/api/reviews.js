const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {Review} = require('../../db/models')

const validateReview = [
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide a Rating.')
        .isIn(['1','2','3','4','5'])
        .withMessage('Rating must be between 1 and 5.'),
    check('comment')
        .exists({checkFalsy: true})
        .withMessage('Please provide a review'),
    handleValidationErrors
];

router.post('/', validateReview, requireAuth, asyncHandler(async (req,res)=> {
    console.log(req.body)
    const newReview = await Review.create(req.body)
    return res.json(req.body)
}))

module.exports = router;

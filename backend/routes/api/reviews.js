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
        .isLength({ max: 10000 })
        .withMessage('Business Description must not be more than 10,000 characters.')
        .exists({checkFalsy: true})
        .withMessage('Please provide a review'),
    handleValidationErrors
];

router.post('/', validateReview, requireAuth, asyncHandler(async (req,res)=> {
    const buildReview = await Review.build(req.body)
    const newReview = await buildReview.save()
    res.json(newReview)
}))

router.get('/:businessId', asyncHandler(async (req, res) => {
    const businessId = req.params.businessId
    const reviews = await Review.findAll({where: {businessId}})
    res.json(reviews)
}))

router.put('/', requireAuth, validateReview, asyncHandler(async (req, res) => {
    const {reviewId, comment, rating} = req.body
    const updatingReview = await Review.findByPk(reviewId)
    const updatedReview = await updatingReview.update({comment, rating})
    res.json(updatedReview)
}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const {reviewId} = req.body
    const deleteReview = await Review.findByPk(reviewId)
    await deleteReview.destroy()
    res.json(reviewId)
}))

module.exports = router;

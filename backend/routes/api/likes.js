const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const {Like} = require('../../db/models');



router.get('/:businessId', asyncHandler(async (req, res) => {
    const {businessId} = req.params
    const businessLikes = await Like.findAll({where: {businessId}})

    res.json(businessLikes)
}))

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const newLike = await Like.create(req.body)
    res.json(newLike)
}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const {businessId, userId} = req.body
    const deleteLike = await Like.findOne({where: businessId, userId})
    const deleteLikeId = deleteLike.id
    await deleteLike.destroy()
    res.json(deleteLikeId)
}))





module.exports = router;

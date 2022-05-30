const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {Tag} = require('../../db/models')
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

router.get('/', asyncHandler(async(req, res)=> {
    const allTags = await Tag.findAll()
    res.send (allTags)
}))
module.exports = router;

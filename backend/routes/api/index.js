const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessesRouter = require('./businesses.js')
const tagsRouter = require('./tags.js')

router.use('/tags', tagsRouter)
router.use('/businesses', businessesRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);


module.exports = router;

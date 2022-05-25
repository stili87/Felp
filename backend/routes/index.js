const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const apiRouter = require('./api');

router.use('/api', apiRouter);



module.exports = router;

const express = require('express');

const router = express.Router();


const users = require('./user/user.route')

router.use('/users',users)

module.exports = router;
const { Router } = require('express');
const users = require('./users')
const company = require('./company')
const techs = require('./techs')
const jobs = require('./jobs')

const router = Router();

router.use('/users', users)
router.use('/company', company)
router.use('/techs', techs)
router.use('/jobs', jobs)

module.exports = router;
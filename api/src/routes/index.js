const { Router } = require('express');
const users = require('./users')
const company = require('./company')
const techs = require('./techs')
const jobs = require('./jobs')
const appliedJob = require('./appliedJob.js')
const login = require('./login.js')
const cloudinary = require('./cloudinary.js')
const admin = require('./admin.js')
const stripe = require('./stripe.js')

const router = Router();

router.use('/users', users)
router.use('/company', company)
router.use('/techs', techs)
router.use('/jobs', jobs)
router.use('/appliedJob', appliedJob)
router.use('/login', login)
router.use('/cloudinary', cloudinary)
router.use('/admin', admin)
router.use('/stripe', stripe)

module.exports = router;
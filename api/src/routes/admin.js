const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology, otherTechs, report_type} = require('../db')

const router = Router();

router.get('/users', async (req,res)=>{
    let users = await user_account.findAll({
        where:{profileType:'develop'},
        order:[['reports','desc'],['id','asc']]
    })
    res.send(users)
})

router.get('/company', async (req,res)=>{
    let company = await company_account.findAll({
        order:[['reports','desc'],['id','asc']]})
    res.send(company)
})

router.get('/jobs', async (req,res)=>{
    let jobs = await job.findAll({
        include:company_account,
        order:[['reports','desc'],['id','asc']]
    })
    res.send(jobs)
})

router.get('/others', async (req,res)=>{
    let otherT = await otherTechs.findAll({
        order: [['count','desc']]
    })
    res.send(otherT)
})

module.exports = router;
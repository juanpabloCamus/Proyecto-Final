const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology, otherTechs} = require('../db')

const router = Router();

router.get('/users', async (req,res)=>{
    let users = await user_account.findAll({
        where:{profileType:'develop'},
        order:[['reports','desc']]
    })
    res.send(users)
})

router.get('/company', async (req,res)=>{
    let company = await company_account.findAll({
        order:[['reports','desc']]})
    res.send(company)
})

router.get('/jobs', async (req,res)=>{
    let jobs = await job.findAll({
        include:company_account,
        order:[['reports','desc']]
    })
    res.send(jobs)
})

router.get('/others', async (req,res)=>{
    let otherTechs = await otherT.findAll({
        order: [['count','desc']]
    })
    res.send(otherTechs)
})

module.exports = router;
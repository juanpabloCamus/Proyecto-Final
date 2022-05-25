const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let company = await company_account.findAll()
        res.send(company)
    }catch(error){
        console.log(error)
    }
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params
    try{
        let company = await company_account.findByPk(id, {
            include: job
        })
        res.send(company)
    }catch(error){
        console.log(error)
    }
})

router.get('/jobApplication/:id', async (req,res)=>{
    const { id } = req.params
    try{
        let company = await job.findByPk(id, {
            include: [{
                model: applied_job,
                where: {id_job: id}
            }]
        })
        res.send(company)
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
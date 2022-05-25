const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try{
        const jobs = await job.findAll()
        res.send(jobs)
    }catch(error){
        console.log(error)
    }
})


module.exports = router;
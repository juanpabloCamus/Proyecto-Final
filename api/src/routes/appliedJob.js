const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.post('/', async (req,res)=>{
    try{
        const {id_user, id_job, description, pdf} = req.body;

        const user = await user_account.findByPk(id_user)

        const job = await company_account.findByPk(id_job)

        let jobApplication = await applied_job.create({
            pdf,
            description,
        })
        await applied_job.adduser_account(user)
        await applied_job.addjob(job)
        res.send(jobApplication)
       
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
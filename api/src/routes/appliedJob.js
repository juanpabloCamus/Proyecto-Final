const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.post('/', async (req,res)=>{
    try{
        const {id_user, id_job, description, pdf} = req.body;
        const user = await user_account.findByPk(id_user)
        const jobs = await job.findByPk(id_job)

        let jobApplication = await applied_job.create({
            pdf,
            description,
        })
        await jobApplication.setUser_account(user)
        await jobApplication.setJob(jobs)

        res.send(jobApplication);
    
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
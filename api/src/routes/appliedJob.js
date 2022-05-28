const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.post('/', async (req,res)=>{
    try{
        const {id_user, id_job, pdf, description} = req.body;

        const user = await user_account.findAll({
            where: {id: id_user}
        })
        const jobs = await job.findAll({
            where: {id: id_job}
        })

        let postulacion = await applied_job.create({
            pdf: pdf,
            description: description,
        })

        await postulacion.setUser_account(user[0])
        await postulacion.setJob(jobs[0])

        res.send(jobApplication);

    }catch(error){
        console.log(error)
    }
})

module.exports = router;
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

router.post('/:company_id', async (req,res)=>{

        const {company_id} = req.params

    try{
        const {tech_name, position, description, time, salary_range, english_level, requirements} = req.body;
        //TECH NAME debe ser un array
        const company = await company_account.findByPk(company_id);

        let jobs = await job.create({
            position,
            description,
            time,
            salary_range,
            english_level,
            requirements,
        })

        tech_name.map(async t => {
            const tech = await technology.findOrCreate({
                where:{name:t}
            })
            console.log(tech);
            await jobs.addTechnology(tech[0])
        })

        await jobs.addCompany_account(company)
        console.log(jobs);
        res.send(jobs)
    
    }catch(error){
        console.log(error)
    }
})
module.exports = router;
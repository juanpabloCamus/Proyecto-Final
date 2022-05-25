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

        const company = await company_account.findByPk(company_id)

        const getTech = await tech_name.map(async t => (
            t.findOrCreate({
                where: {name: tech_name}
            })
        ))


        let jobs = await job.create({
            position,
            description,
            time,
            salary_range,
            english_level,
            requirements,

        })
        getTech.forEach(async t => (
            jobs.createTechnology(t[0])
        ))
         //await jobs.createTechnology(tech)
         await jobs.addCompany_account(company)
         //await jobs.addTechnology(tech)
        res.send(jobs)
       
    }catch(error){
        console.log(error)
    }
})
module.exports = router;
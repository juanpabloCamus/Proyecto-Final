const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db');
const { jobs } = require('../data');

const router = Router();

router.get('/', async (req,res)=>{
    try{
        const jobs = await job.findAll({
            include: company_account,
            order: [
                ['id', 'DESC']
            ],
    })
        res.send(jobs)
    }catch(error){
        console.log(error)
    }
})

router.get('/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const jobId = await job.findAll({
            where:{id: id}
        })
        if(jobId.length<1){
            res.send('No existe oferta laboral')
        }
        res.send(jobId)
    }catch(error){
        console.log(error)
    }
})

router.post('/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const {position, description, time, salary_range, language, requirements, tecnologias} = req.body

        if(position&&description&&time&&salary_range&&language&&requirements){
            if(!/^[a-zA-Z\s]+$/.test(position)){
                res.send('Pocision invalida')
            }else if(!/^[a-zA-Z\s]+$/.test(time)){
                res.send('Tiempo invalido')
            }else if(!/^([0-9]){1,6}-([0-9]){1,6}$/.test(salary_range)){
                res.send('Rango salarial no valido')
            }else{
                const newJob = await job.create({
                    position,
                    description,
                    time,
                    salary_range,
                    language,
                    requirements
                })

                /* let techs = await technology.findAll()

                for(let i=0;i<tecnologias.length;i++){
                    
                } */

                await newJob.addCompany_account(id)

                res.send('Oferta laboral creada correctamente.')
            }
        }else{
            res.send('Completar todos los campos.')
        }
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db');
const { jobs } = require('../data');

const router = Router();

router.get('/', async (req,res)=>{
    try{
        const { tech, seniority, time, eLevel, salary } = req.query

        let jobs = await job.findAll({
            include: [{model: company_account},
            {model: technology}],
            order: [
                ['id', 'DESC']
            ],
        })

        if(tech){
            let techs = await technology.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            let tecno = techs.find(t=>t.dataValues.name===tech)
            if(tecno){
                tecno = tecno.dataValues.name
                if(jobs.length>0){
                    jobs = jobs.filter(j=>j.dataValues.technologies.find(t=>t.dataValues.name===tecno))
                }
            }
        }

        if(jobs.length>0){
            for(let i=0;i<jobs.length;i++){
                if(jobs[i].dataValues.company_accounts.length>0){
                    delete jobs[i].dataValues.company_accounts[0].dataValues.password
                }
            }
        }

        

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
        const {position, description, time, salary_range, english_level, requirements, seniority, technologies} = req.body

        if(position&&description&&time&&salary_range&&english_level&&requirements&&seniority&&technologies){
            if(!/^[a-zA-Z\s]+$/.test(position)){
                res.send('Pocision invalida')
            }else if(time!=='No Especificado'&&time!=='Part-Time'&&time!=='Full-Time'){
                res.send('Tiempo es invalido')
            }else if(salary_range!=='No Especificado'&&salary_range!=='0$ - 1000$'&&salary_range!=='1000$ - 3000$'&&salary_range!=='3000$ - 6000$'&&salary_range!=='6000$ - 10000$'&&salary_range!=='+ 10000$'){
                res.send('Rango salarial no valido')
            }else if(english_level!=='No Requerido'&&english_level!=='Basic'&&english_level!=='Conversational'&&english_level!=='Advanced or Native'){
                res.send('Nivel de ingles incorrecto')
            }else if(seniority!=='No Especificado'&&seniority!=='Junior'&&seniority!== 'Semi-Senior'&&seniority!== 'Senior'){
                res.send('seniority incorrecto')
            }else{
                const newJob = await job.create({
                    position,
                    description,
                    time,
                    salary_range,
                    english_level,
                    requirements,
                    seniority
                })

                let techs = await technology.findAll({
                    order: [
                        ['id', 'ASC'] 
                    ]
                })

                for(let i=0;i<technologies.length;i++){
                    let tecno = techs.find(t=>t.dataValues.name===technologies[i])
                    await newJob.addTechnology(tecno.dataValues.id)
                }

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
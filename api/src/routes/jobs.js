const { Router } = require('express');
const {company_account, user_account, experience, education, job, applied_job, technology, otherTechs } = require('../db');

const router = Router();

router.get('/', async (req,res)=>{
    try{
        const { tech, seniority, time, eLevel, salary, search } = req.query

        let jobs = await job.findAll({
            where: {active: true},
            include: [{model: company_account},{model: technology},{model:otherTechs},{model:user_account},{model:applied_job, include:{model: user_account,include:{model:technology}}}],
            order: [
                ['id', 'DESC']
            ],
        })

        let Paginado = []

        if(search){
            let allJobs = []
            function FindJob (string, busco) {
                
                if(string[0]===busco[0]){
                    for(let j=0;j<busco.length;j++){
                        if(string[0+j]===busco[j]){
                            if(j===busco.length-1){
                                return string
                            }
                        }else{
                            continue;
                        }
                    }
                }
            }
            for(let i=0;i<jobs.length;i++){
                if(FindJob(jobs[i].dataValues.position.toLowerCase(),search.toLowerCase())||FindJob(jobs[i].dataValues.company_accounts[0].dataValues.name.toLowerCase(),search.toLowerCase())){
                    allJobs.push(jobs[i])
                }
            }
            jobs = allJobs
        }

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

        if(seniority){
            let snrt = ['Not Specified', 'Junior', 'Semi-Senior', 'Senior']
            let seni = snrt.find(s=>s===seniority)
            if(seni){
                jobs = jobs.filter(j=>j.dataValues.seniority===seni)
            }
        }

        if(time){
            let tiempo = ['Not Specified', 'Part-Time', 'Full-Time']
            let tim = tiempo.find(t=>t===time)
            if(tim){
                jobs = jobs.filter(j=>j.dataValues.time===tim)
            }
        } 

        if(eLevel){
            let ingles = ['Not required','Basic','Conversational', 'Advanced or Native']
            let eng = ingles.find(i=>i===eLevel)
            if(eng){
                jobs = jobs.filter(j=>j.dataValues.english_level===eng)
            }
        }

        if(salary){
            let salario = ['Not Specified','0$ - 1000$','1000$ - 3000$','3000$ - 6000$','6000$ - 10000$','10000$']
            let sal = salario.find(s=>s===salary)
            if(sal){
                jobs = jobs.filter(j=>j.dataValues.salary_range===sal)
            }
        }

        if(jobs.length>0){
            for(let i=0;i<jobs.length;i++){
                delete jobs[i].dataValues.company_accounts[0].dataValues.password
                
                jobs[i].dataValues.technologies = jobs[i].dataValues.technologies.concat(jobs[i].dataValues.otherTechs)
                delete jobs[i].dataValues.otherTechs
            }
        }
        jobs.map(j=>j.dataValues.applied_jobs.map(u=>delete u.dataValues.user_account.dataValues.password))

        if(jobs.length>0){
            let cantPaginas = Math.ceil(jobs.length/10)
            let inicio = 0
            for(let i=0;i<cantPaginas;i++){
                let cadaPag = {
                    page: i+1,
                    offers: jobs.slice(inicio,inicio+10)
                }
                inicio = inicio+10
                Paginado.push(cadaPag)
            }
        }

        res.send(Paginado)
    }catch(error){
        console.log(error)
    }
})

router.get('/:id',async (req,res)=>{
    try{
        const {id} = req.params
        let jobId = await job.findAll({
            include: [{model: company_account},{model: technology},{model: otherTechs},{model:user_account},{model:applied_job, include:{model: user_account,include:{model:technology}}}], 
            where:{id: id,active: true}
        })
        if(jobId.length<1){
            res.send('There is no job offer')
        }
        if(jobId[0].dataValues.applied_jobs.length>0){
            jobId[0].dataValues.applied_jobs.map(u=>delete u.dataValues.user_account.dataValues.password)
        }
        jobId[0].dataValues.technologies = jobId[0].dataValues.technologies.concat(jobId[0].dataValues.otherTechs)
        delete jobId[0].dataValues.otherTechs
        delete jobId[0].dataValues.company_accounts[0].dataValues.password
        res.send(jobId)
    }catch(error){
        console.log(error)
    }
})

router.post('/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const {position, description, time, salary_range, english_level, requirements, seniority} = req.body
        let {technologies} = req.body

        if(position&&description&&time&&salary_range&&english_level&&requirements&&seniority&&technologies){
            if(!/^[a-zA-Z\s]+$/.test(position)){
                res.send('Invalid position')
            }else if(time!=='Not Specified'&&time!=='Part-Time'&&time!=='Full-Time'){
                res.send('Time is invalid')
            }else if(salary_range!=='Not Specified'&&salary_range!=='0$ - 1000$'&&salary_range!=='1000$ - 3000$'&&salary_range!=='3000$ - 6000$'&&salary_range!=='6000$ - 10000$'&&salary_range!=='10000$'){
                res.send('Invalid salary range')
            }else if(english_level!=='Not required'&&english_level!=='Basic'&&english_level!=='Conversational'&&english_level!=='Advanced or Native'){
                res.send('Invalid english level')
            }else if(seniority!=='Not Specified'&&seniority!=='Junior'&&seniority!== 'Semi-Senior'&&seniority!== 'Senior'){
                res.send('Invalid seniority')
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
                technologies = technologies.map(t=>t.toLowerCase())
                technologies = technologies.filter((item,index)=>{
                    return technologies.indexOf(item) === index;
                })
                for(let i=0;i<technologies.length;i++){
                    let tecno = techs.find(t=>t.dataValues.name.toLowerCase()===technologies[i].toLowerCase())
                    if(tecno){
                        await newJob.addTechnology(tecno.dataValues.id)
                    }else{
                        let otherTech = await otherTechs.findAll({
                            where: {name: technologies[i].toLowerCase()}
                        })
                        if(otherTech[0]){
                            await otherTechs.update(
                                {
                                    count: otherTech[0].dataValues.count+1
                                },{
                                    where:{id: otherTech[0].dataValues.id}
                                }
                            )
                            newJob.addOtherTechs(otherTech[0].dataValues.id)
                        }else{
                            let newTech = await otherTechs.create({
                                name: technologies[i].toLowerCase()
                            })
                            await newJob.addOtherTechs(newTech.dataValues.id)
                        }
                    }
                }
                await newJob.addCompany_account(id)

                res.send('Job offer created successfully')
            }
        }else{
            res.send('Complete all the fields')
        }
    }catch(error){
        console.log(error)
    }
})

router.put('/report/:id', async (req,res)=>{
    try {
        const {id} = req.params

        let jobs = await job.findAll({
            where:{id: id}
        })

        if(jobs.length>0){
            await job.update(
                {
                    reports: jobs[0].dataValues.reports+1
                },{
                    where:{id: id}
                }
            )
            res.send('Job reported')
        }else{
            res.send('Job not exist')
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {position, description, time, salary_range, english_level, requirements, seniority, technologies} = req.body
        console.log(id)
        let errores = []

        if(position){
            if(!/^[a-zA-Z\s]+$/.test(position)){
                errores.push('position')
            }else{
                await job.update(
                    {
                        position: position
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(description){
            await job.update(
                {
                    description: description
                },{
                    where:{id: id}
                }
            )
        }
        if(time){
            if(time!=='Not Specified'&&time!=='Part-Time'&&time!=='Full-Time'){
                errores.push('time')
            }else{
                await job.update(
                    {
                        time: time
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(salary_range){
            if(salary_range!=='Not Specified'&&salary_range!=='0$ - 1000$'&&salary_range!=='1000$ - 3000$'&&salary_range!=='3000$ - 6000$'&&salary_range!=='6000$ - 10000$'&&salary_range!=='10000$'){
                errores.push('salary range')
            }else{
                await job.update(
                    {
                        salary_range: salary_range
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(english_level){
            if(english_level!=='Not required'&&english_level!=='Basic'&&english_level!=='Conversational'&&english_level!=='Advanced or Native'){
                errores.push('english level')
            }else{
                await job.update(
                    {
                        english_level: english_level
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(requirements){
            await job.update(
                {
                    requirements: requirements
                },{
                    where:{id: id}
                }
            )
        }
        if(seniority){
            if(seniority!=='Not Specified'&&seniority!=='Junior'&&seniority!== 'Semi-Senior'&&seniority!== 'Senior'){
                errores.push('seniority')
            }else{
                await job.update(
                    {
                        seniority: seniority
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        
        if(technologies){
            let actJob = await job.findAll({
                include: [{model:technology},{model:otherTechs}],
                where:{id: id}
            })
            actJob[0].dataValues.technologies.map(t=>actJob[0].removeTechnology(t.dataValues.id))
            actJob[0].dataValues.otherTechs.map(t=>actJob[0].removeOtherTechs(t.dataValues.id))
            let techs = await technology.findAll({
                order: [
                    ['id', 'ASC'] 
                ]
            })
            for(let i=0;i<technologies.length;i++){
                let tecno = techs.find(t=>t.dataValues.name===technologies[i])
                if(tecno){
                    await actJob[0].addTechnology(tecno.dataValues.id)
                }
            }
        }
        if(errores.length>0){
            const error = errores.join(', ')
            res.send(`Fields were not updated: ${error}.`)
        }
        res.send('Updated data')
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        const {id} = req.params

        let jobs = await job.findAll({
            where: {id: id}
        })

        if(jobs.length>0){
            await job.update({
                active: !jobs[0].dataValues.active
            },{
                where:{id: id}
            })
            if(jobs[0].dataValues.active){
                res.send('Job disabled')
            }else{
                res.send('Job enabled')
            }
        }else{
            res.send("Job not exist")
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
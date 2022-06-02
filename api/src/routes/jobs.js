const { Router } = require('express');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db');

const router = Router();

router.get('/', async (req,res)=>{
    try{
        const { tech, seniority, time, eLevel, salary, techSearch } = req.query

        let jobs = await job.findAll({
            include: [{model: company_account},{model: technology},{model:applied_job, include:{model: user_account}}],
            order: [
                ['id', 'DESC']
            ],
        })

        let Paginado = []

        if(techSearch){
            let allTechs = []
            let techs = await technology.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            function FindTecno (tecno, search) {
                const length = search.length
                
                    if(tecno[0]===search[0]){
                        for(let j=0;j<search.length;j++){
                            if(tecno[0+j]===search[j]){
                                if(j===search.length-1){
                                    return tecno
                                }
                            }else{
                                continue;
                            }
                        }
                    } 
                return '';
            }
            for(let i=0;i<techs.length;i++){
                if(techs[i].dataValues.name.toLowerCase()===FindTecno(techs[i].dataValues.name.toLowerCase(),techSearch.toLowerCase())){
                    let tecno = techs[i].dataValues.name
                    allTechs.push(tecno)
                }
            }
            let jobsInstacia = []
            let jobsSearched = []
            if(allTechs.length>0){
                for(let i=0;i<allTechs.length;i++){
                    if(jobs.length>0){
                        let instancia = jobs.filter(j=>j.dataValues.technologies.find(t=>t.dataValues.name===allTechs[i]))
                        jobsInstacia.push(instancia)
                    }
                }
                for(let i=0;i<jobsInstacia.length;i++){
                    for(let j=0;j<jobsInstacia[i].length;j++){
                        if(!jobsSearched.includes(jobsInstacia[i][j])){
                            jobsSearched.push(jobsInstacia[i][j])
                        }
                    }
                }
                jobs = jobsSearched
            }else{
                jobs = []
            }
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
                if(jobs[i].dataValues.company_accounts.length>0){
                    delete jobs[i].dataValues.company_accounts[0].dataValues.password
                }
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
        const jobId = await job.findAll({
            include: [{model: company_account},{model: technology},{model:applied_job, include:{model: user_account}}], 
            where:{id: id}
        })
        if(jobId.length<1){
            res.send('No existe oferta laboral')
        }
        if(jobId[0].dataValues.applied_jobs.length>0){
            jobId[0].dataValues.applied_jobs.map(u=>delete u.dataValues.user_account.dataValues.password)
        }
        delete jobId[0].dataValues.company_accounts[0].dataValues.password
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
            }else if(time!=='Not Specified'&&time!=='Part-Time'&&time!=='Full-Time'){
                res.send('Tiempo es invalido')
            }else if(salary_range!=='Not Specified'&&salary_range!=='0$ - 1000$'&&salary_range!=='1000$ - 3000$'&&salary_range!=='3000$ - 6000$'&&salary_range!=='6000$ - 10000$'&&salary_range!=='10000$'){
                res.send('Rango salarial no valido')
            }else if(english_level!=='Not required'&&english_level!=='Basic'&&english_level!=='Conversational'&&english_level!=='Advanced or Native'){
                res.send('Nivel de ingles incorrecto')
            }else if(seniority!=='Not Specified'&&seniority!=='Junior'&&seniority!== 'Semi-Senior'&&seniority!== 'Senior'){
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

router.put('/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {position, description, time, salary_range, english_level, requirements, seniority, technologies} = req.body

        let errores = []

        if(position){
            if(!/^[a-zA-Z\s]+$/.test(position)){
                errores.push('posicion')
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
        if(time!=='Not Specified'&&time!=='Part-Time'&&time!=='Full-Time'){
            errores.push('tiempo')
        }else{
            await job.update(
                {
                    time: time
                },{
                    where:{id: id}
                }
            )
        }
        if(salary_range!=='Not Specified'&&salary_range!=='0$ - 1000$'&&salary_range!=='1000$ - 3000$'&&salary_range!=='3000$ - 6000$'&&salary_range!=='6000$ - 10000$'&&salary_range!=='10000$'){
            errores.push('rango salarial')
        }else{
            await job.update(
                {
                    salary_range: salary_range
                },{
                    where:{id: id}
                }
            )
        }
        if(english_level!=='Not required'&&english_level!=='Basic'&&english_level!=='Conversational'&&english_level!=='Advanced or Native'){
            errores.push('nivel de ingles')
        }else{
            await job.update(
                {
                    english_level: english_level
                },{
                    where:{id: id}
                }
            )
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
        if(errores.length>0){
            const error = errores.join(', ')
            res.send(`No se actualizaron los campos: ${error}.`)
        }
        res.send('datos actualizados')
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        const {id} = req.params

        await job.update({
            active: false},{
            where:{id: id}
        })
        res.send('eliminado')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
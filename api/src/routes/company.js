const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology, otherTechs, meeting, usernotis, compnotis, report_type} = require('../db')
const nodemailer = require('nodemailer');

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let company = await company_account.findAll({
            where: {active: true},
            include: [{model:job, include:[{model:technology},{model:otherTechs},{model:applied_job},{model:user_account}]}],
            order: [
                ['id', 'ASC']
            ]
        })
        if(company.length<1){
            res.send('The company does not exist')
        }
        if(company.length>0){
            for(let i=0;i<company.length;i++){
                company[i].dataValues.jobs.map(j=>j.dataValues.user_accounts.map(u=>delete u.dataValues.password))
                delete company[i].dataValues.password
                for(let j=0;j<company[i].dataValues.jobs.length;j++){
                    company[i].dataValues.jobs[j].dataValues.technologies = company[i].dataValues.jobs[j].dataValues.technologies.concat(company[i].dataValues.jobs[j].dataValues.otherTechs)
                    delete company[i].dataValues.jobs[j].dataValues.otherTechs
                }
            }
        }
        res.send(company)
    }catch(error){
        console.log(error)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const { seniority, eLevel, search } = req.query

        let company = await company_account.findAll({
            include: [{model:job, include:[{model:technology},{model:otherTechs},{model:applied_job},{model:user_account}]}],
            where:{id:id,active: true}
        })
        if(company.length<1){
            res.send('The company does not exist')
        }
        if(seniority){
            company[0].dataValues.jobs.dataValues.applied_jobs.filter(u=>u.dataValues.seniority === seniority)
        }
        if(eLevel){
            company[0].dataValues.jobs.dataValues.applied_jobs.filter(u=>u.dataValues.english_level === eLevel)
        }
        if(search){
            let allUsers = []
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
            for(let i=0;i<company[0].dataValues.jobs.dataValues.applied_jobs.length;i++){
                if(FindJob(company[0].dataValues.jobs.dataValues.applied_jobs[i].dataValues.fullName.toLowerCase(),search.toLowerCase())||FindJob(company[0].dataValues.jobs.dataValues.applied_jobs[i].dataValues.stack.toLowerCase(),search.toLowerCase())){
                    allUsers.push(company[0].dataValues.jobs.dataValues.applied_jobs[i])
                }
            }
            company[0].dataValues.jobs.dataValues.applied_jobs = allUsers
        }
        company[0].dataValues.jobs.map(j=>j.dataValues.user_accounts.map(u=>delete u.dataValues.password))
        delete company[0].dataValues.password
        for(let i=0;i<company[0].dataValues.jobs.length;i++){
            company[0].dataValues.jobs[i].dataValues.technologies = company[0].dataValues.jobs[i].dataValues.technologies.concat(company[0].dataValues.jobs[i].dataValues.otherTechs)
            delete company[0].dataValues.jobs[i].dataValues.otherTechs
        }
        res.send(company)
    }catch(error){
        console.log(error)
    }
})

router.get('/notis/:id',async (req,res)=>{
    try {
        const {id} = req.params

        let notis = await compnotis.findAll({
            where:{companyAccountId:id},
            include: {model: meeting, include:[{model:job},{model:user_account}]},
            order:[['createdAt','desc']]
        })
        for(let i=0;i<notis.length;i++){
            notis[i].dataValues.meeting.dataValues.fullName = notis[i].dataValues.meeting.dataValues.user_account.dataValues.fullName
            notis[i].dataValues.meeting.dataValues.emailUser = notis[i].dataValues.meeting.dataValues.user_account.dataValues.email
            if(notis[i].dataValues.meeting.dataValues.job){
                notis[i].dataValues.meeting.dataValues.jobPosition = notis[i].dataValues.meeting.dataValues.job.position
            }
            delete notis[i].dataValues.meeting.dataValues.job
            delete notis[i].dataValues.meeting.dataValues.user_account
            delete notis[i].dataValues.meeting.dataValues.idMeeting
        }
        
        res.send(notis)
    } catch (error) {
        console.log(error)
    }
})

router.post('/register', async (req,res)=>{
    try{
        const {name, email, password} = req.body

        if(!name||!email||!password){
            res.send('There is an invalid field')
        }else{
            if(!/^[a-zA-Z0-9_\-\.\'\!\&\@\$\ ]+$/.test(name)){
                res.send('The name only admits letters')
            }else if(!/^[a-zA-Z0-9_\-\.]+@+[a-zA-Z]+.com/.test(email)){
                res.send('The email has an invalid format')
            }else{
                let mailUser = await user_account.findAll({
                    where:{
                        email: email
                    }
                })
                let mailCompany = await company_account.findAll({
                    where:{
                        email: email
                    }
                })
                if(mailUser.length<1&&mailCompany.length<1){
                    const newCompany = await company_account.create({
                        name,
                        email,
                        password,
                        profileType: 'company'
                    })

                    //------------------NODEMAILER-----------------------//
                    
                    const trasnsporter = nodemailer.createTransport({
                        host:'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth:{
                            user:'rocketdreamjob@gmail.com',
                            pass:'ygpiqhwomytsdkch'
                        }
                    });

                    const mail = {
                        from: '"Rocket 🚀" <rocketdreamjob@gmail.com>',
                        to: `${email}`,
                        subject: 'Welcome to Rocket',
                        html: ` 
                            <span style="color:#46499c; font-size: 45px; font-weight: 700; font-style: italic;" >Rocket</span>
                            <h2>Welcome ${name}!</h2>
                            <p>We can't wait for you to find the best developers for your company</p>
                            <p>And you? What are you waiting for, you can now use Rocket and explore all our services</p>
                            <h5>Thank you very much for trusting us, we hope that ${name} can grow quickly with us, good luck using Rocket!</h5>
                            <a href=https://proyecto-final-nu.vercel.app/>Start now!</a>
                        `
                    }

                    trasnsporter.sendMail(mail, (error, info) => {
                        if (error) console.log('Error con email de bienvenida');
                        else console.log('Email enviado')
                    })

                    //---------------------------------------------------//
                    
                    let empresa = await company_account.findAll({
                        include: [{model:job, include:[{model:technology},{model:applied_job},{model:user_account}]}],
                        where: {id: newCompany.dataValues.id}
                    })
                    empresa[0].dataValues.jobs.map(j=>j.dataValues.user_accounts.map(u=>delete u.dataValues.password))
                    delete empresa[0].dataValues.password
                   
                    res.send(empresa[0])
                }else{
                    res.send('The email is already registered.')
                }
            }
        }

    }catch(error){
        console.log(error)
    }
})

router.put('/notis/:id', async (req,res)=>{
    const {id} = req.params

    let noti = await compnotis.findAll({
        where:{id: id}
    })

    if(noti.length>0){
        await compnotis.update({
            check: true
        },{
            where:{id: id}
        })
    }
    res.send('noti checked')
})

router.put('/report/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {report} = req.body

        let company = await company_account.findAll({
            where:{id: id}
        })

        let reporte = await report_type.findAll({
            where: {name: report}
        })

        if(company.length>0&&reporte.length>0){
            reporte[0].dataValues.id === 1?
            await company_account.update(
                {
                    reports: company[0].dataValues.reports+1,
                    reportSpam: company[0].dataValues.reportSpam+1
                },{
                    where:{id: id}
                }
            )
            : reporte[0].dataValues.id === 2 ?
            await company_account.update(
                {
                    reports: company[0].dataValues.reports+1,
                    reportLang: company[0].dataValues.reportLang+1
                },{
                    where:{id: id}
                }
            )
            : reporte[0].dataValues.id === 3 ?
            await company_account.update(
                {
                    reports: company[0].dataValues.reports+1,
                    reportFalse: company[0].dataValues.reportFalse+1
                },{
                    where:{id: id}
                }
            )
            :
            await company_account.update(
                {
                    reports: company[0].dataValues.reports+1,
                    reportCoIn: company[0].dataValues.reportCoIn+1
                },{
                    where:{id: id}
                }
            )
            res.send('Company reported')
        }else{
            res.send('Company or report type not exist')
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const {id}= req.params;
        const {name,country,city,logo,description,speciality,size,foundation,web_site,banner} = req.body;

        let errores = []

        if(name){
            if(!/^[a-zA-Z0-9\s_\-\.\'\!\&\@\$]+$/.test(name)){
                errores.push('name')
            }else{
                await company_account.update(
                    {
                        name: name
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(country){
            if(!/^[a-zA-Z\s]+$/.test(country)){
                errores.push('country')
            }else{
                await company_account.update(
                    {
                        country: country
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(city){
            if(!/^[a-zA-Z\s]+$/.test(city)){
                errores.push('city')
            }else{
                await company_account.update(
                    {
                        city: city
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(logo){
            await company_account.update(
                {
                    logo: logo
                },{
                    where:{id: id}
                }
            )
        }
        if(description){
            await company_account.update(
                {
                    description: description
                },{
                    where:{id: id}
                }
            )
        }
        
        if(speciality){
            await company_account.update(
                {
                    speciality: speciality
                },{
                    where:{id: id}
                }
            )
        }
        if(size){
            if(size!=='Not Specified'&&size!=='0 - 500'&&size!=='500 - 2000'&&size!=='2000 - 5000'&&size!=='5000 - 10000'&&size!=='10000 - 50000'&&size!=='+50000'){
                res.send('size')
            }else{
                await company_account.update(
                    {
                        size: size
                    },{
                        where:{id: id}
                    }
                )
            }
            
        }
        if(foundation){
            if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(foundation)){
                errores.push('foundation')
            }else{
                await company_account.update(
                    {
                        foundation: foundation
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(web_site){
            if(!/(https?:\/\/.*\.)/.test(web_site)){
                errores.push('web site')
            }else if(/\s/.test(web_site)){
                errores.push('web site')
            }else{
                await company_account.update(
                    {
                        web_site: web_site
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(banner){
            await company_account.update(
                {
                    banner: banner
                },{
                    where:{id: id}
                }
            )
        }
        if(errores.length>0){
            const error = errores.join(', ')
            res.send(`Fields were not updated: ${error}.`)
        }
        let empresa = await company_account.findAll({
            include: [{model:job, include:[{model:technology},{model:applied_job},{model:user_account}]}],
            where:{id:id}
        })
        empresa[0].dataValues.jobs.map(j=>j.dataValues.user_accounts.map(u=>delete u.dataValues.password))
        delete empresa[0].dataValues.password
        res.send(empresa[0])
    }catch(error){
        console.log(error)
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params

        let company = await company_account.findAll({
            where:{id: id}
        })

        if(company.length>0){
            await company_account.update({
                active: !company[0].dataValues.active
            },{
                where: {id: id}
            })
            if(company[0].dataValues.active){
                res.send('Company disabled')
            }else{
                res.send('company enabled')
            }
        }else{
            res.send('Company not exist')
        }

        

        res.send('Company eliminated')
    }catch(error){
        console.log()
    }
})

router.delete('/notis/:id', async (req,res)=>{
    try {
        const {id} = req.params

        let noti = await compnotis.findAll({
            where:{id:id}
        })

        if(noti.length>0){
            await compnotis.destroy({
                where: {id: id}
            })
        }

        res.send('noti deleted')

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
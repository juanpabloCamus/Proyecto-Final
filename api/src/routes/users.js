const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology,meeting,usernotis,compnotis, report_type} = require('../db')
const nodemailer = require('nodemailer');

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let users = await user_account.findAll({
            where:{profileType:"develop",active: true},
            include: [{model:technology},{model:job, include:[{model: company_account},{model:technology}]},{model:education},{model:experience}],
            order: [[education, 'end_date', 'DESC' ]]
        })
        let paginado = []
        if(users.length>0){
            for(let i=0;i<users.length;i++){
                users[i].dataValues.jobs.map(c=>c.dataValues.company_accounts.map(p=>delete p.dataValues.password))
            }
        }
        if(users.length>0){
            let cantPaginas = Math.ceil(users.length/10)
            let inicio = 0
            for(let i=0;i<cantPaginas;i++){
                let cadaPag = {
                    page: i+1,
                    offers: users.slice(inicio,inicio+10)
                }
                inicio = inicio+10
                paginado.push(cadaPag)
            }
        }
        res.send(paginado)
    }catch(error){
        console.log(error)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const {id} = req.params

        let user = await user_account.findAll({
            where:{id:id},
            include: [{model:technology},{model:job, include:[{model: company_account},{model:technology}]},{model: applied_job, include: {model:job, include: [{model:company_account},{model:technology}]}},{model:education},{model:experience}],
            order: [[education, 'end_date', 'DESC' ],[experience, 'end_date', 'DESC' ],[technology, 'name', 'ASC' ]]
        })
        if(user.length<1){
            res.send('User does not exist')
        }
        user[0].dataValues.jobs.map(c=>c.dataValues.company_accounts.map(p=>delete p.dataValues.password))
        res.send(user)

    }catch(error){  
        console.log(error)
    }
})

router.get('/notis/:id',async (req,res)=>{
    try {
        const {id} = req.params

        let notis = await usernotis.findAll({
            where:{userAccountId:id},
            include: {model: meeting, include:[{model:job},{model:company_account}]},
            order:[['createdAt','desc']]
        })
        
        for(let i=0;i<notis.length;i++){
            if(notis[i].dataValues.codeNoti === 1){
                notis[i].dataValues.meeting.dataValues.companyName = notis[i].dataValues.meeting.dataValues.company_account.name
                notis[i].dataValues.meeting.dataValues.jobPosition = notis[i].dataValues.meeting.dataValues.job.position
                notis[i].dataValues.meeting.dataValues.companyLogo = notis[i].dataValues.meeting.dataValues.company_account.logo
                delete notis[i].dataValues.meeting.dataValues.job
                delete notis[i].dataValues.meeting.dataValues.idMeeting
                delete notis[i].dataValues.meeting.dataValues.company_account
            }else if(notis[i].dataValues.codeNoti === 2){
                notis[i].dataValues.meeting.dataValues.companyName = notis[i].dataValues.meeting.dataValues.company_account.name
                notis[i].dataValues.meeting.dataValues.companyLogo = notis[i].dataValues.meeting.dataValues.company_account.logo
                if(notis[i].dataValues.meeting.dataValues.job){
                    notis[i].dataValues.meeting.dataValues.jobPosition = notis[i].dataValues.meeting.dataValues.job.position
                }else{
                    delete notis[i].dataValues.meeting.dataValues.jobId
                }
                delete notis[i].dataValues.meeting.dataValues.job
                delete notis[i].dataValues.meeting.dataValues.idMeeting
                delete notis[i].dataValues.meeting.dataValues.company_account
            }else if(notis[i].dataValues.codeNoti === 3){
                notis[i].dataValues.meeting.dataValues.companyName = notis[i].dataValues.meeting.dataValues.company_account.name
                notis[i].dataValues.meeting.dataValues.companyLogo = notis[i].dataValues.meeting.dataValues.company_account.logo
                delete notis[i].dataValues.meeting.dataValues.job
                delete notis[i].dataValues.meeting.dataValues.idMeeting
                delete notis[i].dataValues.meeting.dataValues.jobId
                delete notis[i].dataValues.meeting.dataValues.company_account
            }
        }
        
        res.send(notis)
    } catch (error) {
        console.log(error)
    }
})

router.post('/:id/education', async (req,res)=>{
    try{
        const {id} = req.params
        const {institution,degree,description,start_date,end_date} = req.body
    
        if(institution&&degree&&start_date&&end_date){
            if(!/^[0-9a-zA-Z\s]+$/.test(institution)){
                res.status(400).send('The institution must only contain etters, numbers and spaces')
            }else if(!/^[0-9a-zA-Z\s]+$/.test(degree)){
                res.status(400).send('The degree must only contain letters, numbers and spaces')
            }else if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(start_date) || start_date === ''){
                res.status(400).send('invalid start date')
            }else if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(end_date) || end_date === ''){
                res.status(400).send('invalid end date') 
            }else{
                let educ = await education.create({
                    institution,
                    degree,
                    description,
                    start_date,
                    end_date
                })
                educ.setUser_account(id)
                res.send(`Your education in ${institution} was successfully added`)
            }
        }else{
            res.status(400).send('Complete the required fields')
        }
    }catch(error){
        console.log(error)
    }
    
})

router.post('/:id/experience', async (req,res)=>{
    try{
        const {id} = req.params
        const {company,position,description,start_date,end_date} = req.body
        if(company&&position){
            if(!/^[a-zA-Z\s]+$/.test(company)){
                res.status(400).send('The company name should only contain letters and spaces')
            }else if(!/^[a-zA-Z\s]+$/.test(position)){
                res.status(400).send('Position must only contain letters and spaces')
            }else if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(start_date) || start_date === '' ){
                res.status(400).send('Invalid start date')
            }else if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(end_date) || end_date === ''){
                res.status(400).send('Invalid end date')
            }else{
                let exp = await experience.create({
                    company,
                    position,
                    description,
                    start_date,
                    end_date
                })
                exp.setUser_account(id)
                res.send(`Your experience in ${company} was successfully added`)
            }
        }else{
            res.status(400).send('Complete the required fields')
        }
    }catch(error){
        console.log(error)
    }
    
})

router.post('/:idUser/favs/:idJob', async (req,res)=>{
    try{
        const {idUser,idJob} = req.params
        const {state} = req.body
        if(idUser&&idJob&&(state===true||state===false)){
            const jobid = await job.findAll({
                where:{id: idJob},
                include: user_account
            })
            if(state===true){
                let inFav = jobid[0].dataValues.user_accounts.find(u=>u.dataValues.id===parseInt(idUser))
                if(inFav){
                    res.send('Its already in favorites')
                }else{
                    jobid[0].addUser_account(idUser)
                    res.send('added to favorites')
                }
            }else{
                jobid[0].removeUser_account(idUser)
                res.send('removed from favorites')
            }
        }else{
            res.send('invalid data')
        }
    }catch(error){
        console.log(error)
    }
})

router.post('/register', async (req,res)=>{
    try{
        const {fullName, email, password} = req.body
        
        if(!fullName||!email||!password){
            res.send('There is an invalid field.')
        }else{
            if(!/^[a-zA-Z\s]+$/.test(fullName)){
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
                    const newUser = await user_account.create({
                        fullName,
                        email,
                        password,
                        profileType: 'develop'
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
                            <h2>Welcome ${fullName}!</h2>
                            <p>We can't wait for you to start looking for your dream job</p>
                            <p>And you? What are you waiting for, you can now use Rocket and explore all our services</p>
                            <h5>Thank you very much for trusting us, we hope you get hired soon for the job of your dreams</h5>
                            <a href=https://proyecto-final-nu.vercel.app/>Start now!</a>
                        `
                    }

                    trasnsporter.sendMail(mail, (error, info) => {
                        if (error) console.log('Error con email de bienvenida');
                        else console.log('Email enviado')
                    })

                    //---------------------------------------------------//

                    let usuario = await user_account.findAll({
                        where: {id: newUser.dataValues.id},
                        include: technology
                    })
                    delete usuario[0].dataValues.password
                    res.send(usuario[0])
                }else{
                    res.send('The email is already registered.')
                }
            }
        }

    }catch(error){
        console.log(error)
    }
})

router.put('/:id', async (req,res)=>{
    try{ 
        const {id} = req.params
        const {fullName, date_birth, profile_pic, description, technologies, stack, banner, currentJob, country, city, english_level, seniority } = req.body

        let errores = []

        if(fullName){
            if(!/^[a-zA-Z\s]+$/.test(fullName)){
                errores.push('name')
            }else{
                await user_account.update(
                    {
                        fullName: fullName
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(date_birth){
            if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(date_birth)){
                errores.push('birth date')
            }else{
                await user_account.update({
                        date_birth: date_birth
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(profile_pic){
            await user_account.update(
                {
                    profile_pic: profile_pic
                },{
                    where:{id: id}
                }
            )
        }
        if(description){
            await user_account.update(
                {
                    description: description
                },{
                    where:{id: id}
                }
            )
        }
        if(typeof technologies === 'object'){
            if(technologies.length>0){
                let newtechnologies = []
                let techs = await technology.findAll({
                    order: [
                        ['id', 'ASC'] 
                    ]
                })
                let usuario = await user_account.findAll({
                    where:{id:id},
                    include: technology
                })
                for(let i=0;i<technologies.length;i++){
                    let tecno = techs.find(t=>t.dataValues.name===technologies[i])
                    newtechnologies.push(tecno.dataValues.id)
                }
                for(let i=0;i<usuario[0].dataValues.technologies.length;i++){
                    await usuario[0].removeTechnology(usuario[0].dataValues.technologies[i].dataValues.id)
                }
                for(let i=0;i<newtechnologies.length;i++){
                    await usuario[0].addTechnology(newtechnologies[i])
                }
            }else{
                if(technologies.length<1){
                    let usuario = await user_account.findAll({
                        where:{id:id},
                        include: technology
                    })
                    for(let i=0;i<usuario[0].dataValues.technologies.length;i++){
                        await usuario[0].removeTechnology(usuario[0].dataValues.technologies[i].dataValues.id)
                    }
                }else{
                    errores.push('technologies')
                }
            }
        }
        if(stack){
            await user_account.update(
                {
                    stack: stack
                },{
                    where:{id: id}
                }
            )
        }
        if(banner){
            await user_account.update(
                {
                    banner: banner
                },{
                    where:{id: id}
                }
            )
        }
        if(currentJob){
            await user_account.update(
                {
                    currentJob: currentJob
                },{
                    where:{id: id}
                }
            )
        }
        if(country){
            if(!/^[a-zA-Z\s]+$/.test(country)){
                errores.push('country')
            }else{
                await user_account.update(
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
                await user_account.update(
                    {
                        city: city
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
        if(seniority){
            if(seniority!=='Not Specified'&&seniority!=='Junior'&&seniority!=='Semi-Senior'&&seniority!=='Senior'){
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
        let user = await user_account.findAll({
            where:{id: id},
            include:technology
        })
        delete user[0].dataValues.password
        if(errores.length>0){
            const error = errores.join(', ')
            res.send(`Fields were not updated: ${error}.`)
        }
        res.send(user[0])
    }catch(error){
        console.log(error)
    }
})

router.put('/education/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {institution,degree,description,start_date,end_date} = req.body

        let errores = []

        if(institution){
            if(/^[a-zA-Z\s]+$/.test(institution)){
                await education.update(
                    {
                        institution: institution
                    },{
                        where:{id: id}
                    }
                )
            }else{
                errores.push('institution')
            }
        }
        if(degree){
            if(/^[0-9a-zA-Z\s]+$/.test(degree)){
                await education.update(
                    {
                        degree: degree
                    },{
                        where:{id: id}
                    }
                )
            }else{
                errores.push('degree')
            }
        }
        if(description){
            await education.update(
                {
                    description: description
                },{
                    where:{id: id}
                }
            )
        }
        if(start_date){
            if(/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(start_date)){
                await education.update(
                    {
                        start_date: start_date
                    },{
                        where:{id: id}
                    }
                )
            }else{ 
                errores.push('start date')
            }
        }
        if(end_date){
            if(/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(end_date)){
                await education.update(
                    {
                        end_date: end_date
                    },{
                        where:{id: id}
                    }
                )
            }else{
                errores.push('end date')
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

router.put('/report/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {report} = req.body

        let user = await user_account.findAll({
            where:{id: id}
        })

        let reporte = await report_type.findAll({
            where:{name:report}
        })

        if(user.length>0&&reporte.length>0){
            reporte[0].dataValues.id === 1?
            await user_account.update(
                {
                    reports: user[0].dataValues.reports+1,
                    reportSpam: user[0].dataValues.reportSpam+1
                },{
                    where:{id: id}
                }
            )
            : reporte[0].dataValues.id === 2 ?
            await user_account.update(
                {
                    reports: user[0].dataValues.reports+1,
                    reportLang: user[0].dataValues.reportLang+1
                },{
                    where:{id: id}
                }
            )
            : reporte[0].dataValues.id === 3 ?
            await user_account.update(
                {
                    reports: user[0].dataValues.reports+1,
                    reportFalse: user[0].dataValues.reportFalse+1
                },{
                    where:{id: id}
                }
            )
            :
            await user_account.update(
                {
                    reports: user[0].dataValues.reports+1,
                    reportCoIn: user[0].dataValues.reportCoIn+1
                },{
                    where:{id: id}
                }
            )
            res.send('User reported')
            
        }else{
            res.send('User or report type not exist')
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/experience/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {company,position,description,start_date,end_date} = req.body

        let errores = []

        if(company){
            if(/^[a-zA-Z\s]+$/.test(company)){
                await experience.update(
                    {
                        company: company
                    },{
                        where:{id: id}
                    }
                )
            }else{
                errores.push('company')
            }
        }
        if(position){
            if(/^[a-zA-Z\s]+$/.test(position)){
                await experience.update(
                    {
                        position: position
                    },{
                        where:{id: id}
                    }
                )
            }else{
                errores.push('position')
            }
        }
        if(description){
            await experience.update(
                {
                    description: description
                },{
                    where:{id: id}
                }
            )
        }
        if(start_date){
            if(/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(start_date)){
                await experience.update(
                    {
                        start_date: start_date
                    },{
                        where:{id: id}
                    }
                )
            }else{
                errores.push('start_date')
            }
        }
        if(end_date){
            if(/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(end_date)){
                await experience.update(
                    {
                        end_date: end_date
                    },{
                        where:{id: id}
                    }
                )
            }else{
                errores.push('end_date')
            }
        }
        if(errores.length>0){
            const error = errores.join(', ')
            res.send(`Fields were not updated: ${error}.`)
        }
        res.send('updated data')

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params

        let user = await user_account.findAll({
            where:{id: id}
        })

        if(user.length>0){
            await user_account.update({
                active: !user[0].dataValues.active
            },{
                where: {id: id}
            })
            if(user[0].dataValues.active){
                res.send('User disabled')
            }else{
                res.send('User enabled')
            }
        }else{
            res.send('user not exists')
        }


        
    }catch(error){
        console.log(error)
    }
})

router.delete('/education/:id', async (req,res)=>{
    try{
        const {id} = req.params
        await education.destroy({
            where:{id:id}
        })
        res.send('Sucesfully deleted')
    }catch(error){
        res.status(400).send(error)
        console.log(error)
    }
})

router.delete('/experience/:id', async (req,res)=>{
    try{
        const {id} = req.params
        await experience.destroy({
            where:{id:id}
        })
        res.send('Sucesfully deleted')
    }catch(error){
        res.status(400).send(error)
        console.log(error)
    }
})

module.exports = router;
const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let users = await user_account.findAll({
            include: [{model:technology},{model:job, include:[{model: company_account},{model:technology}]},{model:education}]
        })
        if(users.length>0){
            for(let i=0;i<users.length;i++){
                users[i].dataValues.jobs.map(c=>c.dataValues.company_accounts.map(p=>delete p.dataValues.password))
            }
        }
        res.send(users)
    }catch(error){
        console.log(error)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const {id} = req.params

        let user = await user_account.findAll({
            where:{id:id},
            include: [{model:technology},{model:job, include:[{model: company_account},{model:technology}]},{model:education}]
        })
        if(user.length<1){
            res.send('No existe el usuario')
        }
        user[0].dataValues.jobs.map(c=>c.dataValues.company_accounts.map(p=>delete p.dataValues.password))
        res.send(user)

    }catch(error){
        console.log(error)
    }
})

router.post('/:id/education', async (req,res)=>{
    try{
        const {id} = req.params
        const {title,institution,degree,description,start_date,end_date} = req.body
    
        if(title&&institution&&degree){
            if(!/^[a-zA-Z\s]+$/.test(title)){
                res.send('El titulo solo debe contener letras y espacios')
            }else if(!/^[a-zA-Z\s]+$/.test(institution)){
                res.send('La institucion solo debe contener letras y espacios')
            }else if(!/^[0-9a-zA-Z\s]+$/.test(degree)){
                res.send('el grado solo debe contener letras, numeros y espacios')
            }else{
                let educ = await education.create({
                    title,
                    institution,
                    degree,
                    description,
                    start_date,
                    end_date
                })
                educ.setUser_account(id)
                res.send(educ)
            }
        }else{
            res.send('Completar los campos obligatorios')
        }
    }catch(error){
        console.log(error)
    }
    
})

router.post('/:idUser/favs/:idJob', async (req,res)=>{
    try{
        const {idUser,idJob} = req.params
        const {state} = req.body
        console.log(state)
        if(idUser&&idJob&&(state===true||state===false)){
            const jobid = await job.findAll({
                where:{id: idJob},
                include: user_account
            })
            if(state===true){
                let inFav = jobid[0].dataValues.user_accounts.find(u=>u.dataValues.id===parseInt(idUser))
                if(inFav){
                    res.send('Ya esta en favoritos')
                }else{
                    jobid[0].addUser_account(idUser)
                    res.send('Agregado a favoritos')
                }
            }else{
                jobid[0].removeUser_account(idUser)
                res.send('eliminado de favoritos')
            }
        }else{
            res.send('datos invalidos')
        }
    }catch(error){
        console.log(error)
    }
})

router.post('/register', async (req,res)=>{
    try{
        const {fullName, email, password, profileType} = req.body
        
        if(!fullName||!email||!password){
            res.send('Hay un campo invalido.')
        }else{
            if(!/^[a-zA-Z\s]+$/.test(fullName)){
                res.send('El nombre solo admite letras')
            }else if(!/^[a-zA-Z0-9_\-\.]+@+[a-zA-Z]+.com/.test(email)){
                res.send('El mail tiene un formato invalido')
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
                    let usuario = await user_account.findAll({
                        where: {id: newUser.dataValues.id},
                        include: technology
                    })
                    delete usuario[0].dataValues.password
                    res.send(usuario[0])
                }else{
                    res.send('El email ya se encuentra registrado.')
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
                errores.push('nombre')
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
                errores.push('fecha de nacimiento')
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
            if(!/(https?:\/\/.*\.)/.test(profile_pic)){
                errores.push('imagen')
            }else if(/\s/.test(profile_pic)){
                errores.push('imagen')
            }else{
                await user_account.update(
                    {
                        profile_pic: profile_pic
                    },{
                        where:{id: id}
                    }
                )
            }
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
                for(let i=0;i<technologies.length;i++){
                    let tecno = techs.find(t=>t.dataValues.name===technologies[i])
                    newtechnologies.push(tecno.dataValues.id)
                }
                let usuario = await user_account.findAll({
                    where:{id:id}
                })
                usuario = usuario[0]
                for(let i=0;i<newtechnologies.length;i++){
                    await usuario.addTechnology(newtechnologies[i])
                }
            }else{
                if(technologies.length<1){
                }else{
                    errores.push('tecnologias')
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
            if(!/(https?:\/\/.*\.)/.test(banner)){
                errores.push('banner')
            }else if(/\s/.test(banner)){
                errores.push('banner')
            }else{
                await user_account.update(
                    {
                        banner: banner
                    },{
                        where:{id: id}
                    }
                )
            }
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
                errores.push('pais')
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
                errores.push('ciudad')
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
            if(english_level === 'Not specified' || english_level === 'Basic' || english_level === 'Conversational ' || english_level === 'Advanced or Native'){
                await user_account.update(
                    {
                        english_level: english_level
                    },{
                        where:{id: id}
                    }
                )
            }
            else{
                errores.push('english level')
            }
        }
        if(seniority){
            if(seniority === 'Not specified' || seniority === 'Junior' || seniority === 'Semi-Senior ' || seniority === 'Senior'){
                await user_account.update(
                    {
                        seniority: seniority
                    },{
                        where:{id: id}
                    }
                )
            }
            else{
                errores.push('english level')
            }
        }
        let user = await user_account.findAll({
            where:{id: id}
        })
        delete user[0].dataValues.password
        if(errores.length>0){
            const error = errores.join(', ')
            res.send(`No se actualizaron los campos: ${error}.`)
        }
        res.send(user[0])
    }catch(error){
        console.log(error)
    }
})

router.put('/education/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {title,institution,degree,description,start_date,end_date} = req.body

        let errores = []

        if(title){
            if(/^[a-zA-Z\s]+$/.test(title)){
                await education.update(
                    {
                        title: title
                    },{
                        where:{id: id}
                    }
                )
            }else{
                errores.push('titulo')
            }
        }
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
                errores.push('institucion')
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
                errores.push('grado')
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
                errores.push('fecha de inicio')
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
                errores.push('fecha de finalizacion')
            }
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
    try{
        const {id} = req.params

        await user_account.update({
            active: false
        },{
            where: {id: id}
        })

        res.send('usuario eliminado')
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
        res.send('eliminado')
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
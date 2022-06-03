const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let users = await user_account.findAll({
            where:{profileType:"develop"},
            include: [{model:technology},{model:job, include:[{model: company_account},{model:technology}]},{model:education},{model:experience}],
            order: [[education, 'end_date', 'DESC' ]]
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
            include: [{model:technology},{model:job, include:[{model: company_account},{model:technology}]},{model:education},{model:experience}],
            order: [[education, 'end_date', 'DESC' ],[experience, 'end_date', 'DESC' ],[technology, 'name', 'ASC' ]]
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
    
        if(title&&institution&&degree&&description&&start_date&&end_date){
            if(!/^[a-zA-Z\s]+$/.test(title)){
                res.send('El titulo solo debe contener letras y espacios')
            }else if(!/^[a-zA-Z\s]+$/.test(institution)){
                res.send('La institucion solo debe contener letras y espacios')
            }else if(!/^[0-9a-zA-Z\s]+$/.test(degree)){
                res.send('el grado solo debe contener letras, numeros y espacios')
            }else if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(start_date)){
                res.send('fecha de inicio invalida')
            }else if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(end_date)){
                res.send('fecha de finalizacion invalida')
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

router.post('/:id/experience', async (req,res)=>{
    try{
        const {id} = req.params
        const {company,position,description,start_date,end_date} = req.body
    
        if(company&&position&&description&&start_date&&end_date){
            if(!/^[a-zA-Z\s]+$/.test(company)){
                res.send('El nombre de la empresa solo debe contener letras y espacios')
            }else if(!/^[a-zA-Z\s]+$/.test(position)){
                res.send('La posicion solo debe contener letras y espacios')
            }else if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(start_date)){
                res.send('fecha de inicio invalida')
            }else if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(end_date)){
                res.send('fecha de finalizacion invalida')
            }else{
                let exp = await experience.create({
                    company,
                    position,
                    description,
                    start_date,
                    end_date
                })
                exp.setUser_account(id)
                res.send(exp)
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
        const {fullName, email, password} = req.body
        
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

router.delete('/experience/:id', async (req,res)=>{
    try{
        const {id} = req.params
        await experience.destroy({
            where:{id:id}
        })
        res.send('eliminado')
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let company = await company_account.findAll()
        res.send(company)
    }catch(error){
        console.log(error)
    }
})

router.post('/login', async (req,res)=>{
    try{
        const {email, password} = req.body;

        let mailCompany = await company_account.findAll({
            where:{
                email: email
            }
        })
        if(mailCompany.length>0){
            if(mailCompany[0].password===password){
                res.send('Logueado con exito.')
            }else{
                res.send('Contraseña no valida.')
            }
        }else{
            res.send('El mail ingresado no es valido.')
        }
    }catch(error){
        console.log(error)
    }
})

router.post('/register', async (req,res)=>{
    try{
        const {name, email, password} = req.body

        if(!name||!email||!password){
            res.send('Hay un campo invalido.')
        }else{
            if(!/^[a-zA-Z0-9_\-\.\'\!\&\@\$\ ]+$/.test(name)){
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
                    const newCompany = await company_account.create({
                        name,
                        email,
                        password
                    })
                    res.send('Empresa creada correctamente.')
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
        const {id}= req.params;
        const {name,country,city,logo,description,specialty,size,foundation,web_site,banner} = req.body;

        let errores = []

        if(name){
            if(!/^[a-zA-Z0-9_\-\.\'\!\&\@\$\ ]+$/.test(name)){
                errores.push('nombre')
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
            if(!/^[a-zA-Z ]+$/.test(country)){
                errores.push('pais')
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
            if(!/^[a-zA-Z ]+$/.test(city)){
                errores.push('ciudad')
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
            if(!/(https?:\/\/.*\.)/.test(logo)){
                errores.push('logo')
            }else if(/\s/.test(logo)){
                errores.push('logo')
            }else{
                await company_account.update(
                    {
                        logo: logo
                    },{
                        where:{id: id}
                    }
                )
            }
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
        if(specialty){
            await company_account.update(
                {
                    specialty: specialty
                },{
                    where:{id: id}
                }
            )
        }
        if(size){
            await company_account.update(
                {
                    size: size
                },{
                    where:{id: id}
                }
            )
        }
        if(foundation){
            if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(foundation)){
                errores.push('fundacion')
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
            if(!/(https?:\/\/.*\.)/.test(banner)){
                errores.push('banner')
            }else if(/\s/.test(banner)){
                errores.push('banner')
            }else{
                await company_account.update(
                    {
                        banner: banner
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(errores.length>0){
            const error = errores.join(', ')
            res.send(`No se actualizaron los campos: ${error}.`)
        }
        res.send('datos actualizados.')
    }catch(error){
        console.log(error)
    }
})

//

router.get('/:id', async (req,res)=>{
    const { id } = req.params
    try{
        let company = await company_account.findByPk(id
            , {
            include: job
        }
        )
        res.send(company)
    }catch(error){
        console.log(error)
    }
})

router.get('/jobApplication/:id', async (req,res)=>{
    const { id } = req.params
    try{
        let company = await job.findByPk(id, {
                include: applied_job
        })
         console.log(company)
        res.send(company)
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let users = await user_account.findAll()
        res.send(users)
    }catch(error){
        console.log(error)
    }
})

router.post('/register', async (req,res)=>{
    try{
        const {name, last_name, email, password} = req.body

        if(!name||!last_name||!email||!password){
            res.send('Hay un campo invalido.')
        }else{
            if(!/^[a-zA-Z]+$/.test(name)){
                res.send('El nombre solo admite letras')
            }else if(!/^[a-zA-Z]+$/.test(last_name)){
                res.send('El apellido solo admite letras')
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
                        name,
                        last_name,
                        email,
                        password
                    })
                    res.send('Usuario creado correctamente.')
                }else{
                    res.send('El email ya se encuentra registrado.')
                }
            }
        }

    }catch(error){
        console.log(error)
    }
})

router.post('/login', async (req,res)=>{
    try{
        const {email, password} = req.body;

        let mailUser = await user_account.findAll({
            where:{
                email: email
            }
        })
        if(mailUser.length>0){
            if(mailUser[0].password===password){
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

router.put('/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const {name, last_name, date_birth, profile_pic, description} = req.body

        let errores = []

        if(name){
            if(!/^[a-zA-Z]+$/.test(name)){
                errores.push('nombre')
            }else{
                await user_account.update(
                    {
                        name: name
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(last_name){
            if(!/^[a-zA-Z]+$/.test(last_name)){
                errores.push('apellido')
            }else{
                await user_account.update(
                    {
                        last_name: last_name
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
                await user_account.update(
                    {
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
        if(errores.length>0){
            const error = errores.join(', ')
            res.send(`No se actualizaron los campos: ${error}.`)
        }
        res.send('datos actualizados.')
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
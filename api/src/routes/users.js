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

router.post('/', async (req,res)=>{
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

module.exports = router;
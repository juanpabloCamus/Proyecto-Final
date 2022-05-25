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
            if(!/^[a-zA-Z0-9_\-\.\'\!\&\@\$]+$/.test(name)){
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
            include: [{
                model: applied_job,
                where: {id_job: id}
            }]
        })
        res.send(company)
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
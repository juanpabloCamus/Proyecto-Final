const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.post('/', async (req,res)=>{
    try{
        const {email, password} = req.body;

        let mailUser = await user_account.findAll({
            where:{
                email: email,
            },
        })
        if(mailUser.length>0){
            if(mailUser[0].password===password){
                delete mailUser[0].dataValues.password
                res.send(mailUser[0])
            }else{
                res.send('Contraseña no valida.')
            }
        }else{
            let mailCompany = await company_account.findAll({
                where:{
                    email: email
                },
                    include: job
            })
            if(mailCompany.length>0){
                if(mailCompany[0].password===password){
                    delete mailCompany[0].dataValues.password
                    res.send(mailCompany[0])
                }else{
                    res.send('Contraseña no valida.')
                }
            }else{
                res.send('El mail ingresado no es valido.')
            }
        }
    }catch(error){
        console.log(error)
    }
})


module.exports = router;
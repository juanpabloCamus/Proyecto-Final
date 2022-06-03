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
            include: [{model:technology},{model:job}]
        })
        if(mailUser.length>0){
            if(mailUser[0].password===password){
                delete mailUser[0].dataValues.password
                res.send(mailUser[0])
            }else{
                res.send('Your email and password does not match. Please try again.')
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
                    res.send('Your password does not match. Please try again.')
                }
            }else{
                res.send('This email is not valid. Please try again.')
            }
        }
    }catch(error){
        console.log(error)
    }
})


module.exports = router;
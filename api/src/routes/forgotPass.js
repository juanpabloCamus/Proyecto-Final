const { Router } = require('express');
const {company_account, user_account} = require('../db');
const nodemailer = require('nodemailer')
const router = Router();

router.post('/', async (req, res) => {

    const {email} = req.body

    if(email){
        if(!/^[a-zA-Z0-9_\-\.]+@+[a-zA-Z]+.com/.test(email)) return res.status(400).send('The email has an invalid format')
        let user = await user_account.findAll({where: {email:email}})
        if(user.length === 0) user = await company_account.findAll({where: {email:email}})
        if(user.length === 0) return res.status(400).send('This email is not registered')
        if(user[0].dataValues.recoverId !== null) return res.status(400).send('We have already sent you an email to change your password')
        
        try{

            let recoverId = Math.trunc(1000000*Math.random())
            
            if (user[0].dataValues.profileType === 'develop'){
                user = {
                    name: user[0].dataValues.fullName,
                }

                await user_account.update({recoverId : recoverId}, {where:{email:email}})
            }
            else{
                user = {
                    name: user[0].dataValues.name,
                }
                await company_account.update({recoverId : recoverId}, {where:{email:email}})
            }
            console.log(recoverId);
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
                subject: 'Forgot your password',
                html: ` 
                    <span style="color:#46499c; font-size: 45px; font-weight: 700; font-style: italic;" >Rocket</span>
                    <h2>Hi ${user.name}!</h2>
                    <p>We hope you can access your account soon, to continue you must complete <a href='https://proyecto-final-nu.vercel.app/recover/password'>this form</a> with this recovery code </p>
                    <h2>${recoverId}</h2>
                    <br></br>
                    <h5>Thank you very much for trusting us, we hope you get hired soon for the job of your dreams</h5>
                    
                `
            }

            trasnsporter.sendMail(mail, (error, info) => {
                if (error) res.status(400).send('A error has ocurred');
                else console.log('Email enviado')
            })

            //---------------------------------------------------//
            
            res.status(200).send(`We send you an email to ${email}. Please follow the steps for recovery. If you didn't get anything, please check spam`)
        }catch(e){
            res.status(400).send(e)
        }
    }
    else{
        res.status(400).send('A error has ocurred')
    }
})

router.post('/recover', async (req,res) => {

    const {profileType, recoverId, password} = req.body
    
    if(recoverId&&profileType&&password){
        if(profileType === 'develop'){
            try{
                let user = await user_account.findAll({where:{recoverId:recoverId}})
                if (user.length === 0) {
                    return res.status(400).send('The code you entered is incorrect')
                }else{
                    await user_account.update({password:password}, {where:{recoverId:recoverId}})
                    await user_account.update({recoverId:null}, {where:{recoverId:recoverId}})
                    return res.status(200).send('Your password has been change')
                }
            }catch(e){
                return res.status(400).send(e)
            }
        }
        if(profileType === 'company'){
            try{
                let user = await company_account.findAll({where:{recoverId:recoverId}})
                if (user.length === 0) {
                    return res.status(400).send('The code you entered is incorrect')
                }else{
                    await company_account.update({password:password}, {where:{recoverId:recoverId}})
                    await company_account.update({recoverId:null}, {where:{recoverId:recoverId}})
                    return res.status(200).send('Your password has been change')
                }
            }catch(e){
                return res.status(400).send(e)
            }
        }
    }else{
        return res.status(400).send('A error has ocurred')
    }
})

module.exports = router
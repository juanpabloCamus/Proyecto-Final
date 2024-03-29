const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology, otherTechs, meeting, usernotis, compnotis} = require('../db')
const nodemailer = require('nodemailer');

const router = Router();

router.get('/room/:id', async (req,res)=>{
    try {
        const {id} = req.params
        let room = await meeting.findAll({
            where: {id: id}
        })
        
        if(room[0] ?? room[0].dataValues.idMeeting){
            delete room[0].dataValues.messege
            delete room[0].dataValues.createdAt
            delete room[0].dataValues.jobId
            delete room[0].dataValues.status

            res.send(room)
        }else{
            res.send('invalid room')
        }

    } catch (error) {
        console.log(error)
    }
})

router.post('/arrangeMeeting', async (req,res)=>{
    try {
        const {messege,id_comp,id_dev,id_job} = req.body
        
        let {dateTime} = req.body
        
        if(dateTime){
            let meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            let array = dateTime.split('-')
            let array2 = array[2].split('T')
            array.pop()
            array = array.concat(array2)
            array[1] = meses[array[1]-1]
            array = [array[1],array[2],array[0],array[3]]
            dateTime = array.join(' ')
        }
        if(dateTime&&messege&&id_comp&&id_dev&&id_job){
            let meet = await meeting.create({
                dateTime: dateTime,
                messege: messege,
            })
            let notiUser = await usernotis.create({
                codeNoti: 1
            })
            notiUser.setUser_account(id_dev)
            notiUser.setMeeting(meet.dataValues.id)
            meet.setJob(id_job)
            meet.setUser_account(id_dev)
            meet.setCompany_account(id_comp)

            let user = await user_account.findAll({
                where: {id: id_dev}
            })

            let company = await company_account.findAll({
                where: {id: id_comp}
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

            const email = {
                from: '"Rocket 🚀" <rocketdreamjob@gmail.com>',
                to: `${user[0].dataValues.email}`,
                subject: `Meeting with ${company[0].dataValues.name}`,
                html: ` 
                    <span style="color:#46499c; font-size: 45px; font-weight: 700; font-style: italic;" >Rocket</span>
                    <h2>Hi ${user[0].dataValues.fullName}!</h2>
                    <p>We are excited because ${company[0].dataValues.name} has requested a meeting with you on ${dateTime.slice(0,11)}, in Rocket notifications you can see all the details. Good luck!</p>
                    <h5>Thank you very much for trusting us, we hope you get hired soon for the job of your dreams</h5>
                    <a href=https://proyecto-final-nu.vercel.app/>Go to Rocket!</a>
                `
            }

            trasnsporter.sendMail(email, (error, info) => {
                if (error) console.log('Error con email de bienvenida');
                else console.log('Email enviado')
            })

            //---------------------------------------------------        
            
            res.send('Meeting created')
        }else{
            res.send('Invalid data')
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/compMeeting', async (req,res)=>{
    try {
        const {messege,id_comp,idDev} = req.body
        
        let {dateTime} = req.body
        
        if(dateTime){
            let meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            let array = dateTime.split('-')
            let array2 = array[2].split('T')
            array.pop()
            array = array.concat(array2)
            array[1] = meses[array[1]-1]
            array = [array[1],array[2],array[0],array[3]]
            dateTime = array.join(' ')
        }
        if(dateTime&&messege&&id_comp&&idDev){
            let meet = await meeting.create({
                dateTime: dateTime,
                messege: messege,
            })
            let notiUser = await usernotis.create({
                codeNoti: 3
            })
            notiUser.setUser_account(idDev)
            notiUser.setMeeting(meet.dataValues.id)
            meet.setUser_account(idDev)
            meet.setCompany_account(id_comp)

            let user = await user_account.findAll({
                where: {id: idDev}
            })

            let company = await company_account.findAll({
                where: {id: id_comp}
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

            const email = {
                from: '"Rocket 🚀" <rocketdreamjob@gmail.com>',
                to: `${user[0].dataValues.email}`,
                subject: `Meeting with ${company[0].dataValues.name}`,
                html: ` 
                    <span style="color:#46499c; font-size: 45px; font-weight: 700; font-style: italic;" >Rocket</span>
                    <h2>Hi ${user[0].dataValues.fullName}!</h2>
                    <p>We are excited because ${company[0].dataValues.name} has requested a meeting with you on ${dateTime.slice(0,11)}, in Rocket notifications you can see all the details. Good luck!</p>
                    <h5>Thank you very much for trusting us, we hope you get hired soon for the job of your dreams</h5>
                    <a href=https://proyecto-final-nu.vercel.app/>Go to Rocket!</a>
                `
            }

            trasnsporter.sendMail(email, (error, info) => {
                if (error) console.log('Error con email de bienvenida');
                else console.log('Email enviado')
            })

            //---------------------------------------------------              

            res.send('Meeting created')
        }else{
            res.send('Invalid data')
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/statusDev/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {status} = req.body

        if(status){
            let idMeet = Math.random()*100000000000000000+'rocket'

            let meet = await meeting.findAll({
                where: {id:id}
            })
            
            await meeting.update({
                status: status,
                idMeeting: idMeet
            },{
                where: {id: id}
            })
            let notiComp = await compnotis.create({
                codeNoti:1
            })
            let notiUser = await usernotis.create({
                codeNoti:2
            })
            notiUser.setUser_account(meet[0].dataValues.userAccountId)
            notiUser.setMeeting(id)
            notiComp.setCompany_account(meet[0].dataValues.companyAccountId)
            notiComp.setMeeting(id)

        }else{
            let meet = await meeting.findAll({
                where: {id:id}
            })
            await meeting.update({
                status: status
            },{
                where: {id: id}
            })
            let notiComp = await compnotis.create({
                codeNoti:2
            })
            notiComp.setCompany_account(meet[0].dataValues.companyAccountId)
            notiComp.setMeeting(id)
        }

        res.send(status?'offer accepted':'offer declined')

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
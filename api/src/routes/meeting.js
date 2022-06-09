const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology, otherTechs, meeting, usernotis, compnotis} = require('../db')

const router = Router();

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
            res.send('meeting created')
        }else{
            res.send('invalid data')
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

            await meeting.update({
                status: status,
                idMeeting: idMeet
            },{
                where: {id: id}
            })
        }else{
            await meeting.update({
                status: status
            },{
                where: {id: id}
            })
        }

        res.send(status?'offer accepted':'offer declined')

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology, otherTechs, meeting} = require('../db')

const router = Router();

router.post('/arrangeMeeting', async (req,res)=>{
    try {
        const {dateTime,messege,id_comp,id_dev} = req.body

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

        if(dateTime&&messege&&id_comp&&id_dev){
            let meet = await meeting.create({
                dateTime: dateTime,
                messege: messege,
            })
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


module.exports = router;
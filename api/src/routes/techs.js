const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let techs = await technology.findAll({
            order: [
                ['id', 'ASC'] 
            ]
        })
        res.send(techs)
    }catch(error){
        console.log(error)
    }
})

router.put('/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {name} = req.body

        await technology.update({
            name: name
        },{
            where: {id: id}
        })

        res.send('actualizado')

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        const {id} = req.params

        technology.destroy({
            where:{id:id}
        })
        res.send('eliminado')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
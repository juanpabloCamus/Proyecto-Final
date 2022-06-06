const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology, otherTechs} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let techs = await technology.findAll({
            order: [
                ['name', 'ASC'] 
            ]
        })
        res.send(techs)
    }catch(error){
        console.log(error) 
    }
})

router.post('/:id', async (req,res)=>{
    try {
        const {id} = req.params

        let otherT = await otherTechs.findAll({
            where:{id: id},
            include: job
        })
        let newTech = await technology.create({
            name: otherT[0].dataValues.name
        })
        for(let i=0;i<otherT[0].dataValues.jobs.length;i++){
            otherT[0].dataValues.jobs[i].removeOtherTechs(otherT[0].dataValues.id)
            otherT[0].dataValues.jobs[i].addTechnology(newTech.dataValues.id)
        }
        await otherTechs.destroy({
            where:{id:id}
        })
        res.send('Agregado a tecnologias')
    } catch (error) {
        console.log(error)
    }
})

router.get('/others', async (req,res)=>{
    try {
        let techs = await otherTechs.findAll({
            order: [
                ['count', 'DESC'] 
            ]
        })
        res.send(techs)
    } catch (error) {
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

        res.send('updated')

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
        res.send('deleted')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
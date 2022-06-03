const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try {
        const apJob = await applied_job.findAll({
            include: user_account
        })
        res.send(apJob)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req,res)=>{
    try{
        const {idUser, idJob, publicID, description} = req.body;
        if(publicID&&description){
                const user = await user_account.findAll({
                    where: {id: idUser},
                    include: applied_job
                })
                const jobs = await job.findAll({
                    where: {id: idJob}
                })
                if(user[0].dataValues.applied_jobs.find(j=>j.dataValues.jobId===parseInt(idJob))&&user&&jobs){
                    res.send('ya existe la relacion')
                }else{
                    let postulacion = await applied_job.create({
                        pdf: publicID,
                        description: description,
                    })
                    await postulacion.setUser_account(user[0].dataValues.id)
                    await postulacion.setJob(jobs[0].dataValues.id)

                    res.send('creado');
                }
        }else{
            res.send('datos invalidos')
        }
    }catch(error){
        console.log(error)
    }
})

router.put('/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {publicID, description} = req.body

        if(publicID){
            applied_job.update({
                pdf: publicID
            },{
                where:{id: id}
            })
        }
        if(description){
            applied_job.update({
                description: description
            },{
                where:{id: id}
            })
        }
        if(pdf||description){
            res.send('Datos actualizados.')
        }
        res.send('Datos invalidos')

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:idApli', async (req,res)=>{
    try{
        const {idApli} = req.params

        await applied_job.destroy({
            where:{id: idApli}
        })
        res.send('eliminado')

    }catch(error){
        console.log(error)
    }
})

module.exports = router;
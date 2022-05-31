const { Router } = require('express');
const axios = require('axios');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    try{
        let users = await user_account.findAll({
            include: technology
        })

        res.send(users)
    }catch(error){
        console.log(error)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const {id} = req.params

        let user = await user_account.findAll({
            where:{id:id},
            include: technology
        })
        if(user.length<1){
            res.send('No existe el usuario')
        }
        res.send(user)

    }catch(error){
        console.log(error)
    }
})



router.post('/register', async (req,res)=>{
    try{
        const {fullName, email, password} = req.body

        if(!fullName||!email||!password){
            res.send('Hay un campo invalido.')
        }else{
            if(!/^[a-zA-Z\s]+$/.test(fullName)){
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
                    const newUser = await user_account.create({
                        fullName,
                        email,
                        password,
                        profileType: 'develop'
                    })
                    let usuario = await user_account.findAll({
                        where: {id: newUser.dataValues.id},
                        include: technology
                    })
                    delete usuario[0].dataValues.password
                    res.send(usuario[0])
                }else{
                    res.send('El email ya se encuentra registrado.')
                }
            }
        }

    }catch(error){
        console.log(error)
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const {fullName, date_birth, profile_pic, description, technologies} = req.body

        let errores = []

        if(fullName){
            if(!/^[a-zA-Z\s]+$/.test(fullName)){
                errores.push('nombre')
            }else{
                await user_account.update(
                    {
                        fullName: fullName
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(date_birth){
            if(!/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/.test(date_birth)){
                errores.push('fecha de nacimiento')
            }else{
                await user_account.update(
                    {
                        date_birth: date_birth
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(profile_pic){
            if(!/(https?:\/\/.*\.)/.test(profile_pic)){
                errores.push('imagen')
            }else if(/\s/.test(profile_pic)){
                errores.push('imagen')
            }else{
                await user_account.update(
                    {
                        profile_pic: profile_pic
                    },{
                        where:{id: id}
                    }
                )
            }
        }
        if(description){
            await user_account.update(
                {
                    description: description
                },{
                    where:{id: id}
                }
            )
        }
        if(typeof technologies === 'object'){
            if(technologies.length>0){
                let newtechnologies = []
                let techs = await technology.findAll({
                    order: [
                        ['id', 'ASC'] 
                    ]
                })
                for(let i=0;i<technologies.length;i++){
                    let tecno = techs.find(t=>t.dataValues.name===technologies[i])
                    newtechnologies.push(tecno.dataValues.id)
                }
                let usuario = await user_account.findAll({
                    where:{id:id}
                })
                usuario = usuario[0]
                for(let i=0;i<newtechnologies.length;i++){
                    await usuario.addTechnology(newtechnologies[i])
                }
            }else{
                if(technologies.length<1){
                }else{
                    errores.push('tecnologias')
                }
            }
        }
        if(errores.length>0){
            const error = errores.join(', ')
            res.send(`No se actualizaron los campos: ${error}.`)
        }
        res.send('datos actualizados.')
    }catch(error){
        console.log(error)
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params

        await user_account.update({
            active: false
        },{
            where: {id: id}
        })

        res.send('usuario eliminado')
    }catch(error){
        console.log(error)
    }
})

module.exports = router;
const { Router } = require('express');
const axios = require('axios');
const {UserAccount} = require('../db')

const router = Router();

router.get('/', async (req,res)=>{
    const users = await UserAccount.findAll({
        where:{
            name: agus
        }
    })
    res.send('users')
})


module.exports = router;
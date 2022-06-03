const { Router } = require('express');
const axios = require('axios');
const { cloudinary } = require('../utils/cloudinaryConfig')
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')

const router = Router();

router.post('/', async (req,res)=>{ 
    try{
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'b2ml2dvj'
        })
        res.send(uploadedResponse.public_id)
    }catch(error){
        console.log(error)
    }
})  

module.exports = router;
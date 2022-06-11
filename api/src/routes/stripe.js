const { Router } = require('express');
const {company_account, user_account, experience, education, job, applied_job, technology} = require('../db')
const Stripe = require('stripe');

const router = Router();

const stripe = new Stripe("sk_test_51L81c0EOWKFCUuQuMDreApqgh1IAXci6RbVtq36eyZ19xwOBjVhB2pS1bRKZagrhUxdYu6HGKYz6HdumtIhfDn9J0070acUKvJ")

router.post('/', async (req, res)=> {
    
    const { pay_id, id_user } = req.body
    let company = await company_account.findAll(
        {
            where:{id: id_user}
        }
    )

    if(company[0].dataValues.premium) return res.status(400).send('You are currently premium')

    try {
        const payment = await stripe.paymentIntents.create({
            amount: 1999,
            currency: "USD",
            description: "Subscription",
            payment_method: pay_id,
            confirm: true, //confirm the payment at the same time
        });
        await company_account.update({premium:true, premiumDate:new Date()}, {where:{id:id_user}})
        res.send('Successfully subscribed, now you are premium!')
    } catch (error) {
        console.log(error);
        res.status(402).send(error.raw.message)
    }
})

module.exports = router;
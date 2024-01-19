const {Customer,validateCustomer} = require('../modules/customer');
const express = require('express');
const router = express.Router();


// get all customer
router.get('/', async(req,res)=>{
    let customers= await Customer.find().sort({name:1});
    res.send(customers);
});

// get customers of particular id
router.get('/:id', async(req,res)=>{
    let customer=await Customer.findById(req.params.id);
    if(!customer){
        res.status(404).send("customer does not exist");
        return;
    }
    res.status(200).send(customer);
});


// add a customer
router.post('/',async(req,res)=>{
    const { error } = validateCustomer(req.body);
    if(error){
        res.status(404).send(result.error.details[0].message);
        return;
    }
    console.log("ok");
    let customer= new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer= await customer.save();
    res.send(customer);
}); 

module.exports = router;
const mongoose= require('mongoose');
const Joi = require('joi');


const customerSchema = mongoose.Schema({
    name: {
        type:String,
        require:true,
        minlength:1 
    },
    isGold:{
        type: Boolean,
        default: false
    },
    phone:{
        type:String,
        require: true,
    }

});

const Customer = mongoose.model('Customer',customerSchema);

function validateCustomer(customer){
    const schema=Joi.object({
        name: Joi.string().min(2).required(),
        phone: Joi.string().min(10).max(10).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer);
};

module.exports.customerSchemachema=customerSchema;
module.exports.Customer=Customer;
module.exports.validateCustomer=validateCustomer;
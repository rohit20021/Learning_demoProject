const mongoose= require('mongoose');
const Joi = require('joi');

const rentalSchema = mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name: {
                type:String,
                require:true,
                minlength:3, 
                maxlength:20 
            },
            phone: {
                type:String,
                require:true,
                minlength:2, 
                maxlength:12 
            },
            isGold:{
                type:Boolean,
                default:false
            }
        }),
        require: true
    },
    movie:{ 
        type: new mongoose.Schema({
            title: {
                type:String,
                require:true,
                minlength:3, 
                maxlength:50 
            },
            dailyRentalRate: {
                type:Number,
                default:0,
                minlength:0, 
                maxlength:50  
            } 
        }),
        required:true
    },
    dateOut:{
        type:Date,
        require:true,
        default: Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type: Number,
        min: 0
    }
});
const Rental = mongoose.model('Rental',rentalSchema);
function validaterental(rental)
{
    const schema=Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });
    return schema.validate(rental);
};

module.exports.Rental=Rental;
module.exports.validaterental=validaterental;
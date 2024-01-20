const {generSchema} = require('./genre');
const mongoose= require('mongoose');
const Joi = require('joi');

const movieschema = mongoose.Schema({
    title: {
        type:String,
        require:true,
        minlength:3, 
        maxlength:50 
    },
    numberInStock: {
        type:Number,
        default:0,
        minlength:0, 
        maxlength:50 
    },
    dailyRentalRate: {
        type:Number,
        default:0,
        minlength:0, 
        maxlength:50  
    },
    genre:{
        type:generSchema,
        ref: 'Genre',
        required:true
    }
});
const Movie = mongoose.model('Movie',movieschema);

function validatemovie(movie)
{
    const schema=Joi.object({
        title: Joi.string().min(3).max(50).required(),
        numberInStock: Joi.number().min(0).max(50),
        dailyRentalRate: Joi.number().min(0),
        genreID: Joi.string().required()
    });
    return schema.validate(movie);
}; 
module.exports.Movie=Movie;
module.exports.validatemovie=validatemovie;
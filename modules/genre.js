const mongoose= require('mongoose');
const Joi = require('joi');


const generschema = mongoose.Schema({
    types: {
        type:String,
        require:true,
        minlength:5, 
        maxlength:50
    }
});
const Genre = mongoose.model('Genre',generschema);


function validategener(genre)
{
    const schema=Joi.object({
        types: Joi.string().min(5).required()
    });
    return schema.validate(genre);
};



module.exports.generschema=generschema;
module.exports.Genre=Genre;
module.exports.validategener=validategener;
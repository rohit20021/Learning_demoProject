const mongoose= require('mongoose');
const Joi = require('joi');

const generSchema = mongoose.Schema({
    types: {
        type:String,
        require:true,
        minlength:5, 
        maxlength:50 
    }
});

const Genre = mongoose.model('Genre',generSchema);

function validategener(genre)
{
    const schema=Joi.object({
        types: Joi.string().min(5).required()
    });
    return schema.validate(genre);
};


module.exports.generSchema=generSchema;
module.exports.Genre=Genre;
module.exports.validategener=validategener;
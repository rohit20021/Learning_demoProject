const {Genre,validategener} = require('../modules/genre');
const express = require('express');
const router = express.Router();


// get all genres
router.get('/', async(req,res)=>{
    let genres= await Genre.find().sort({type:1});
    res.send(genres);
});

// get genre of particular id
router.get('/:id', async(req,res)=>{
    let genre=await Genre.findById(req.params.id);
    if(!genre){
        res.status(404).send("genre does not exist");
        return;
    }
    res.status(200).send(genre);
});


//post genre

router.post('/',async(req,res)=>{
    const {error} = validategener(req.body);
    if(error){
        res.status(404).send(result.error.details[0].message);
        return;
    }
    let genre=new Genre({type:req.body.type});
    genre=await genre.save();
    res.send(genre);
});


module.exports = router;

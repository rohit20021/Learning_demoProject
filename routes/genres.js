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


// add a gener
router.post('/',async(req,res)=>{
    const { error } = validategener(req.body);
    if(error){
        res.status(404).send(result.error.details[0].message);
        return;
    }

    let genre= new Genre({types: req.body.types});
    genre= await genre.save();
    res.send(genre);
});

// update a gener
router.put('/:id', async(req,res)=>{
    const {error} = validategener(req.body);
    if(error){
        res.status(404).send(result.error.details[0].message);
        return;
    }
    let genre= await Genre.findByIdAndUpdate(req.params.id,{types:req.body.types});
    if(!genre){
        res.status(404).send("id does not exists");
        return
    }
    res.status(200).send(genre);
})

// delete a genre
router.delete('/:id', async(req,res)=>{
    let genre= await Genre.findByIdAndDelete(req.params.id);
    if(!genre){
        res.status(404).send("id does not exists");
        return
    }
    res.status(200).send(genre.types);
})

module.exports = router;

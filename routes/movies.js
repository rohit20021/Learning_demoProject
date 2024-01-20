const {Movie,validatemovie} = require('../modules/movie');
const express = require('express');
const { Genre } = require('../modules/genre');
const router = express.Router();

router.get('/',async(req,res)=> {
    const movie =await Movie.find().sort({name:1} )
    res.send(movie);
});
router.get('/:id',async(req,res)=>{
    let title= await Movie.findById(req.params.id);
    if(!title){
        res.status(404).send('this id does not exist');
        return;
    }
    res.send(title);
});
router.post('/',async(req,res)=>{
    const { error } = validatemovie(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const genre = await Genre.findById(req.body.genreID);
    if(!genre){
        res.status(400).send("invilid genre");
        return;
    }
    let movie= new Movie({
        title: req.body.title,
        genre:{
            _id:genre._id,
            types:genre.types
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    movie= await movie.save();
    res.send(movie); 
});
router.put('/:id',async(req,res)=>{
    const { error } = validatemovie(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre = await Genre.findById(req.body.genreID);
    if(!genre){
        res.status(400).send("invilid genre");
        return;
    }
    let movie= await Movie.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        genre:{
            _id:genre._id,
            types:genre.types
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    },{new: true})
    if(!movie){
        res.status(400).send('following id is not valid');
        return; 
    }
    res.send(movie);
});
router.delete('/:id',async(req,res)=>{
    let movie= await Movie.findByIdAndRemove(req.params.id)
    if(!movie){
        res.status(400).send('following id is not valid');
        return;
    }
    res.send(movie);
});
module.exports= router;
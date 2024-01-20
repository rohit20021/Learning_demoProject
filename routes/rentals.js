const {Rental,validaterental} = require('../modules/rental');
const express = require('express');
const mongoose = require('mongoose');
const { Customer } =require('../modules/customer');
const { Movie } =require('../modules/movie');
const router = express.Router();

router.get('/',async(req,res)=> {
    const rental =await Rental.find().sort({dateOut:-1} )
    res.send(rental);
});

router.post('/',async(req,res)=>{
    
    const { error } = validaterental(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const customer = await Customer.findById(req.body.customerId);
    if(!customer){
        res.status(400).send("invilid customer");
        return;
    }
    const movie = await Movie.findById(req.body.movieId);
    if(!movie){
        res.status(400).send("invilid movie");
        return;
    }
    if(movie.numberInStock === 0){
        res.status(400).send("movie is out of stock");
        return;
    }
    let rental= new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone,
            isGold:customer.isGold
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    });
    rental= await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);
});
module.exports= router;
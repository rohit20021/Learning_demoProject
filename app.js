const express= require('express');
const mongoose =require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

mongoose.connect('mongodb://localhost:27017/learning_proj')
.then(()=> console.log('connected to mongodb !!!'))
.catch(err => console.error("could not connect to mongodb",err))

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
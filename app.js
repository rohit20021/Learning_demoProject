const express= require('express');
const mongoose =require('mongoose');

const genres = require('./routes/genres');

mongoose.connect('mongodb://localhost:27017/learning_proj')
.then(()=> console.log('connected to mongodb !!!'))
.catch(err => console.error("could not connect to mongodb",err))
const app = express();


app.use('/api/genres',genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
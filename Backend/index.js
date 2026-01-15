

const cors = require('cors');
const express = require('express');
const port = 8000;
const app =express();


const HP = require('../Backend/Config/hpconfig');
const hproutes = require('./routes/hproutes');

app.use(cors({origin : 'http://localhost:5173',credentials : true}));

app.use(express.json());


HP.authenticate()
.then(()=> console.log('Connection Successfully ... '))
.catch( (err) => console.log('Connection Error',err.message));


app.use('/api',hproutes);

app.listen( port ,()=> {console.log("Connected")});



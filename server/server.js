const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config()
const morgan = require('morgan');
const connectDB = require('./config/db');

//! Automatic directory Read  
const {readdirSync} = require('fs')

const app = express();
connectDB();

// Middleware

app.use(morgan('dev'))
app.use(bodyParser.json({limit: '20mb'}))
app.use(cors())

// Route
// http://localhost:9090/api 
//app.use('/api', require('./routes/api'))

readdirSync('./routes').map((file)=>app.use('/api', require('./routes/'+file)))

const port = process.env.PORT
app.listen(port, () =>{
  console.log('Server Running on port : ' + port)
})
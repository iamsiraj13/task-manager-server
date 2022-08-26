// basic lib import 
const express = require('express');
const app = new express();
const bodyParser = require('body-parser')
const routes = require('./src/routes/api')

// security middleware import

const ratelimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')

// database lib import 
const mongoose = require('mongoose')

// security middleware implement 

app.use(cors())
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(bodyParser.json())

// Mongo DB Database Connection
const URL = 'mongodb://127.0.0.1:27017/task'
const option ={ 
    autoIndex:true
} 

mongoose.connect(URL,option,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Database Connected")
    }
})

// routing implement
app.use('/api',routes);

// undefined route implement
app.use('*',(req, res )=>{
    res.status(404).json({status:"Fail",data:"Not Found"})
})

module.exports = app;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const config = require('config');
const servConfig = config.get('User.appPort')
const db = require('./db')
const router = require('./routs/userRouter')
let initialPath = path.join(__dirname, "public");
const app = express();



app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(initialPath)); 
app.use(router) //use router for better code structure


//port on ./config/config.js
app.listen( process.env.PORT || 5000 , (req,res)=>{
    console.log('port')
})










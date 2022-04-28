const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const knex = require('knex');
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
app.use(router)







// // to home of logged user
// app.get('/logged', (req,res)=>{
//     res.sendFile(path.join(initialPath, "logged.html"))
// })

// //login user
// app.post('/login-user',(req,res) =>{
//     const {login, password} = req.body;
// console.log(req.body)
//     db.select('email','login','password','name','birthdate','country')//for showing user info
//     .from('users')
// 	// user can enter emei or login
//     .where({
//         email:login,
//         password:password
//     })
//     .orWhere({
//         login:login,
//         password:password
//     })
    // .then(data =>{
    //     if(data.length){
    //         res.json(data[0]);
    //     }else{
    //         res.json('email/login or password is incorrect')
    //     }
    // })
// })


app.listen( servConfig || 5000, (req,res)=>{
    console.log('port')
})










// const { Client } = require('pg')
const { Pool } = require('pg');
const config = require('config');
const dbConfig2 = config.get('User.dbConfig2');


const client = new Pool(dbConfig2)

const path = require('path');

let initialPath = path.join(__dirname, "../public");
console.log(initialPath)

class UserController {
    //sending index.html to client
    async getLoginPage(req,res){
        res.sendFile(path.join(initialPath, "index.html"))
    }
    //sending registration.html to client
    async getRegPage(req,res){
        res.sendFile(path.join(initialPath, "registration.html"))
    }
    //sending logged.html to client
    async getLoginPage(req,res){
        res.sendFile(path.join(initialPath, "logged.html"))
    }
    //taking array of countries from our db
    async getCountries(req,res){
        console.log('countries')
        await client.connect() //connecting to client through pg Pool with config from /config
        
        const response = await client.query('SELECT * FROM countries') //getting our array
        .then(response =>
            res.json(response.rows[0]), //array to client 
        )       
    } 
    //sign up new user and autologin after succesfull registration 
    async registration(req,res){
        console.log(req.body)
        const {username, email, password, login, date, country, timestamp} = req.body; //data from form and timestamp
        if(!username.length || !email.length || !password.length || !login.length || !date.length || !country.length){
            res.json('fill all the fields')
        }else{
            const data = {
                name:username,
                email:email,
                password:password,
                login:login,
                country:country,
                birthdate:date, 
                timestamp:timestamp,
            }

            //const with SQL for pg database and data from user
            const text = 'INSERT INTO users(name, email, password, login, country, birthdate, timestamp) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING email, password'
            const values = [data.name, data.email,data.password,data.login,data.country,data.birthdate,data.timestamp]

            client.query(text, values) //sending query
            .then(data => {   //sending returned data to client
                res.json(data.rows)
                console.log(data.rows)
            })
            .catch(err => {  //catch errors if user already exist
                console.log(err)
                if(err.detail.includes('already exists')){
                    res.json('email already exist')
                }
            })
        }

    }
    //user login method
    async login(req,res){
        const {login, password} = req.body; //data from login form
        
        client.connect() //connecting to client through pg Pool with config from /config

        //prepeared query options with SQL and data from form
        const query = {
            name: 'login',
            text : 'SELECT email,login,password,birthdate,country,name FROM users WHERE (email=$1 AND password =$2 ) OR (login =$1 AND password =$2) ',
            values : [login,password]
        }

        client.query(query) //sending query
        .then(data =>       
            {
                if(data.rows[0]){    //if data, res data to client
                    res.json(data.rows[0]);
                
                }
                else{    //if !data, also res to client
                    res.json('email/login or password is incorrect')
                    
                }
            }
        )
        
    }
}

module.exports= new UserController()
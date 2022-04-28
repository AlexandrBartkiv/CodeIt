// const { Client } = require('pg')
const { Pool } = require('pg');
const config = require('config');
const dbConfig2 = config.get('User.dbConfig2');


const client = new Pool(dbConfig2)

const path = require('path');

let initialPath = path.join(__dirname, "../public");
console.log(initialPath)

class UserController {
    
    async getLoginPage(req,res){
        res.sendFile(path.join(initialPath, "index.html"))
    }
    async getRegPage(req,res){
        res.sendFile(path.join(initialPath, "registration.html"))
    }
    async getLoginPage(req,res){
        res.sendFile(path.join(initialPath, "logged.html"))
    }
    async getCountries(req,res){
        console.log('countries')
        await client.connect()
        
        const response = await client.query('SELECT * FROM countries')
        .then(response =>
            res.json(response.rows[0]),
        )       
    } 

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
            const text = 'INSERT INTO users(name, email, password, login, country, birthdate, timestamp) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING email'
            const values = [data.name, data.email,data.password,data.login,data.country,data.birthdate,data.timestamp]

            client.query(text, values)
            .then(res => {
                console.log(res.rows[0])
            })
            .catch(err => {
                console.log(err)
                if(err.detail.includes('already exists')){
                    res.json('email already exist')
                }
            })
        }

    }

    async login(req,res){
        const {login, password} = req.body;
        
        client.connect()
        const query = {
            name: 'login',
            text : 'SELECT email,login,password,birthdate,country,name FROM users WHERE (email=$1 AND password =$2 ) OR (login =$1 AND password =$2) ',
            values : [login,password]
        }

        client.query(query)
        .then(data => 
            {
                if(data.rows[0]){
                    res.json(data.rows[0]);
                
                }
                else{
                    res.json('email/login or password is incorrect')
                    
                }
            }
        )
        
    }
}

module.exports= new UserController()
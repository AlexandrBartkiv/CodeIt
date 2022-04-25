const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'test'
    }
})


const app = express();

let initialPath = path.join(__dirname, "public");


// make esier working with res.
app.use(bodyParser.json());
// point init.path
app.use(express.static(initialPath));
// get login page
app.get('/',(req,res)=>{
    res.sendFile(path.join(initialPath, "index.html"))
})
// get to registration
app.get('/registration', (req,res)=>{
    res.sendFile(path.join(initialPath, "registration.html"))
})
// taking our countries for autocomplete from db 
app.get('/countries', (req,res)=>{
	db('countries').select('countries')
    .then(data =>{
		console.log(data)
		res.send(data)
    })
})
// to home of logged user
app.get('/logged', (req,res)=>{
    res.sendFile(path.join(initialPath, "logged.html"))
})
// regintrating new user
app.post('/register-user', (req,res)=>{
    const {username, email, password, login, date, country, timestamp} = req.body; //data from form and timestamp
    if(!username.length || !email.length || !password.length || !login.length || !date.length || !country.length){
        res.json('fill all the fields')
    }else{
        db('users').insert({ 
            name:username,
            email:email,
            password:password,
            login:login,
            country:country,
            birthdate:date, 
			timestamp:timestamp,
        })
        .returning(['email'])// for checkin is user exist
        .then(data =>{
            res.json(data[0])
            console.log(data) 
        })
        .catch(err =>{
            console.log(err)
            if(err.detail.includes('already exists')){
                res.json('email already exist')
            }
        })
    }
})
//login user
app.post('/login-user',(req,res) =>{
    const {login, password} = req.body;
console.log(req.body)
    db.select('email','login','password','name','birthdate','country')//for showing user info
    .from('users')
	// user can enter emei or login
    .where({
        email:login,
        password:password
    })
    .orWhere({
        login:login,
        password:password
    })
    .then(data =>{
        if(data.length){
            res.json(data[0]);
        }else{
            res.json('email/login or password is incorrect')
        }
    })
})


app.listen( process.env.PORT || 3000, (req,res)=>{
    console.log('port 3000')
})

//building db 
const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    port: 5432,
});

const client2 = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'test',
    port: 5432,
});
const execute = async (query) => {
    try {
        await client2.connect();     // gets connection
        await client2.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client2.end();         // closes connection
    }
};
//querry sql
const text = `
    CREATE TABLE IF NOT EXISTS users (
	    "id" SERIAL NOT NULL PRIMARY KEY,
	    "name" VARCHAR(255) NOT NULL,
	    "email" VARCHAR(255) NOT NULL UNIQUE,
        "login" VARCHAR(255) NOT NULL UNIQUE,
        "birthdate" DATE,
        "country" VARCHAR(255),
        "password" VARCHAR(255) NOT NULL,
        "timestamp" INTEGER
    );
    CREATE TABLE IF NOT EXISTS countries(
        "countries" TEXT[]
    );
    INSERT INTO countries 
VALUES('{
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte dIvoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic Peoples Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao Peoples Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
}')`;
const createDatabase = async () => {
    try {
        await client.connect();                            // gets connection
        await client.query('CREATE DATABASE test'); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();                                // closes connection
    }
};

createDatabase().then((result) => {
    if (result) {
        console.log('Database created');
        execute(text).then(result => {
            if (result) {
                console.log('Table created');
            }
        });
    }
});








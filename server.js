const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        connectionString : 'process.env.DATABASE_URL',
        ssl: true
    }
});


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req,res) =>{
    res.send("Success");
})

app.post('/signin',(req, res) =>{
    signin.handleSignIn (req, res, db, bcrypt)
} )

app.post('/register', (req, res) => {
    register.handleRegister (req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db);
})

app.put('/image', (req, res) => {
    image.handleImage (req, res, db)
})

app.post('/imageurl', (req, res) => {
    image.handleApiCall (req, res)
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})




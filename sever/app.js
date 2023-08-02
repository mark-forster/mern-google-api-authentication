const express= require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors= require('cors');
const authRoute= require('./routes/auth');
const passport = require('passport');
const session= require('express-session');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect(process.env.DBURL, {useUnifiedTopology: true, useNewUrlParser: true})
.then(()=>{
    console.log('Database connection established');
})
//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req,res)=>{
    res.send('Backend Server is running')
})
app.use('/api', authRoute)

app.listen(process.env.PORT, ()=>{
    console.log('listening on port 7000');
})
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk');

const dbConfig = require('./db-config/DatabaseConfig');

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AbKVWmBC4KOBydhUS3v66W-y_QIqMRS-nV_nQEC7yQzc2oImECuAwKZJq-GJQ1GR5ihqzOu9jvLUdLbJ',
    'client_secret': 'EJ6SC8OtrULEetMB9ITyE0W7THU5ssowvdfC1QQWE6jWffteqhUJKf7RBO5TzO_n7S3rm91qm0b2abpk'
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(dbConfig.url, { useNewUrlParser: true }, ()=>{
}).then(()=> console.log("Database Connection Successful...")).catch(()=>console.log("Error while connecting to database.."));

require('./route-config/app.route')(app);

app.listen('3000', ()=>console.log("Server is listening on port 3000..."));

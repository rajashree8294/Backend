const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dbConfig = require('./db-config/DatabaseConfig');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(dbConfig.url, { useNewUrlParser: true }, ()=>{
}).then(()=> console.log("Database Connection Successful...")).catch(()=>console.log("Error while connecting to database.."));

require('./route-config/app.route')(app);

app.listen('3000', ()=>console.log("Server is listening on port 3000..."));

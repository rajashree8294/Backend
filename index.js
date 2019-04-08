const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const dbConfig = require('./db-config/DatabaseConfig');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(dbConfig.url, { useNewUrlParser: true }, ()=>{
}).then(()=> console.log("Database Connection Successful...")).catch(()=>console.log("Error while connecting to database.."));

require('./route-config/app.route')(app);

app.listen('3000', ()=>console.log("Server is listening on port 3000..."));

//Load user model
const SignUp = mongoose.model('SignUp');

module.exports = function(passport){

    passport.use(new LocalStrategy({email:'email'},(email, password, done) =>{
        console.log(email);
        //Match User
        SignUp.findOne({
            email:email
        }).then(SignUp =>{
            if(!SignUp){
                return done(null, false, {message:'No User Found'});
            }
        //Match Password
        bcrypt.compare(password, SignUp.password, (err,isMatch) =>{
            if(err) throw err;
            if(isMatch){
                return done(null, SignUp);
            }else{
                return done(null, false, {message:'Password Incorrect'});
            }
        })
     })

    }));

    passport.serializeUser(function(SignUp, done) {
        done(null, SignUp.id);
      });
      
      passport.deserializeUser(function(id, done) {
        SignUp.findById(id, function(err, SignUp) {
          done(err, SignUp);
        });
      });  

    app.post('/getUser/:email/:password',
      passport.authenticate('local', { failureRedirect: '/error' }),
      function(req, res) {
        res.redirect('localhost:4200');
      }); 
}

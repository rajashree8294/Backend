const SignUp = require('../model/SignUp');
const EmailValidator = require('email-validator');
const PasswordValidator = require('password-validator');
const User = require('../model/SignUp');

exports.createUser = (req,res)=>{
    const schema = new PasswordValidator();
    schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().not().spaces()
    .has().symbols()
    .has().digits()

    if(EmailValidator.validate(req.body.email) && schema.validate(req.body.password)){
        const userObj = new SignUp({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
    
        userObj.save()
        .then(()=>res.status(200).json({"message":"New user record created successfully"}))
        .catch(()=>{
            res.status(400).json({"message":"Bad Request: email and password are required"});
        });
    }else
        res.status(400).json({"message":"Bad Request"});
}

exports.getUser = (req,res)=>{ 
    User.findOne({email: req.params.email}, (err, data) => {
        if(err || !data) res.status(400).json({"message":"Invalid EmailId/Password"});

        else if(data.password !== req.params.password) res.status(401).json({"message":"Invalid Password"});

        else res.status(200).json({"user": data});
    });
}
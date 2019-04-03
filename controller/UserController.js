const SignUp = require('../model/SignUp');
const EmailValidator = require('email-validator');
const PasswordValidator = require('password-validator');

exports.createUser = (req,res)=>{
    const schema = new PasswordValidator();
    schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().not().spaces()
    .has().symbols()
    .has().digits()

    const nameSchema = new PasswordValidator();
    nameSchema
    .has().uppercase()
    .has().lowercase()
    .has().not().digits()
    .has().not().symbols()

    if(!checkForNullFields(req.body)
        && EmailValidator.validate(req.body.email) 
        && schema.validate(req.body.password)){
        const userObj = new SignUp({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
    
        userObj.save()
        .then(()=>res.json({"message":"New user record created successfully"}))
        .catch(()=>{
            res.status(400).json({"message":"Bad Request: email and password are required"});
        });
    }else
        res.status(400).json({"message":"Bad Request"});
}

function checkForNullFields(body){
    console.log(body);
    if(body.firstName === "" || body.lastName === "" || body.email === "" || body.password === "")
        return true;
    return false;
}
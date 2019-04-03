const mongoose = require('mongoose');

const SignUp = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = mongoose.model('SignUp', SignUp);
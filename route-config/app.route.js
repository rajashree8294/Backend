module.exports = (app)=>{
    const ctrl = require('../controller/UserController');

    app.get('/', (req,res)=>res.send("Welcome to the Travel Mania"));
    app.post('/createUser', ctrl.createUser);
    app.get('/getUser/:email/:password', ctrl.getUser);
}
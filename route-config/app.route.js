module.exports = (app)=>{
    const ctrl = require('../controller/UserController');
    const fli = require('../controller/FlightsController');

    app.get('/', (req,res)=>res.send("Welcome to the Travel Mania"));
    app.post('/createUser', ctrl.createUser);
    app.post('/createFlights',fli.createFlights);
    //app.get('/flights/:source/:destination',(req,res)=>res.send(fli.getflights));
    app.get('/flights/:source/:destination',fli.getflights);

}
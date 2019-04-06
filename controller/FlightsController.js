const Flights = require('../model/Flights');

exports.createFlights = (req,res) => {
    const flights = new Flights({
        source : req.body.source,
        destination : req.body.destination,
        time : req.body.time,
        flightname : req.body.flightname
    });

    flights.save().
    then(() => {
        res.send({'message':'Flights saved successfully'});
    });
};


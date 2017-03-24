var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  orderId: String,
  userSeats: String,
  assignId: String
});

var Book = mongoose.model('Book', bookSchema, 'booking');

//Booking
router.get('/getBookingData/:id', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Book.find({}, function (err, docs) {
         res.json(docs);
         
    })
});



// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;

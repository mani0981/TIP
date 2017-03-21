// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var movies = require('./app/movie-crud');
var cities= require('./app/city-crud');
var theatres = require('./app/theatre-crud');
var showtimings = require('./app/showtiming-crud');
var assignmovies = require('./app/assignmovie-crud');
var book = require('./app/booking-crud');
//var assignshowtimes = require('./app/asignshowtiming-crud');


// configuration ===========================================
	
// config files
//var db = require('./config/db');
app.use(bodyParser.json({})); // parse application/json 
app.use('/movie', movies);
app.use('/city', cities);
app.use('/theatre', theatres);
app.use('/showtiming', showtimings);
app.use('/assignmovie', assignmovies);
app.use('/book',book);

//app.use('/assignshowtime', assignshowtimes);


var mongo = require('mongodb');

var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});

var port = process.env.PORT || 3100; // set our port
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
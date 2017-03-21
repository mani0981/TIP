
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
 
  city: String,
  
 });
var City = mongoose.model('City', citySchema, 'city');

//City
router.get('/getCity', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    City.find({}, function (err, docs) {
         res.json(docs);
         
    })
});




router.get('/getCity/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     City.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addCity', function(req, res){
  
 console.log(req.body);
 
  var city = req.body.city;


  var city = new City({
   
  city: city
   
  });


  city.save(function(err, docs){
    if ( err ) throw err;
    console.log("City Saved Successfully");
    res.json(docs);
  });


  })

router.delete('/deleteCity/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      City.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateCity/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    City.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      console.log(data);
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;




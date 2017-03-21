
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

 var mongoose = require('mongoose');

var assignshowtimeSchema = mongoose.Schema({
 
 asntheatre: String,
 asntime: String,

 });

var Assignshowtime = mongoose.model('Assignshowtime', assignshowtimeSchema, 'assignshowtime');


//Assign ShowTiming
router.get('/getShowtime', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Assignshowtime.find({}, function (err, docs) {
         res.json(docs);
         
    })
});




router.get('/getShowtime/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Assignshowtime.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.get('/getByTheatre/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER"+req.params.id);
     Assignshowtime.find({asntheatre: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addShow', function(req, res){
  
 console.log(req.body);
 
   var asntheatre = req.body.asntheatre;
   var asntime = req.body.asntime;


  var assignshowtime = new Assignshowtime({
   
  asntheatre: asntheatre,
  asntime: asntime
   
  });


  assignshowtime.save(function(err, docs){
    if ( err ) throw err;
    console.log("Assign Showtime Saved Successfully");
    res.json(docs);
  });


  })

router.delete('/deleteShowtime/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Assignshowtime.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateShowtime/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Assignshowtime.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
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




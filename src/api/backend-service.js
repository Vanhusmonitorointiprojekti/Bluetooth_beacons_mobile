var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyparser = require('body-parser');
var ip = require("ip")
const database = require('../database/connect_to_db')
const queries = require('../database/queries')

app.use(bodyparser.json());
const cors = require('cors');
app.use(cors());

//Server is listening here
var server = app.listen(4000, function() {
  var host = ip.address()
  var port = server.address().port
  console.log('\nBackend-service is running at http://' + host + ':' + port)
})

//SQL queries//

//GET beacon_info from DB
app.get('/beacon_info', function(req, res) {

  db.query(global.GET_beacon_info, (err, rows, fields) => {
    
    if(!err) {
    console.log(rows, "\n Rows fetched from the database")
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(rows)
    }

    else {
    console.log(err)
    res.send(err)
    }
  })
  
});

//GET receiver_info from DB
app.get('/receiver_info', function(req, res) {

  db.query(global.GET_receiver_info, (err, rows, fields) => {

    if(!err) {
      console.log(rows, "\n Rows fetched from the database")
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(rows)
    }

    else {
      console.log(err)
      res.send(err)
    }
  })
});

//GET Last 50 beacon_detections from DB
app.get('/beacon_detections', function(req, res) {

  db.query(global.GET_last_beacon_detections, (err, rows, fields) => {

    if(!err) {
      console.log(rows, "\n Rows fetched from the database")
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(rows)
    }

    else {
      console.log(err)
      res.send(err)
    }
  })
});

app.get('/delete/:id', function(req, res) {
  let id = req.params.id;

  db.query(global_DELETE_beacon, [id], function (error, result) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(result)
  })
})

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})
const upload = multer({ storage: storage });


app.post('/new_beacon', upload.none(), function(req,res) {
  
  console.log(req.body);
  db.query(global_INSERT_beacon,
  [req.body.user, req.body.id], function(error, result, fields) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(result)
  })
})
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyparser = require('body-parser');
var ip = require("ip")

app.use(bodyparser.json());

//##############This is the database connection part##############

//Connection config
const db = mysql.createConnection({
  host     : '172.28.170.116',
  user     : 'connect',
  password : 'test',
  database : 'bt_beacons',
});

// Connect to database
db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('\nConnection established with the database');
});

//#################################################################

//Server is listening here
var server = app.listen(4000, function() {
  var host = ip.address()
  var port = server.address().port
  console.log('\nBackend-service is running at http://' + host + ':' + port)
})

//SQL queries//

//GET beacon_info from DB
app.get('/beacon_info', function(req, res) {

  db.query('SELECT * FROM beacon_info', (err, rows, fields) => {
    
    if(!err) {
    console.log(rows, "\n Rows fetched from the database")
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

  db.query('SELECT * FROM receiver_info', (err, rows, fields) => {

    if(!err) {
      console.log(rows, "\n Rows fetched from the database")
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

  db.query('SELECT * FROM beacon_detections ORDER BY measument_time DESC limit 50;', (err, rows, fields) => {

    if(!err) {
      console.log(rows, "\n Rows fetched from the database")
      res.send(rows)
    }

    else {
      console.log(err)
      res.send(err)
    }
  })
});

//Functionality to add new wristlet to DB
function AddNewWristlet() {
  var name = "testiKOODISTA"
  var MAC = "MACKOODISTA"

  db.query('INSERT INTO beacon_info (beacon_id, beacon_user) VALUES ' + '(' + "'" + MAC + "', " + "'" + name + "'" + ')'), (err, rows, fields) => {

    if(!err) {
      console.log("Added " + MAC + " With name " + name)
    }

    else {
      console.log(err)
      res.send(rows)
    }
  }
}

//this is only a test add
app.get('/addtest', function(req, res) {
  AddNewWristlet()
})


//Functionality to delete selected wristlet by MAC
function DeleteWristlet() {
  var MAC = "MACKOODISTA"

  db.query('DELETE FROM beacon_info WHERE beacon_id = ' + '"' + MAC + '"'), (err, rows, fields) => {

    if(!err) {
      console.log(MAC + " deleted")
    }

    else {
      console.log(err)
      res.send(rows)
    }
  }
}

app.get('/deletetest', function(req, res) {
  DeleteWristlet()
})
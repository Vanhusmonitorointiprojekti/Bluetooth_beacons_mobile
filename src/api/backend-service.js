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
//  insecureAuth : true  
});

// Connect to database
db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('\nConnection established with the database');
});

//#################################################################

var server = app.listen(4000, function() {
  var host = ip.address()
  var port = server.address().port
  console.log('\nService is running at http://' + host + ':' + port)
})

//SQL queries//

//GET beacon_info
app.get('/beacon_info', function(req, res) {

  db.query('SELECT * FROM beacon_info', (err, rows, fields) =>{
    
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


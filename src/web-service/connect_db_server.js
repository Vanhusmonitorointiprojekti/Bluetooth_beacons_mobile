const express = require('express');
const mysql = require('mysql');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

//Connection config
const db = mysql.createConnection({
  host     : '172.28.170.116',
  user     : 'connect',
  password : 'test',
  database : 'bt_beacons',
//  insecureAuth : true  
});

//App, listen this port
app.listen(3000,()=>console.log('Express server is running at port no : 3000'));

// Connect to database
db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('Connection established with the database, write /beacon_info to URL to GET');
});

//GET data
app.get('/beacon_info', function (req, res) {

  db.query('SELECT * FROM beacon_info', function(err, results, fields){
    if(!err) {

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(results);
    }
      
    
    else {
      console.log(err)
    }
  })
});

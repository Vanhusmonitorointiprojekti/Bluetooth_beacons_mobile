const express = require('express');
const mysql = require('mysql');
var alert = require('alert-node')
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

//Connection config
const db = mysql.createConnection({
  host     : '172.28.170.116',
  user     : 'connect',
  password : 'test',
  database : 'bt_beacons',
});

//App, listen this port
app.listen(3000,()=>console.log('Express server is running at port no : 3000'));

// Connect to database
db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('Connection established with the database, write /detection to URL to GET');
});

//GET data
app.get('/detection',(res,req)=>{
  
    function calcSignal() {
    var signalA = db.query('SELECT * FROM beacon_detections where signal_db > "-50" order by measument_time desc limit 10', (err, rows, fields)=>
    {
        console.log(err)
            console.log('true >', rows)
    })
    
    var signalB = db.query('SELECT * FROM beacon_detections where signal_db < "-50" order by measument_time desc limit 10', (err, rows, fields)=>
   {
        console.log(err)
            console.log('out of range device id:  ' + rows[0].beacon_id, rows)
        //alert('signal over 50dB')
    })

}setInterval(calcSignal,10000);
//todo: if signal is weakening from c area and is increasing in D area then alert.
// Ignore signal dB from allowed areas?
});
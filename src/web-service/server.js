

var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config 
    var config = {
        user: 'root',
        password: 'beacons',
        server: '172.28.170.116', 
        database: 'bt_beacons' 
    };

    
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

       
        var request = new sql.Request();
           
        // query bt_beacons 
        request.query('select * from beacon_detections', function (err, recordset) {
            
            if (err) console.log(err)

            
            res.send(recordset);
            console.log(JSON.stringify(recordset))
                    
        });
    });
});

var server = app.listen(8080, function () {
    console.log('Server is running');
   
});
const express = require('express');
const mysql = require('mysql');
var alert = require('alert-node');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.json());

//Connection config
const db = mysql.createConnection({
  host     : '172.28.170.116',
  user     : 'connect',
  password : 'test',
  database : 'bt_beacons',
});

//App, listen this port
app.listen(4001,()=>console.log('Service is running at port no : 4001'));

// Connect to database
    db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connection established with the database');
    });

    //Write instructions to / -page
    app.get('/', (req, res) => {
        function writeInstructions() {
            res.send(
            'GET all detections -> /detections/all')
        }
        writeInstructions()
    });

    //GET all detections
    app.get('/detections/all',(req,res)=>{
        function calcSignal() {

        db.query(
            '\
            SELECT * \
            FROM beacon_detections where signal_db > "-50" \
            order by measument_time desc limit 10 \
            ',

            (err, rows, fields)=>
        {
            
            console.log(err)
            console.log(rows)
            
        })
        }setInterval(calcSignal,1000);
    });

    //GET ranneke3 avg detections
   app.get('/detections/ranneke1',(req,res)=>{
    function avg_ranneke1() {

        db.query(
            '\
            SELECT( \
                \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver1" \
                AND beacon_id = "e2:e3:23:d1:b0:54" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver1_Ranneke1,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver2" \
                AND beacon_id = "e2:e3:23:d1:b0:54" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver2_Ranneke1,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver3" \
                AND beacon_id = "e2:e3:23:d1:b0:54" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver3_Ranneke1 \
                \
            ',

            (err, rows, fields)=> {

            if(!err) {
                console.log(rows)
            }
        
            else {
              console.log(err)
            }                
        })
        }setInterval(avg_ranneke1, 100);
});

    //GET ranneke4 avg detections
    app.get('/detections/ranneke2',(req,res)=>{
        function avg_ranneke2() {

            db.query(
                '\
                SELECT( \
                    \
                    SELECT signal_db \
                    FROM beacon_detections \
                    WHERE receiver_id = "Receiver1" \
                    AND beacon_id = "d6:2c:ca:c0:d4:9c" \
                    ORDER BY measument_time DESC \
                    LIMIT 1 ) AS AVG_Receiver1_Ranneke2,\
                    \
                    ( \
                    SELECT signal_db \
                    FROM beacon_detections \
                    WHERE receiver_id = "Receiver2" \
                    AND beacon_id = "d6:2c:ca:c0:d4:9c \
                    ORDER BY measument_time DESC \
                    LIMIT 1 ) AS AVG_Receiver2_Ranneke2,\
                    \
                    ( \
                    SELECT signal_db \
                    FROM beacon_detections \
                    WHERE receiver_id = "Receiver3" \
                    AND beacon_id = "d6:2c:ca:c0:d4:9c \
                    ORDER BY measument_time DESC \
                    LIMIT 1 ) AS AVG_Receiver3_Ranneke2 \
                    \
                ',

                (err, rows, fields)=> {

                if(!err) {
                    console.log(rows)
                }
            
                else {
                  console.log(err)
                }                
            })
            }setInterval(avg_ranneke2, 1000);
    });

   //GET ranneke3 avg detections
   app.get('/detections/ranneke3',(req,res)=>{
    function avg_ranneke3() {

        db.query(
            '\
            SELECT( \
                \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver1" \
                AND beacon_id = "f2:36:00:21:c0:50" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver1_Ranneke3,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver2" \
                AND beacon_id = "f2:36:00:21:c0:50" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver2_Ranneke3,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver3" \
                AND beacon_id = "f2:36:00:21:c0:50" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver3_Ranneke3\
                \
            ',

            (err, rows, fields)=> {

            if(!err) {
                console.log(rows)
            }
        
            else {
              console.log(err)
            }                
        })
        }setInterval(avg_ranneke3, 100);
});

    //GET ranneke4 avg detections
    app.get('/detections/ranneke4',(req,res)=>{
        function avg_ranneke4() {

            db.query(
                '\
                SELECT( \
                    \
                    SELECT signal_db \
                    FROM beacon_detections \
                    WHERE receiver_id = "Receiver1" \
                    AND beacon_id = "e2:18:ef:c9:66:f4" \
                    ORDER BY measument_time DESC \
                    LIMIT 1 ) AS AVG_Receiver1_Ranneke4,\
                    \
                    ( \
                    SELECT signal_db \
                    FROM beacon_detections \
                    WHERE receiver_id = "Receiver2" \
                    AND beacon_id = "e2:18:ef:c9:66:f4" \
                    ORDER BY measument_time DESC \
                    LIMIT 1 ) AS AVG_Receiver2_Ranneke4,\
                    \
                    ( \
                    SELECT signal_db \
                    FROM beacon_detections \
                    WHERE receiver_id = "Receiver3" \
                    AND beacon_id = "e2:18:ef:c9:66:f4" \
                    ORDER BY measument_time DESC \
                    LIMIT 1 ) AS AVG_Receiver3_Ranneke4\
                    \
                ',

                (err, rows, fields)=> {

                if(!err) {
                    if (rows[0].AVG_Receiver1_Ranneke4 > rows[0].AVG_Receiver2_Ranneke4 && rows[0].AVG_Receiver1_Ranneke4 > rows[0].AVG_Receiver3_Ranneke4) {
                        console.log("RECEIVER1 VAHVIN")
                    }
                    if (rows[0].AVG_Receiver2_Ranneke4 > rows[0].AVG_Receiver1_Ranneke4 && rows[0].AVG_Receiver2_Ranneke4 > rows[0].AVG_Receiver3_Ranneke4) {
                        console.log("RECEIVER2 VAHVIN")
                    }
                    if (rows[0].AVG_Receiver3_Ranneke4 > rows[0].AVG_Receiver2_Ranneke4 && rows[0].AVG_Receiver3_Ranneke4 > rows[0].AVG_Receiver1_Ranneke4) {
                        console.log("RECEIVER3 VAHVIN")
                    }
                }
            
                else {
                  console.log(err)
                }                
            })
            }setInterval(avg_ranneke4, 1000);
    });
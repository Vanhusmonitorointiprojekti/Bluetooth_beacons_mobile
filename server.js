var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mariadb = require('mariadb/callback');
const { Expo } = require("expo-server-sdk");
const expo = new Expo();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
const savedPushTokens = [];
const saveToken = token => {
    const exists = savedPushTokens.find(t => t === token);
    if (!exists) {
      savedPushTokens.push(token);
    }
  };

const savedData=[];
  const saveData = data => {
      savedData.push(data);
    
  };

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// Yhteyden luominen MariaDB:n
const connection=mariadb.createConnection({
    host: "localhost", port: 3307, 
    user: "root", 
    password: "1234",
    database: "tokendb"
  })
  ;
connection.connect(err => {
  if (err) {
    console.log("Tietokantaan ei saatu yhdistettyä virheen: " + err +" takia");
  } else {
    console.log("Yhdistetty tietokantaan" );
  }
});
connection.getTokens = (callback) => {
  const sql = 'SELECT pushtoken from pushtokens'
  executeQuery(sql, callback)
}

const executeQuery = (sql, callback) => {
  connection.query(sql, function(error, rows) {
      if (error) {
          console.log(error)
          return
      } else {
          callback(rows)
      }
  })
}
//Hakee kaikki tiedot pushtokens tietokannasta
app.get('/list', function (req, res)  {
    connection.query('SELECT * FROM pushtokens', function (error, results, fields) {
     if (error) throw error;
     return res.send({ error: false, data: results, message: 'Kaikki tokenit' });
 });
 });

 app.post('/api/push_notification/push_token', function (req, res) {
    saveToken(req.body.token)
    console.log("Vastaanotettu frontilta token",req.body.token)
    connection.query("INSERT INTO pushtokens (pushtoken) VALUES (?) ", [req.body.token], function (error, results) {
  if (error) throw error;
    return res.send({ error: false, data: results, message: 'New token has been created successfully.' });
    
    });
  });

  app.post('/api/push_notification/message', function (req, res) {
    handlePushTokens(req.body);
    console.log(`Received message, with title: ${req.body.title}`);
    res.send(`Received message, with title: ${req.body.title}`);
  });
  
//Näyttää postin lähettämän push tokenin:
app.get("/api/push_notification/push_token", (req, res) => {
    console.log(savedPushTokens);
    console.log(`Välittyykö token,  ${savedPushTokens}`);
    res.send(`${savedPushTokens}`);
  });

  app.post('/api/push_notification/checked', function (req, res) {
    console.log("Received checked:", req.body.data)
    res.send(`Received message, with title: ${req.body.data}`)
  });

  // Portti
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
const handlePushTokens = ({ title, body }) => {
  // Create the messages that you want to send to clents
  let notifications = [];
  let savedPushTokens
  connection.getTokens((result) => {
    //console.log('result', result)
    savedPushTokens = result
    //console.log('expotokenarray', savedPushTokens)
    let tokens = savedPushTokens.map(t => t.pushtoken)
    console.log('tokens', tokens)
    for (let pushToken of tokens) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
        }

        // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
        notifications.push({
        to: pushToken,
        sound: "default",
        title: title,
        body: body,
        data: { body }
        });
    }

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(notifications);

    (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
        try {
            let receipts = await expo.sendPushNotificationsAsync(chunk);
            console.log('receipts', receipts);
        } catch (error) {
            console.error(error);
        }
        }
    })();
  })
};
module.exports = app;

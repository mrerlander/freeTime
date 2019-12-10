require('dotenv').config();

const express = require('express');
const mongodb = require('mongodb');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

const MongoClient = mongodb.MongoClient;
const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/freetime';
console.log(databaseUrl);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    next();
});

app.get('/userData', function (req, res) {
    console.log(req);
    const userName = req.query.user;
    console.log(userName);
    MongoClient.connect(databaseUrl, function (err, client) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established');

            const db = client.db('freetime');

            db.collection('users').findOne({'userName': userName}, function (findErr, result){
                if (findErr) throw findErr;
                console.log(result);
                res.json(result);
                client.close();
            });
        }
    });
});

app .listen(PORT, function () {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});


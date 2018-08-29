var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var cookieParser = require('cookie-parser');

const cors = require('cors');
var path = require('path');


var config = require('./config');

mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log('Connected to database...');
    initApp();
});

function initApp() {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    //app.use(logger('dev'));
    
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
   
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public','views')));
    app.use(express.static('public'));
    app.use(cors());

    // app.use('/', require('./routes/home'));
    app.use('/time', require('./routes/timeSchedule.js'));

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
        next();
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        console.log(err)
        return res.status(err.status || 500).json({ success: false, msg: err });
    });
}

module.exports = app;
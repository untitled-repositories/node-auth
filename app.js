var express = require('express');
var bodyParser = require('body-parser');
var log = require('./logger');
var nodemailer = require('nodemailer');
var config = require('./config/config');
var passport = require('passport');

var mongoose = require('mongoose');
mongoose.connect(config.db);

var passportConfig = require('./auth/passport-config');
passportConfig();

var app = express();

app.use(log.middleWare());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

//routes
var user = require('./routes/user');
app.use('/api/user', user);
var auth = require('./routes/auth');
app.use('/api/', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    log.error(err.message);
    //err = {};
    res.status(err.status || 500).
    json({
        status: err.status || 500,
        message: err.message || 'Unknown errror',
        //error: err
    });
});

// https://strongloop.com/strongblog/robust-node-applications-error-handling/
if (config.errorMails) {
    process.on('uncaughtException', function (err) {
        log.error(err.stack);

        var transport = nodemailer.createTransport();

        transport.sendMail({
            from: config.email,
            to: config.developer_email,
            subject: '[App error][uncaughtException] '+err.message,
            text: err.stack
        }, function (err) {
            if (err) console.error(err);
            log.warning('Email sent to developer about error');
            process.exit(1);
        });

    });
}

module.exports = app;

var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var mongoService = require('../services/mongo-service');
var User = require('../models/user').User;

var config = require('../config/config');
var log = require('../logger');

var async = require('async');
var jwtSecret = config.secret;

/* template
async.waterfall([

], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
});
*/

router.get('/auth/google', passport.authenticate('google',{
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ]
}));

router.get('/google/oauth2callback', passport.authenticate('google', { failureRedirect: '/#' }),
function(req, res, next) {

    log.info('got '+req.user.emails[0].value+' data successfully');

    var auth = {
        google_id: req.user.id,
        first_name: req.user.name.givenName,
        last_name: req.user.name.familyName,
        gender: req.user.gender,
        email: req.user.emails[0].value,
        image: req.user._json.image.url.replace("?sz=50",""),
        access_token: req.user.accessToken,
        refresh_token: req.user.refreshToken,
        language: req.user._json.language,
    };

    async.waterfall([

        function(next){
            var q = {};
            q.args = {"email": auth.email};
            mongoService.findOne(q, User, function(err, user) {
                if (err) { return next(err); }
                if(!user){ return next(null, null); }

                log.info('login existing user ' + user.id);

                var token = jwt.sign({
                    id: user.id
                }, jwtSecret);

                next(null, {token: token});

            });
        },

        function(token, next){
            if(token){ return next(null, token);}

            log.info('saved new user with email ' + auth.email);

            mongoService.saveNew(auth, User, function(err, user) {
                if (err) { return next({error: err}); }

                var token = jwt.sign({
                    id: user.id
                }, jwtSecret);

                return next(null, {token: token});

            });
        }

    ], function (err, result) {
        if(err){ res.json(err); }
        //res.json(result);
        res.redirect('http://node-auth.romil.local/#/?token='+result.token);
    });
});

module.exports = router;

var express = require('express');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var router = express.Router();
var passport = require('passport');

var mongoService = require('../services/mongo-service');
var User = require('../models/user').User;

var config = require('../config/config');
var async = require('async');

var jwtSecret = config.secret;
var validateJwt = expressJwt({secret: jwtSecret});

/* template
async.waterfall([], function (err, result) {
if(err){ res.json(err); }
res.json(result);
});
*/

router.get('/me', validateJwt, function(req, res){
    //iat – This is the time that the token was created, as a unix timestamp offset in seconds.
    //validate if token valid validateJwt returns req.user as object set to token

    if(!req.user){
        return res.status(401).send({error: 'Unauthorized'});
    }else{

        //token creation time diff, to check if token expired
        var timeDiffInSeconds = (new Date().getTime()/1000).toFixed() - req.user.iat;

        mongoService.findById(req.user.id, User, function(err, user) {
            if (err) { return res.json({error: err}); }
            if(typeof user !== 'undefined' && user !== null){

                var response = {
                    user: user
                };

                // create new token if last one expired (7 days)
                // also possible use {expiresIn: 7d}, but then need to handle err
                if(timeDiffInSeconds > config.tokenExpiration){
                    console.log('token updated');
                    response.token = jwt.sign({
                        id: user.id
                    }, jwtSecret);
                }
                // delete unneccesery info
                response.user.google_id = undefined;

                return res.json(response);
            }
            return res.status(401).send({error: 'Unauthorized'});

        });

    }
});

module.exports = router;

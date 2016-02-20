module.exports = function() {

    var passport = require('passport');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var config = require('../config/config');

    // jwt
    var jwt = require('jsonwebtoken');
    var jwtSecret = config.secret;

    passport.use(new GoogleStrategy({
        callbackURL: config.googleAuth.callbackURL,
        realm: config.realm,
        clientSecret: config.googleAuth.clientSecret,
        clientID: config.googleAuth.clientID
    }, function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        return done(null, profile);
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, next) {
        next(null, user);
    });

};

// export function for listening to the socket
var log = require('../logger');
var mongoService = require('../services/mongo-service');
var Word = require('../models/word').Word;
var async = require('async');

module.exports = function (socket) {

    var clients = require('../services/clients.js');

    log.info(socket.decoded_token.id + ' socket: ' + socket.id);

    //socketioJwt, id from token > socket.decoded_token.id
    clients.addClient(socket.decoded_token.id, socket.id);

    socket.on('giveNewWord', function(){

        var LENGTH = 5;

        //https://alan-mushi.github.io/2015/01/18/mongodb-get-random-document-benchmark.html
        //db.col.find().limit(-1).skip(Math.random() * db.col.count());

        async.waterfall([
            function(next){
                mongoService.count({length: LENGTH}, Word, function(err, count){
                    if (err) { return next(err); }
                    next(null, count);
                });
            },
            function(count, next){
                q = {
                    args: {length: LENGTH},
                    limit: 1,
                    skip: Math.round(count * Math.random())
                };
                mongoService.find(q, Word, function(err, word){
                    if (err) { return next(err); }
                    next(null, word[0]);
                });
            }
        ], function (err, word) {
            if(err){
                socket.emit('giveNewWordFail', {error: err});
            }
            socket.emit('giveNewWordSuccess', word.word);
        });

    });

    socket.on('disconnect', function () {
        log.info(socket.decoded_token.id +' socket left: '+ socket.id);
        clients.findAndRemoveClient(socket.id);
    });

};

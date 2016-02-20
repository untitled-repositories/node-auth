// export function for listening to the socket
var log = require('../logger');

module.exports = function (socket) {

    var clients = require('../services/clients.js');

    log.info(socket.decoded_token.id + ' socket: ' + socket.id);

    //socketioJwt, id from token > socket.decoded_token.id
    clients.addClient(socket.decoded_token.id, socket.id);

    socket.on('chat message to server', function(msg){
        //console.log(msg);
        socket.emit('chat message', msg);
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        log.info(socket.decoded_token.id +' socket left: '+ socket.id);
        clients.findAndRemoveClient(socket.id);
    });

};

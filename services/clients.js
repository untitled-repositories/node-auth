// Stores connected user id and his socket clients
var clients_array = [];

exports.addClient = function(user_id, socket_id){
    //check if user exists in array, then add just socket_id
    var user_index = -1;
    for(var i = 0, len = clients_array.length; i < len; i++){
        if(clients_array[i].user_id === user_id){
            user_index = i;
            break;
        }
    }
    //console.log(user_index);
    if(user_index > -1){
        clients_array[user_index].sockets.push(socket_id);
    }else{
        clients_array.push({
            user_id: user_id,
            sockets: [socket_id]
        });
    }
    //console.log(clients_array);
};

exports.findAndRemoveClient = function(socket_id){
    //if the last socket, remove client, otherwise remove only socket
    for(var i = 0, len = clients_array.length; i < len; i++){

        var sockets_len = clients_array[i].sockets.length;

        //last socket
        if(sockets_len === 1){
            if(clients_array[i].sockets[0].socket_id === socket_id){
                clients_array.splice(i, 1);
                break;
            }
        }

        var deleted = false;

        for(var j = 0; j < sockets_len; j++){
            if(clients_array[i].sockets[j] === socket_id){
                clients_array[i].sockets.splice(j, 1);
                deleted = true;
                break;
            }
        }

        if(deleted){
            break;
        }
    }
    //console.log(clients_array);
    return;
};

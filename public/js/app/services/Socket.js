(function() {
    'use strict';

    angular
    .module('app')
    .factory('Socket', ['$rootScope', 'AuthToken', function($rootScope, AuthToken) {
        //console.log(AuthToken.getToken());
        var socket = io.connect('http://node-auth.romil.local:3001', {
            'query': 'token=' + AuthToken.getToken()
        });

        return {

            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },

            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            },
            getSocket: function() {
                return socket;
            }

        };

    }]);

}());

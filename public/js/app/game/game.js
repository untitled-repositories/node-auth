(function() {
    'use strict';

    angular
    .module('app')
    .controller('GameController', ['$scope','$rootScope','$location', 'Socket', function($scope,$rootScope,$location, Socket) {

        /*console.log('loaded chat page');

        $scope.messages = ['hello'];

        $scope.Send = function(){
            console.log($scope.msg);
            Socket.emit('chat message to server', $scope.msg);
            $scope.msg = undefined;
            return false;
        };
        Socket.on('chat message', function(msg){
            $scope.messages.push(msg);
            console.log(msg);
        });*/

        //NB! important - remove listener when navigating away from this view
        $scope.$on('$destroy', function (event) {
            Socket.getSocket().removeAllListeners();
        });

    }]);
}());

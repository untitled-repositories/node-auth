(function() {
    'use strict';

    angular
    .module('app')
    .controller('GameController', ['$scope','$rootScope','$location', 'Socket', function($scope,$rootScope,$location, Socket) {

        console.log('loaded game page');

        Socket.emit('giveNewWord', function(){
            console.log('request sent');
        });

        Socket.on('giveNewWordSuccess', function(word){
            console.log('successfully retrieved word');
            console.log(word);
        });

        Socket.on('giveNewWordFail', function(err){
            console.log(err);
        });

        // making possible to launch direcetive fn
        /*$scope.setSomeFunction = function(directiveFn) {
            $scope.SomeFunction = directiveFn.theDirFn;
        };*/

        //NB! important - remove listener when navigating away from this view
        $scope.$on('$destroy', function (event) {
            Socket.getSocket().removeAllListeners();
        });

    }]);
}());

(function() {
    'use strict';

    angular
    .module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope','$rootScope','$location', 'AuthToken'];

    function MainController($scope,$rootScope,$location,AuthToken) {

        console.log('Main');

        $scope.logout = function() {
            AuthToken.clearToken();
            $rootScope.user = null;
            $location.path('/');
            console.log('logout');
        };

    } // MainController end
}());

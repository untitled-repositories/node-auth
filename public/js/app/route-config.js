(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$routeProvider','$locationProvider','$resourceProvider'];

  function config($routeProvider,$locationProvider,$resourceProvider) {

    $routeProvider
    .when('/', {
      templateUrl: '/js/app/home/home.html',
      controller: 'HomeController',
      resolve: {
        data: ['RouteInterceptor', function(RouteInterceptor) {
          return RouteInterceptor.checkAuth();
        }]
      }
    })
    .when('/game', {
      templateUrl: '/js/app/game/game.html',
      controller: 'GameController',
      resolve: {
        data: ['RouteInterceptor', function(RouteInterceptor) {
          return RouteInterceptor.checkAuth({ error_location: '/'});
        }]
      }
    });

  }
}());

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
    .when('/chat', {
      templateUrl: '/js/app/chat/chat.html',
      controller: 'ChatController',
      resolve: {
        data: ['RouteInterceptor', function(RouteInterceptor) {
          return RouteInterceptor.checkAuth({ error_location: '/'});
        }]
      }
    });

  }
}());

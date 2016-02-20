(function() {
    'use strict';

    angular
    .module('app')
    .factory('AuthInterceptor', ['$rootScope', '$q', 'AuthToken', function($rootScope, $q, AuthToken) {
        return {
            request: function (config) {
                // add token to every http request
                var token = AuthToken.getToken();
                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    console.warn('user not authenticated', response);
                    // handle the case where the user is not authenticated
                    // possilbe while serving frontend with express
                }
                return response || $q.when(response);
            }
        };
    }]);

}());

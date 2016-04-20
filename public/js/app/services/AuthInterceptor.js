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
            responseError: function (response) {
                console.log(response);
                if (response.status === 403) {

                    console.warn('user not authenticated', response);
                    

                }
                // do something on error
                return $q.reject(response);
            }
        };
    }]);

}());

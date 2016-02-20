(function() {
    'use strict';

    angular
    .module('app')
    .factory('RouteInterceptor', ['$q', '$rootScope', '$location', 'RequestService', 'AuthToken', function($q, $rootScope, $location, RequestService, AuthToken) {
        return {
            checkAuth: checkAuth
        };

        function checkAuth(option) {

            var deferred = $q.defer();
            var hasToken = false;

            // if there is no saved token, restrict access if neccesery
            if(!AuthToken.isAuthenticated()){
                //check if there is token to save from URL
                if(AuthToken.getTokenFromUrl()){
                    //console.log('token created from url');
                    hasToken = true;
                }else{
                    //console.warn('No authorization without token!');
                    if(option && option.error_location){
                        //console.log('redirected to '+ option.error_location);
                        $location.path(option.error_location);
                    }else{
                        deferred.resolve();
                    }

                }
            } else {
                hasToken = true;
            }

            // validate token
            if(hasToken){

                //console.log('validate token');
                RequestService.get('/user/me')
                .then(function(data){

                    // if token updated
                    if(data.token){
                        console.log('token updated');
                        AuthToken.setToken(data.token);
                    }

                    if(!$rootScope.user){
                        //console.log('rootscope null, saved to rootscope');
                        $rootScope.user = data.user;
                    }

                    // check if user has changed
                    if($rootScope.user._id != data.user._id){
                        //console.warn('user changed');
                        // rewrite with new user data.user
                        $rootScope.user = data.user;
                    }

                    if(option && option.success_location){
                        //console.log('redirected to '+ option.success_location);
                        $location.path(option.success_location);
                    }else{
                        deferred.resolve();
                    }

                }).catch(function(fallback){

                    // token not validated
                    $rootScope.user = undefined;

                    if(option && option.error_location){
                        console.log('redirected to '+ option.error_location);
                        $location.path(option.error_location);
                    }else{
                        deferred.resolve();
                    }

                });

            }

            return deferred.promise;

        }

    }]);

}());

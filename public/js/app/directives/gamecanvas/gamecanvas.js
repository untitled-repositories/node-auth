(function() {
    'use strict';

    angular
    .module('app')
    .directive('gamecanvas', gamecanvas);

    gamecanvas.$inject = ['$routeParams','$timeout','$window','$filter'];

    function gamecanvas ($routeParams,$timeout,$window,$filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/app/directives/gamecanvas/gamecanvas.html',
            link: function($scope, element, attrs) {

                //http://searchvoidstar.tumblr.com/post/86542847038/high-dpi-rendering-on-html5-canvas-some-problems

                //$scope.setSomeFunction({theDirFn: HereGoesFunctionName});

                /*var Typer = function(){
                    alert('game');
                };*/

                //var game = new Typer();

                angular.element($window).ready(function() {
                    console.log('init');
                });

                angular.element($window).bind('resize', function () {
                    console.log('resize');
                });

            }
        };

    }

}());

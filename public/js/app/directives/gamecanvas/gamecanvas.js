(function() {
    'use strict';

    angular
    .module('app')
    .directive('gamecanvas', ['$routeParams','$timeout','$window','$filter', function($routeParams,$timeout,$window,$filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/app/directives/gamecanvas/gamecanvas.html',
            link: function($scope, element, attrs) {

                //http://searchvoidstar.tumblr.com/post/86542847038/high-dpi-rendering-on-html5-canvas-some-problems

                //$scope.setSomeFunction({theDirFn: HereGoesFunctionName});

                var Typer = function(){

                    //singleton
                    if (Typer.instance_) {
                        return Typer.instance_;
                    }
                    Typer.instance_ = this;

                    this.config = Typer.config;
                    this.Word = Word;
                    this.canvas = document.querySelector(this.config.canvasId);
                    this.ctx = this.canvas.getContext('2d');
                    this.ratio = null;

                    this.currentWord = null;

                    this.init();

                };

                Typer.config = {
                    canvasId: '#game-canvas',
                    menuBarHeight: 50
                };

                Typer.prototype = {
                    init: function(){
                        console.log('game started');
                        this.resize();
                        this.bindResize();

                        this.currentWord = new this.Word('loading...', this);
                        this.startGame();

                        window.requestAnimationFrame(this.animate.bind(this));
                    },
                    startGame: function(){
                        this.disableBackspace();
                        window.addEventListener('keypress', this.keyPressed.bind(this));
                    },
                    bindResize: function(){
                        window.addEventListener("resize", this.resize.bind(this));
                    },
                    disableBackspace: function(){
                        window.addEventListener("keydown", function(e){
                            if(e.which == 8){ e.preventDefault(); }
                        });
                    },
                    keyPressed: function(e){
                        //space
                        //if(e.which == 32){}

                        var letter = String.fromCharCode(e.which);
                        if(this.currentWord){
                            this.currentWord.guess(letter);
                        }

                    },
                    resize: function(){

                        //do the defaults
                        this.canvas.width = window.innerWidth;
            			this.canvas.height = window.innerHeight-this.config.menuBarHeight;
            		    this.canvas.style.width = window.innerWidth + 'px';
            		    this.canvas.style.height = window.innerHeight-this.config.menuBarHeight + 'px';

                        //for retina
                        var devicePixelRatio = window.devicePixelRatio || 1;
                        var backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                            this.ctx.mozBackingStorePixelRatio ||
                            this.ctx.msBackingStorePixelRatio ||
                            this.ctx.oBackingStorePixelRatio ||
                            this.ctx.backingStorePixelRatio || 1;
                        this.ratio = devicePixelRatio / backingStoreRatio;

                        if (devicePixelRatio !== backingStoreRatio) {

                            var oldWidth = this.canvas.width;
                            var oldHeight = this.canvas.height;
                            this.canvas.width = Math.round(oldWidth * this.ratio);
                            this.canvas.height = Math.round(oldHeight * this.ratio);
                            //console.log(this.canvas.height);
                            this.canvas.style.width = oldWidth + 'px';
                            this.canvas.style.height = oldHeight + 'px';
                            // now scale the context to counter
                            // the fact that we've manually scaled
                            // our canvas element
                            //this.ctx.scale(this.ratio, this.ratio);
                        }

                    },
                    draw: function(){

                    },
                    animate: function(){
                        //clear canvas
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                        if(this.currentWord){
                            this.currentWord.drawToCanvas();
                        }
                        //console.log('animating');
                        window.requestAnimationFrame(this.animate.bind(this));
                    },
                    saveToDb: function(){
                        //save

                        // add new word for guessing
                        this.currentWord = new this.Word('v2 loading...', this);

                    }
                };

                var Word = function(word, parent){
                    this.word = this.word_left = word;
                    this.parent = parent;

                };

                Word.prototype = {

                    guess: function(letter){
                        if(this.word_left.charAt(0) === letter){

                            this.word_left = this.word_left.slice(1);

                            if(this.word_left.length === 0){
                                //get new word?
                                this.parent.saveToDb();
                            }
                        }

                    },
                    drawToCanvas: function(){
                        //ctx=canvas.getContext("2d");
                        //console.log(this.parent);
        				this.parent.ctx.fillStyle = 'black';
        				this.parent.ctx.textBaseline = 'middle';
        				this.parent.ctx.textAlign = 'right';
                        //upto 40 letters can fit, should use some algorith to fit word
                        this.parent.ctx.font= Math.round(this.parent.canvas.width/25) + 'px Courier';
                        //console.log(this.parent.ctx.measureText(this.word).width);
                        this.parent.ctx.fillText(this.word_left, Math.round(this.parent.canvas.width/2 + this.parent.ctx.measureText(this.word).width/2), Math.round(this.parent.canvas.height/2));
                    }
                };


                angular.element($window).ready(function() {
                    var game = new Typer();
                });

            }
        };

    }]);

}());

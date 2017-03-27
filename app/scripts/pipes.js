window.Pipes = (function () {
	'use strict';

	var SPEED = 20;
	var INITIAL_POSITION_X = Game.prototype.WORLD_WIDTH;
    var wentThrough = false;


	var Pipes = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: INITIAL_POSITION_X, y: 0 /*this.getRand()*/ };
        this.score = 0;
        this.player = game.player;
        
	};

	Pipes.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = 0/*this.getRand()*/;
        this.score = 0;
        wentThrough = false;
	};

	Pipes.prototype.onFrame = function (delta) {
		this.pos.x -= delta * SPEED;
		if (this.pos.x <= -13) {
			this.pos.x = INITIAL_POSITION_X;
            this.pos.y = 0/*this.getRand()*/;
            wentThrough = false;
		}
        this.addScore();
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

    Pipes.prototype.addScore = function (){

        if(this.player.pos.x > (this.pos.x) && wentThrough == false){
            this.score++;
            wentThrough = true;
        }
    };

    Pipes.prototype.getRand = function () {
        return Math.floor(Math.random()*(33-0+1)+0);
    };

	return Pipes;

})();

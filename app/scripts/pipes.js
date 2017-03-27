window.Pipes = (function () {
	'use strict';

	var SPEED = 10;
	var INITIAL_POSITION_X = Game.prototype.WORLD_WIDTH;
    var wentThrough = false;


	var Pipes = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: INITIAL_POSITION_X, y: this.getRand() };
        this.score = 0;
        this.player = game.player;
	};

	Pipes.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = this.getRand();
        this.score = 0;
        wentThrough = false;
	};

	Pipes.prototype.onFrame = function (delta) {
        if(this.game.pipe1 != undefined){
            this.game.pipe2.pos.y = this.game.pipe1.pos.y;
        }
		this.pos.x -= delta * SPEED;
		if (this.pos.x <= -13) {
			this.pos.x = INITIAL_POSITION_X;
            this.pos.y = this.getRand();
            wentThrough = false;
		}
        this.addScore();
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};
//min = 20
//max = -20
    Pipes.prototype.addScore = function (){

        if(this.player.pos.x > (this.pos.x) && wentThrough == false){
            this.score++;
            wentThrough = true;
        }
    };

    Pipes.prototype.getRand = function () {
        return Math.floor(Math.random()* (20 + 20) - 20);
    };

	return Pipes;

})();

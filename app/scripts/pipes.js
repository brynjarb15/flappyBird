window.Pipes = (function () {
	'use strict';

	var SPEED = 16;
	var INITIAL_POSITION_X = Game.prototype.WORLD_WIDTH;
	var INITIAL_POSITION_Y = 32;
    
    var wentThrough = false;


	var Pipes = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y };
        this.score = 0;
        this.player = game.player;
	};

	Pipes.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
        this.score = 0;
        wentThrough = false;
	};

	Pipes.prototype.onFrame = function (delta) {
		this.pos.x -= delta * SPEED;
		if (this.pos.x <= -13) {
			this.pos.x = INITIAL_POSITION_X;
            wentThrough = false;
		}
        this.addScore();
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

    Pipes.prototype.addScore = function (){
        //console.log("player: ",this.player.pos.x);
        //console.log("pipe: ",this.pos.x);
        if(this.player.pos.x > (this.pos.x) && wentThrough == false){
            this.score++;
            wentThrough = true;
            console.log("SCOOOOOOOOOOOOORE-------------------------------------------------------------",this.score);
        }
    };

	return Pipes;

})();

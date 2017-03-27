window.Pipes = (function () {
	'use strict';

	var SPEED = 6;
	var INITIAL_POSITION_X = Game.prototype.WORLD_WIDTH;
	var INITIAL_POSITION_Y = 32;
    var wentThrough = false;
    var score = 0;
    //var playerPosX = 

	var Pipes = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y };
	};

	Pipes.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Pipes.prototype.onFrame = function (delta) {
		this.pos.x -= delta * SPEED;
		if (this.pos.x <= -13) {
			this.pos.x = INITIAL_POSITION_X;
		}
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};
	return Pipes;

})();

window.Pipes = (function () {
	'use strict';

	var SPEED = 10;
	var INITIAL_POSITION_X = Game.prototype.WORLD_WIDTH;
	var wentThrough = false;


	var Pipes = function (el, game, pipesNumber, distanceFromStart) {
		this.el = el;
		this.game = game;
		this.pos = { x: INITIAL_POSITION_X, y: this.getRand() };
		this.score = 0;
		this.player = game.player;
		this.size = { WIDTH: 11 };
		this.pipesNumber = pipesNumber;
	};

	Pipes.prototype.reset = function (distanceFromStart) {
		console.log('inside reset');
		this.pos.x = INITIAL_POSITION_X + distanceFromStart;
		this.pos.y = this.getRand();
		this.score = 0;
		wentThrough = false;
	};

	Pipes.prototype.resetX = function () {
		console.log('inside reset');
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = this.getRand();
		this.score = 0;
		wentThrough = false;
	};

	Pipes.prototype.onFrame = function (delta) {
		this.game.pipes[this.pipesNumber].upper.pos.y = this.game.pipes[this.pipesNumber].lower.pos.y;
		this.pos.x -= delta * SPEED;
		if (this.pos.x <= -13) {
			/*this.pos.x = INITIAL_POSITION_X;
			this.pos.y = this.getRand();
			wentThrough = false;*/
			this.resetX();
		}
		this.addScore();
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};
	//min = 20
	//max = -20
	Pipes.prototype.addScore = function () {

		if (this.player.pos.x > (this.pos.x) && wentThrough == false) {
			this.score++;
			wentThrough = true;
		}
	};

	Pipes.prototype.getRand = function () {
		return Math.floor(Math.random() * (20 + 20) - 20);
	};

	return Pipes;

})();

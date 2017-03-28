window.Pipes = (function () {
	'use strict';

	var SPEED = Game.prototype.SPEED_OF_GROUND_AND_PIPES;
	var INITIAL_POSITION_X = Game.prototype.WORLD_WIDTH;
	var wentThrough = false;
	var score = 0;
	var bestScore = 0;


	var Pipes = function (el, game, pipesNumber, distanceFromStart) {
		this.el = el;
		this.game = game;
		this.pos = { x: INITIAL_POSITION_X, y: this.getRand() };
		this.player = game.player;
		this.size = { WIDTH: 11 };
		this.pipesNumber = pipesNumber;
	};

	Pipes.prototype.reset = function (distanceFromStart) {
		this.pos.x = INITIAL_POSITION_X + distanceFromStart;
		this.pos.y = this.getRand();
		score = 0;
		wentThrough = false;
	};

	Pipes.prototype.resetX = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = this.getRand();
		wentThrough = false;
	};

	Pipes.prototype.onFrame = function (delta) {
		this.game.pipes[this.pipesNumber].upper.pos.y = this.game.pipes[this.pipesNumber].lower.pos.y;
		this.pos.x -= delta * SPEED;
		if (this.pos.x <= -13) {
			this.resetX();
		}
		this.addScore();
		document.getElementById('currentScore').innerHTML = score;
		document.getElementById('score').innerHTML = score;
		document.getElementById('bestScore').innerHTML = bestScore;
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipes.prototype.addScore = function () {

		if (this.player.pos.x > this.game.pipes[this.pipesNumber].lower.pos.x && wentThrough == false) {
			score++;
			if(score > bestScore) {
				bestScore = score;
			}
			this.game.setNextPipe();
			wentThrough = true;
		}
	};
	
	Pipes.prototype.returnScore = function () {
		return score;
	}

	Pipes.prototype.getRand = function () {
		return Math.floor(Math.random() * 20);
	};

	return Pipes;

})();

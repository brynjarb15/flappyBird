window.Ground = (function () {
	'use strict';

	//var SPEED = this.game.prototype.SPEED_OF_GROUND_AND_PIPES;
	var INITIAL_POSITION_X = 0;

	var Ground = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 39 };
		this.SPEED = this.game.SPEED_OF_GROUND_AND_PIPES;
	};

	Ground.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = 39;
	};

	Ground.prototype.onFrame = function (delta) {
		this.pos.x -= delta * this.SPEED;
		if (this.pos.x <= -13) {
			this.pos.x = 0;
		}
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};
	return Ground;

})();

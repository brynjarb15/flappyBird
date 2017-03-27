window.Ground = (function () {
	'use strict';

	var SPEED = 6;
	var INITIAL_POSITION_X = 0;
	var INITIAL_POSITION_Y = 0;

	var Ground = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 32.5 };
		//INITIAL_POSITION_Y = this.game.WORLD_HEIGHT - 7;
	};

	Ground.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = 32.5;
	};

	Ground.prototype.onFrame = function (delta) {
		this.pos.x -= delta * SPEED;
		if (this.pos.x <= -13) {
			this.pos.x = 0;
		}
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};
	return Ground;

})();

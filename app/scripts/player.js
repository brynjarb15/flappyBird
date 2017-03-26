window.Player = (function () {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 7;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;







	var Player = function (el, game) {
		this.el = el;
		this.child = this.el.find('.pikachu');
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.rotationDegree = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function (delta) {

		if (Controls.didJump()) {
			this.pos.y -= delta * SPEED*5;
			this.rotationDegree = -25;
		}
		else if(this.rotationDegree < 90) {
			this.rotationDegree += 1;
		}
		
		this.pos.y += delta * SPEED*0.2; // ef þessi lína er með þá ferðu rólega niður
		/*if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}*/

		this.checkCollisionWithBounds();

		// Update UI
		this.child.css('transform', 'rotate(' + this.rotationDegree + 'deg)');
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function () {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();

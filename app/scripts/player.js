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
		this.multiplycationOfFalling = 1;
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
			this.pos.y -= delta * SPEED * 8;
			this.rotationDegree = -25; // make player look up
			this.multiplycationOfFalling = 1; // restart factor of falling

			var snd = new Audio("../sounds/flappyBirdSounds/jump.wav"); // make jump sound
			snd.play();
		}
		else if (this.rotationDegree < 90) {
			this.rotationDegree += 2; // rotate toward the groun
			this.multiplycationOfFalling += 0.1;
		} else {
			this.multiplycationOfFalling += 0.3;
		}

		this.pos.y += delta * SPEED * 0.2 * this.multiplycationOfFalling; // ef þessi lína er með þá ferðu rólega niður
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
		this.child.css('transform', 'translateZ(0) rotate(' + this.rotationDegree + 'deg)');
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function () {
		/*if ( this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT - 2.5) { // skoða betur með -2.5 er svo hann fari ekki í gegnum jörðina
			var snd = new Audio("../sounds/flappyBirdSounds/hit.wav");
			snd.play();

			this.rotationDegree = 90;
			return this.game.gameover();
		}*/
		if (this.pos.y + HEIGHT > this.game.WORLD_HEIGHT - 2.5 ||	//athuga hvort hann fari í jörðina
			(this.pos.x + WIDTH - 2 > this.game.pipe1.pos.x &&		//athuga hvort hann sé kominn að pípunni
				!(this.pos.x + WIDTH > this.game.pipe1.pos.x + this.game.pipe1.size.WIDTH) && // athuga hvort hann sé komin lengra en pípan
				(this.pos.y < this.game.pipe1.pos.y + 21 ||			//athuga hvort hann sé fyrir neðan efri
					this.pos.y > this.game.pipe1.pos.y + 30)				//athuga hvort hann sé fyrir ofan neðrir pípuna
			)
		) {
			this.rotationDegree = 90;
			//this.pos.y = this.game.WORLD_HEIGHT - 2.5 - HEIGHT;
			var snd = new Audio("../sounds/flappyBirdSounds/hit.wav");
			snd.play();
			return this.game.gameover();
		}
	};

	return Player;

})();

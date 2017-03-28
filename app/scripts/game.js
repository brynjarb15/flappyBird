
window.Game = (function () {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function (el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.cloud = new window.Cloud(this.el.find('.Cloud'), this);
		this.ground = new window.Ground(this.el.find('.Ground'), this);

		this.pipes = new Array();
		this.pipes.push({lower: new window.Pipes(this.el.find('.Pipe1'), this, 0), 
						 upper: new window.Pipes(this.el.find('.Pipe2'), this, 0)});
		this.pipes.push({lower: new window.Pipes(this.el.find('.Pipe3'), this, 1), 
						 upper: new window.Pipes(this.el.find('.Pipe4'), this, 1)});
		this.pipes.push({lower: new window.Pipes(this.el.find('.Pipe5'), this, 2), 
						 upper: new window.Pipes(this.el.find('.Pipe6'), this, 2)});

		this.isPlaying = false;


		var fontSize = Math.min(
			window.innerWidth / Game.prototype.WORLD_WIDTH,
			window.innerHeight / Game.prototype.WORLD_HEIGHT
		);
		el.css('fontSize', fontSize + 'px');


		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */

	Game.prototype.onFrame = function () {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
			delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.cloud.onFrame(delta);
		this.ground.onFrame(delta);
		
		for(var i = 0; i < this.pipes.length; i++) {
			this.pipes[i].lower.onFrame(delta);
			this.pipes[i].upper.onFrame(delta);
		}


		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function () {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function () {
		this.player.reset();
		this.cloud.reset();
		this.ground.reset();

		for(var i = 0; i < this.pipes.length; i++) {
			this.pipes[i].lower.reset(40*i);
			this.pipes[i].upper.reset(40*i);
		}
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function () {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
			.one('click', function () {
				scoreboardEl.removeClass('is-visible');
				that.start();
			});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;
	
	Game.prototype.isMuted = false;

	return Game;
})();


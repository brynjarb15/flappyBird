window.Cloud = (function() {
	'use strict';

	var SPEED = 2;
    var INITIAL_POSITION_X = Game.prototype.WORLD_WIDTH;
	var INITIAL_POSITION_Y = 0;

	var Cloud = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: Game.prototype.WORLD_WIDTH, y: 0 };
	};

    Cloud.prototype.reset = function () {
        this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
    };

	Cloud.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		if(this.pos.x <= -(Game.prototype.WORLD_WIDTH)/2){
			this.pos.x = Game.prototype.WORLD_WIDTH;
		}
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};
	return Cloud;

})();

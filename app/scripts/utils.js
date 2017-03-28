'use stric';
/**
 * Cross browser RequestAnimationFrame
 */
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (function () {
		'use strict';
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (/* function */ callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();
}

var muteMusic = function () {
	'use strict';
	var backgroundMusic = document.getElementById('backgroundMusic');
	backgroundMusic.muted = !backgroundMusic.muted;
};

var muteSound = function () {
	'use strict';
	window.Game.prototype.isMuted = !window.Game.prototype.isMuted;
};


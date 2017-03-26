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


function muteSound() {
	backgroundMusic = document.getElementById('backgroundMusic');
	backgroundMusic.muted = !backgroundMusic.muted;
}

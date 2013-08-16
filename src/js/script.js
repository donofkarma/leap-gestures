/*jslint eqeqeq: true, undef: true */
/*global $, window, console, alert */

var LeapTest = LeapTest || {};

LeapTest.GestureTest = (function() {
	// PRIVATE VARIABLES
	var LeapController = new Leap.Controller({enableGestures: true}),
		screenCentreX = $(window).width() / 2;

	// PRIVATE FUNCTIONS

	// PUBLIC METHODS
	return {
		init: function() {
			// DOM ready
			var $handCount = $("#count");

			LeapController.loop(function(frame) {
				/*if (frame.hands.length) {
					if (frame.hands[0].palmPosition) {
						pos = frame.hands[0].palmPosition;

						$pointer.css({
							left: screenCentreX + pos[0],
							bottom: pos[1]
						});
					}
				}*/

				var prevFrame = LeapController.frame(10);

				if (frame.hands.length) {
					// count
					$handCount.html(frame.hands.length);

					// custom gesture detection
					for (var i = 0; i < frame.hands.length; i++) {
						// grab detection
						if (prevFrame.hands.length) {

							if (prevFrame.hands[0].fingers.length === 5 && frame.hands[i].fingers.length === 0) {
								console.log("grab");
							}

							if (prevFrame.hands[0].fingers.length === 0 && frame.hands[i].fingers.length === 5) {
								console.log("release");
							}
						}
					}
				} else {
					// reset display
					$handCount.html("");
				}
			});
		},
		pageInit: function() {
			// page load
		}
	};
}());

// ON DOM READY
$(function() {
	LeapTest.GestureTest.init();
});

// ON PAGE LOAD
$(window).load(function() {
	//LeapTest.GestureTest.pageInit();
});
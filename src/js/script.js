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
				var prevFrame = LeapController.frame(10);

				if (frame.hands.length) {
					// count
					$handCount.html(frame.hands.length);

					// custom gesture detection
					for (var i = 0; i < frame.hands.length; i++) {
						// grab detection
						if (prevFrame.hands.length) {

							// make sure it's the same hand

							// detect the grab
							if (prevFrame.hands[0].fingers.length > 3 && frame.hands[i].fingers.length < 2) {
								console.log("grab");
							}

							// detect the release
							if (prevFrame.hands[0].fingers.length < 2 && frame.hands[i].fingers.length > 3) {
								console.log("release");
							}

							// find a way to limit the number of events fired

							// if the hand leaves then fire the release
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
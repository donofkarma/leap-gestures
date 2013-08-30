/*jslint eqeqeq: true, undef: true */
/*global $, window, console, alert */

var LeapTest = LeapTest || {};

LeapTest.GestureTest = (function() {
	// PRIVATE VARIABLES
	var LeapController = new Leap.Controller(),
		grabbing = {};

	// PRIVATE FUNCTIONS

	// PUBLIC METHODS
	return {
		exit: function(frame) {},
		grab: function(frame) {
			var prevFrame = LeapController.frame(10);

			if (frame.hands.length) {
				// custom gesture detection
				for (var i = 0; i < frame.hands.length; i++) {
					// grab detection
					if (prevFrame.hands.length) {

						// make sure it's the same hand

						// detect the grab
						if (prevFrame.hands[0].fingers.length > 4 && frame.hands[i].fingers.length < 2) {
							// if it's not grabbing already
							if (!grabbing[frame.hands[i].id]) {
								// push the grabbing hand to the array
								grabbing[frame.hands[i].id] = frame.hands[i];

								console.log("grab", grabbing);
							}
						}

						// detect the release
						if (prevFrame.hands[0].fingers.length < 2 && frame.hands[i].fingers.length > 4) {
							// if it's not grabbing already
							if (grabbing[frame.hands[i].id]) {
								// remove the hand from the array
								delete grabbing[frame.hands[i].id];

								console.log("release", grabbing);
							}
						}

						// find a way to limit the number of events fired
					}
				}
			} else {
				// if the hand leaves then fire the release
				//console.log("release");
			}

			return grabbing;
		},
		init: function() {
			// DOM ready

			LeapController.loop(function(frame) {
				var gestureGrab = LeapTest.GestureTest.grab(frame);

				// for every hand grabbing
				for (var grab in gestureGrab) {
					if (gestureGrab.hasOwnProperty(grab)) {
						// trigger the grab event
						console.log(gestureGrab[grab]);
					}
				}

				// if there is no interaction
				if (!frame.hands.length) {
					// for every hand grabbing
					for (var grab2 in gestureGrab) {
						if (gestureGrab.hasOwnProperty(grab2)) {
							// trigger a grab cancel
						}
					}
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
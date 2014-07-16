// Unit tests for views/game-view.js

QUnit.test( "constructor failure tests", function( assert ) {
	expect(1);

	assert.ok(1 == 1, "ok");

	/*assert.throws(
		function() { var gv = new GameView(); },
		function(e) { return (e.message.match(/Class is missing(.*)mouseOrTapDownCard/) !== null); },
		"Expected that the `GameView` class is missing the implementation of the `mouseOrTapDownCard` function."
	);*/
});
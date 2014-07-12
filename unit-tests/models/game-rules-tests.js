// Unit tests for models/game-rules.js

QUnit.test( "constructor failure tests", function( assert ) {
	expect(1);

	assert.throws(
		function() { var gm = new GameRules(); },
		function(e) { return (e.message.match(/Class is missing(.*)gameWon/) !== null); },
		"Expected that the `GameRules` class is missing the implementation of the `gameWon` function."
	);
});
// Unit tests for games/solitaire-view.js

/** Constructor tests **/
QUnit.test( "constructor success tests", function( assert ) {
	expect(1);

	var sr = new SolitaireRules();
	var good = new SolitaireView(sr.getStackModel(), 'img/cards');
	assert.ok(
		good.instanceOf(SolitaireView) === true,
		"Expected that the instantiated object is a `SolitaireView` class."
	);
});
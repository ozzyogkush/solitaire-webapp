// Unit tests for static/stack-types.js

var dealer = "dealer";
var draw = "draw";
var inPlay = "inPlay";
var foundation = "foundation";

QUnit.test( "property tests", function( assert ) {
	expect(4);

	var st = new StackTypes();
	assert.strictEqual(
		dealer,
		st.dealer,
		'Expected the "dealer" StackType to equal "dealer".'
	);

	assert.strictEqual(
		draw,
		st.draw,
		'Expected the "draw" StackType to equal "draw".'
	);

	assert.strictEqual(
		inPlay,
		st.inPlay,
		'Expected the "inPlay" StackType to equal "inPlay".'
	);

	assert.strictEqual(
		foundation,
		st.foundation,
		'Expected the "foundation" StackType to equal "foundation".'
	);
});
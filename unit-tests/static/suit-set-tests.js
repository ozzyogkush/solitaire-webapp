// Unit tests for static/suit-set.js

var hearts = new Suit('hearts', new Color('#FF0000'));
var diamonds = new Suit('diamonds', new Color('#FF0000'));
var spades = new Suit('spades', new Color('#000000'));
var clubs = new Suit('clubs', new Color('#000000'));

QUnit.test( "property tests", function( assert ) {
	expect(4);

	var ss = new SuitSet();
	assert.propEqual(
		hearts,
		ss.hearts,
		'Expected a Suit object with `suitName` equal to `hearts` and `color` equal to a Color with hex #FF0000'
	);

	assert.propEqual(
		diamonds,
		ss.diamonds,
		'Expected a Suit object with `suitName` equal to `hearts` and `color` equal to a Color with hex #FF0000'
	);

	assert.propEqual(
		spades,
		ss.spades,
		'Expected a Suit object with `suitName` equal to `spades` and `color` equal to a Color with hex #000000'
	);

	assert.propEqual(
		clubs,
		ss.clubs,
		'Expected a Suit object with `suitName` equal to `clubs` and `color` equal to a Color with hex #000000'
	);
});
// Unit tests for models/suit.js

var goodName = "SomeString";
var goodColor = new Color('red');
var badName = {};
var badColor = {};

QUnit.test( "constructor tests expected failures", function( assert ) {
	expect(4);

	assert.throws(
		function () { var suit = new Suit(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'Suit name cannot be null.' &&
				e.getCallingMethod() === 'Suit.__construct'
			);
		},
		"Expected that `name` param should not be null has passed!"
	);

	assert.throws(
		function () { var suit = new Suit(goodName); },
		function (e) {
			var correctException = (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'Color cannot be null.' &&
				e.getCallingMethod() === 'Suit.__construct'
			);

			return correctException;
		},
		"Expected that `color` param must not be null has passed!"
	);

	assert.throws(
		function () { var suit = new Suit(badName, goodColor); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected that `name` param must be a string has passed!"
	);

	assert.throws(
		function () { var suit = new Suit(goodName, badColor); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Color"
			);
		},
		"Expected that `color` param must be a Color has passed!"
	);
});
/*
QUnit.test( "constructor tests expected success", function( assert ) {
	expect();
});

QUnit.test( "property accessor method tests", function( assert ) {
	expect();
});*/
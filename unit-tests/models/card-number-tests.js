// Unit tests for models/card-number.js

var goodCardValue = 14;
var badCardValue = true;
var goodCardNumberName = "ace";
var badCardNumberName = {};

QUnit.test( "constructor tests expected failures", function( assert ) {
	expect(4);

	assert.throws(
		function () { var cn = new CardNumber(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'CardNumber value is required.' &&
				e.getCallingMethod() === 'CardNumber.__construct'
			);
		},
		"Expected that `cardValue` param is required has passed!"
	);

	assert.throws(
		function () { var cn = new CardNumber(goodCardValue); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'CardNumber name is required.' &&
				e.getCallingMethod() === 'CardNumber.__construct'
			);
		},
		"Expected that `cardNumberName` param is required has passed!"
	);

	assert.throws(
		function () { var cn = new CardNumber(badCardValue, goodCardNumberName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "number"
			);
		},
		"Expected that `cardValue` param must be an Integer has passed!"
	);

	assert.throws(
		function () { var cn = new CardNumber(goodCardValue, badCardNumberName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected that `cardNumberName` param must be a String has passed!"
	);
});
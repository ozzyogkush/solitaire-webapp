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
		"Expected that `cardValue` param is required was not thrown!"
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
		"Expected that `cardNumberName` param is required was not thrown!"
	);

	assert.throws(
		function () { var cn = new CardNumber(badCardValue, goodCardNumberName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "number"
			);
		},
		"Expected that `cardValue` param must be an Integer was not thrown!"
	);

	assert.throws(
		function () { var cn = new CardNumber(goodCardValue, badCardNumberName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected that `cardNumberName` param must be a String was not thrown!"
	);
});

QUnit.test( "constructor tests expected successes", function( assert ) {
	expect(2);

	var good = new CardNumber(goodCardValue, goodCardNumberName);
	assert.strictEqual(
		goodCardValue,
		good.getCardValue(),
		"The returned value of `getCardValue()` doesn't equal the value supplied in the constructor, `" + goodCardValue + "`."
	);
	assert.strictEqual(
		goodCardNumberName,
		good.getCardNumberName(),
		"The returned value of `getCardNumberName()` doesn't equal the value supplied in the constructor, '" + goodCardNumberName + "'."
	);
});

/* Set/Get methods */
QUnit.test( "`__setCardValue()` and `getCardValue()` tests", function( assert ) {
	expect(4);

	var good = new CardNumber(goodCardValue, goodCardNumberName); 
	assert.throws(
		function () {
			good.__setCardValue(badCardValue);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "number"
			);
		},
		"Expected that `cardValue` param must be an Integer was not thrown!"
	);
	assert.throws(
		function () {
			good.__setCardNumberName(badCardNumberName);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected that `cardNumberName` param must be a String was not thrown!"
	);

	// reset the vars necessary to check for success
	good.cardValue = null;
	good.cardNumberName = null;
	good.__setCardValue(goodCardValue);
	assert.strictEqual(
		goodCardValue,
		good.getCardValue(),
		"The returned value of `getCardValue()` doesn't equal the supplied param, `" + goodCardValue + "`."
	);
	good.__setCardNumberName(goodCardNumberName);
	assert.strictEqual(
		goodCardNumberName,
		good.getCardNumberName(),
		"The returned value of `getCardNumberName()` doesn't equal the supplied param, '" + goodCardNumberName + "'."
	);
});
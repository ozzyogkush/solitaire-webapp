// Unit tests for models/stack.js

var stackTypes = new StackTypes();
var fanningDirections = new FanningDirectionSet();

var goodStackType = stackTypes.inPlay;
var badStackType = "bong";

var defaultFanningDirection = fanningDirections.none;
var goodFanningDirection = fanningDirections.down;
var badFanningDirection = "some string";

var defaultNumCardsFacingDown = 0;
var badNumCardsFacingDown = "x";
var goodNumCardsFacingDown = 5;

var defaultNumCardsFacingUp = 0;
var badNumCardsFacingUp = "x";
var goodNumCardsFacingUp = 5;

QUnit.test( "constructor tests expected failures", function( assert ) {
	expect(5);

	assert.throws(
		function () { var st = new Stack(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'Stack Type param is required.' &&
				e.getCallingMethod() === 'Stack.__construct'
			);
		},
		"Expected that `stackType` param is required was not thrown!"
	);

	assert.throws(
		function () { var st = new Stack(badStackType); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "StackType"
			);
		},
		"Expected that `stackType` param must be a StackType was not thrown!"
	);

	assert.throws(
		function () { var st = new Stack(goodStackType, badFanningDirection); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "FanningDirection"
			);
		},
		"Expected that `fanningDirection` param must be a FanningDirection was not thrown!"
	);

	assert.throws(
		function () { var st = new Stack(goodStackType, goodFanningDirection, badNumCardsFacingDown); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Integer"
			);
		},
		"Expected that `numCardsFacingDown` param must be an Integer was not thrown!"
	);

	assert.throws(
		function () { 
			var st = new Stack(
				goodStackType, 
				goodFanningDirection, 
				goodNumCardsFacingDown, 
				badNumCardsFacingUp
			); 
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Integer"
			);
		},
		"Expected that `numCardsFacingUp` param must be an Integer was not thrown!"
	);
});

QUnit.test( "constructor tests expected successes", function( assert ) {
	expect(16);

	// All optional params using defaults
	var good = new Stack(
		goodStackType
	);
	assert.strictEqual(
		good.getStackType(),
		goodStackType,
		"The returned value of `getStackType()` doesn't equal the supplied StackType object."
	);
	assert.propEqual(
		good.getFanningDirection(),
		defaultFanningDirection,
		"The returned value of `getFanningDirection()` doesn't equal the default FanningDirection object."
	);
	assert.propEqual(
		good.getNumCardsFacingDown(),
		defaultNumCardsFacingDown,
		"The returned value of `getNumCardsFacingDown()` doesn't equal the default value."
	);
	assert.propEqual(
		good.getNumCardsFacingUp(),
		defaultNumCardsFacingUp,
		"The returned value of `getNumCardsFacingUp()` doesn't equal the default value."
	);

	// Optional Num Cards Facing Down and Up params using defaults
	good = new Stack(
		goodStackType, 
		goodFanningDirection
	);
	assert.strictEqual(
		good.getStackType(),
		goodStackType,
		"The returned value of `getStackType()` doesn't equal the supplied StackType object."
	);
	assert.strictEqual(
		good.getFanningDirection(),
		goodFanningDirection,
		"The returned value of `getFanningDirection()` doesn't equal the supplied FanningDirection object."
	);
	assert.strictEqual(
		good.getNumCardsFacingDown(),
		defaultNumCardsFacingDown,
		"The returned value of `getNumCardsFacingDown()` doesn't equal the default value."
	);
	assert.strictEqual(
		good.getNumCardsFacingUp(),
		defaultNumCardsFacingUp,
		"The returned value of `getNumCardsFacingUp()` doesn't equal the default value."
	);

	// Optional Num Cards Facing Up param using defaults
	good = new Stack(
		goodStackType, 
		goodFanningDirection, 
		goodNumCardsFacingDown
	);
	assert.strictEqual(
		good.getStackType(),
		goodStackType,
		"The returned value of `getStackType()` doesn't equal the supplied StackType object."
	);
	assert.strictEqual(
		good.getFanningDirection(),
		goodFanningDirection,
		"The returned value of `getFanningDirection()` doesn't equal the supplied FanningDirection object."
	);
	assert.strictEqual(
		good.getNumCardsFacingDown(),
		goodNumCardsFacingDown,
		"The returned value of `getNumCardsFacingDown()` doesn't equal the supplied value of `" + goodNumCardsFacingDown + "`."
	);
	assert.strictEqual(
		good.getNumCardsFacingUp(),
		defaultNumCardsFacingUp,
		"The returned value of `getNumCardsFacingUp()` doesn't equal the default value."
	);

	// All optional params specified
	good = new Stack(
		goodStackType, 
		goodFanningDirection, 
		goodNumCardsFacingDown, 
		goodNumCardsFacingUp
	);
	assert.strictEqual(
		good.getStackType(),
		goodStackType,
		"The returned value of `getStackType()` doesn't equal the supplied StackType object."
	);
	assert.strictEqual(
		good.getFanningDirection(),
		goodFanningDirection,
		"The returned value of `getFanningDirection()` doesn't equal the supplied FanningDirection object."
	);
	assert.strictEqual(
		good.getNumCardsFacingDown(),
		goodNumCardsFacingDown,
		"The returned value of `getNumCardsFacingDown()` doesn't equal the supplied value of `" + goodNumCardsFacingDown + "`."
	);
	assert.strictEqual(
		good.getNumCardsFacingUp(),
		goodNumCardsFacingUp,
		"The returned value of `getNumCardsFacingUp()` doesn't equal the supplied value of `" + goodNumCardsFacingUp + "`."
	);
});

/* Set/Get methods */
QUnit.test( "`__setStackType()` and `getStackType()` tests", function( assert ) {
	expect(2);

	var good = new Stack(goodStackType);
	assert.throws(
		function () { good.__setStackType(badStackType); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "StackType"
			);
		},
		"Expected that `stackType` param must be a StackType was not thrown!"
	);

	good._stackType = null;
	good.__setStackType(goodStackType);
	assert.strictEqual(
		good.getStackType(),
		goodStackType,
		"The returned value of `getStackType()` doesn't equal the supplied StackType object."
	);
});

QUnit.test( "`__setFanningDirection()` and `getFanningDirection()` tests", function( assert ) {
	expect(2);

	var good = new Stack(goodStackType);
	assert.throws(
		function () { good.__setFanningDirection(badFanningDirection); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "FanningDirection"
			);
		},
		"Expected that `fanningDirection` param must be a FanningDirection was not thrown!"
	);

	good._fanningDirection = null;
	good.__setFanningDirection(goodFanningDirection);
	assert.strictEqual(
		good.getFanningDirection(),
		goodFanningDirection,
		"The returned value of `getFanningDirection()` doesn't equal the supplied FanningDirection object."
	);
});

QUnit.test( "`__setNumCardsFacingDown()` and `getNumCardsFacingDown()` tests", function( assert ) {
	expect(2);

	var good = new Stack(goodStackType);
	assert.throws(
		function () { good.__setNumCardsFacingDown(badNumCardsFacingDown); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Integer"
			);
		},
		"Expected that `numCardsFacingDown` param must be an Integer was not thrown!"
	);

	good._numCardsFacingDown = null;
	good.__setNumCardsFacingDown(goodNumCardsFacingDown);
	assert.strictEqual(
		good.getNumCardsFacingDown(),
		goodNumCardsFacingDown,
		"The returned value of `getNumCardsFacingDown()` doesn't equal the supplied integer `" + goodNumCardsFacingDown + "`."
	);
});

QUnit.test( "`__setNumCardsFacingUp()` and `getNumCardsFacingUp()` tests", function( assert ) {
	expect(2);

	var good = new Stack(goodStackType);
	assert.throws(
		function () { good.__setNumCardsFacingUp(badNumCardsFacingUp); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Integer"
			);
		},
		"Expected that `numCardsFacingUp` param must be an Integer was not thrown!"
	);

	good._numCardsFacingUp = null;
	good.__setNumCardsFacingUp(goodNumCardsFacingUp);
	assert.strictEqual(
		good.getNumCardsFacingUp(),
		goodNumCardsFacingUp,
		"The returned value of `getNumCardsFacingUp()` doesn't equal the supplied Integer `" + goodNumCardsFacingUp + "`."
	);
});

QUnit.test( "`setViewElement()` and `getViewElement()` tests", function( assert ) {
	expect(3);

	var badStackViewElement = "a string";
	var goodStackViewElement = $("<div></div>").prop('id', 'stackViewElement');

	var good = new Stack(goodStackType);
	assert.throws(
		function () { good.setViewElement(badStackViewElement); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "jQuery"
			);
		},
		"Expected that `viewElement` param must be a jQuery object was not thrown!"
	);

	var gsveClone = goodStackViewElement.clone();
	good.setViewElement(gsveClone);
	assert.strictEqual(
		good.getViewElement(),
		gsveClone,
		"The returned value of `getViewElement()` doesn't equal the supplied jQuery object."
	);
	assert.strictEqual(
		good.getViewElement().prop('id'),
		'stackViewElement',
		"The ID of the jQuery element returned from `getViewElement()` doesn't equal the expected value of 'stackViewElement'."
	);
});

/* Private methods */

/* Public methods */
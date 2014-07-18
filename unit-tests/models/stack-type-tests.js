// Unit tests for models/stack-type.js

var goodStackTypeName = "down";
var badStackTypeName = {};

QUnit.test( "constructor tests expected failures", function( assert ) {
	expect(2);

	assert.throws(
		function () { var st = new StackType(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'Stack Type name is required.' &&
				e.getCallingMethod() === 'StackType.__construct'
			);
		},
		"Expected that `cardNumberName` param is required was not thrown!"
	);

	assert.throws(
		function () { var st = new StackType(badStackTypeName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected that `stackTypeName` param must be a String was not thrown!"
	);
});

QUnit.test( "constructor tests expected successes", function( assert ) {
	expect(1);

	var good = new StackType(goodStackTypeName);
	assert.strictEqual(
		goodStackTypeName,
		good.getStackTypeName(),
		"The returned value of `getStackTypeName()` doesn't equal the value supplied in the constructor, `" + goodStackTypeName + "`."
	);
});

/* Set/Get methods */
QUnit.test( "`__setStackTypeName()` and `getStackTypeName()` tests", function( assert ) {
	expect(2);

	var good = new StackType(goodStackTypeName); 
	assert.throws(
		function () {
			good.__setStackTypeName(badStackTypeName);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected that the `stackTypeName` param must be a String was not thrown!"
	);

	// reset the vars necessary to check for success
	good._stackTypeName = null;
	good.__setStackTypeName(goodStackTypeName);
	assert.strictEqual(
		goodStackTypeName,
		good.getStackTypeName(),
		"The returned value of `getStackTypeName()` doesn't equal the supplied param, `" + goodStackTypeName + "`."
	);
});
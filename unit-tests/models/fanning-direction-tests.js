// Unit tests for models/fanning-direction.js

var goodFanningDirectionName = "down";
var badFanningDirectionName = {};

QUnit.test( "constructor tests expected failures", function( assert ) {
	expect(2);

	assert.throws(
		function () { var fd = new FanningDirection(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'Fanning Direction name is required.' &&
				e.getCallingMethod() === 'FanningDirection.__construct'
			);
		},
		"Expected that `cardNumberName` param is required was not thrown!"
	);

	assert.throws(
		function () { var fd = new FanningDirection(badFanningDirectionName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected that `fanningDirectionName` param must be a String was not thrown!"
	);
});

QUnit.test( "constructor tests expected successes", function( assert ) {
	expect(1);

	var good = new FanningDirection(goodFanningDirectionName);
	assert.strictEqual(
		goodFanningDirectionName,
		good.getFanningDirectionName(),
		"The returned value of `getFanningDirectionName()` doesn't equal the value supplied in the constructor, `" + goodFanningDirectionName + "`."
	);
});

/* Set/Get methods */
QUnit.test( "`__setFanningDirectionName()` and `getFanningDirectionName()` tests", function( assert ) {
	expect(2);

	var good = new FanningDirection(goodFanningDirectionName); 
	assert.throws(
		function () {
			good.__setFanningDirectionName(badFanningDirectionName);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected that `_fanningDirectionName` param must be a String was not thrown!"
	);

	// reset the vars necessary to check for success
	good._fanningDirectionName = null;
	good.__setFanningDirectionName(goodFanningDirectionName);
	assert.strictEqual(
		goodFanningDirectionName,
		good.getFanningDirectionName(),
		"The returned value of `getFanningDirectionName()` doesn't equal the supplied param, `" + goodFanningDirectionName + "`."
	);
});
// Unit tests for exceptions/card-game-exception.js

var goodMsg = "This is a message";
var goodMsgObj = { msg : "This is a message" };
var goodMsgArr = [ "This is a message" ];
var goodCallingMethod = "anonymous function";
var defaultSeverity = CardGameExceptionSeverity.ERROR;
var goodSeverity = CardGameExceptionSeverity.INFO;

QUnit.test( "constructor tests expected failures", function( assert ) {
	expect(4);

	assert.throws(
		function () { var cge = new CardGameException(); },
		"CardGameDebugMessage.__construct() - The required `message` parameter must be string, array, or object.",
		"Expected null `message` param exception has passed!"
	);

	assert.throws(
		function () { var cge = new CardGameException(false); },
		"CardGameDebugMessage.__construct() - The required `message` parameter must be string, array, or object.",
		"Expected boolean `message` param exception has passed!"
	);

	assert.throws(
		function () { var cge = new CardGameException(true, goodCallingMethod); },
		"CardGameDebugMessage.__construct() - The required `message` parameter must be string, array, or object.",
		"Expected good `callingMethod` but illegal type `message` param exception has passed!"
	);

	assert.throws(
		function () { var cge = new CardGameException(goodMsg, false); },
		"CardGameDebugMessage.__construct() - The required `callingMethod` parameter must be a string.",
		"Expected good `message` but illegal type `callingMethod` param exception has passed!"
	);
});

QUnit.test( "constructor tests expected success", function( assert ) {
	expect(2);

	var good = new CardGameException(goodMsg, goodCallingMethod);
	// strictEqual() would fail here since the default `good.severity` object is not the same object in memory as the `defaultSeverity` object.
	assert.propEqual(
		defaultSeverity,
		good.severity, 
		"`severity` property does not equal the object specified."
	);

	good = new CardGameException(goodMsg, goodCallingMethod, goodSeverity);
	assert.strictEqual(
		goodSeverity,
		good.severity, 
		"`severity` property does not equal the object specified."
	);
});

QUnit.test( "property accessor method tests", function( assert ) {
	expect(1);

	var good = new CardGameException(goodMsg, goodCallingMethod, goodSeverity);
	assert.strictEqual(
		goodSeverity, 
		good.getSeverity(), 
		"`getSeverity()` return value does not equal supplied `severity` property."
	);
});

QUnit.test( "toString() method tests", function( assert ) {
	expect(4);

	var cge = new CardGameException(goodMsg, goodCallingMethod);
	assert.strictEqual(
		defaultSeverity.prefix + goodCallingMethod + "() - " + goodMsg,
		cge.toString(),
		"Expected output of `.toString()` does not match."
	);
	
	cge = new CardGameException(goodMsgObj, goodCallingMethod);
	assert.strictEqual(
		defaultSeverity.prefix + goodCallingMethod + "() - " + goodMsgObj,
		cge.toString(),
		"Expected output of `.toString()` does not match."
	);
	
	cge = new CardGameException(goodMsgArr, goodCallingMethod);
	assert.strictEqual(
		defaultSeverity.prefix + goodCallingMethod + "() - " + goodMsgArr,
		cge.toString(),
		"Expected output of `.toString()` does not match."
	);

	cge = new CardGameException(goodMsg, goodCallingMethod, goodSeverity);
	assert.strictEqual(
		goodSeverity.prefix + goodCallingMethod + "() - " + goodMsg,
		cge.toString(),
		"Expected output of `.toString()` does not match."
	);
});
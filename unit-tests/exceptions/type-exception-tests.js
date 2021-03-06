// Unit tests for exceptions/type-exception.js

var badExpectedType = {};
var goodExpectedType = "boolean";
var goodCallingMethod = "anonymous function";

QUnit.test( "constructor tests expected failures", function( assert ) {
	expect(1);

	assert.throws(
		function () { var te = new TypeException(badExpectedType, goodCallingMethod); },
		"TypeException.__construct() - The `expectedType` parameter must be a string.",
		"Expected good `callingMethod` but illegal type `expectedType` param exception has passed!"
	);
});

QUnit.test( "constructor tests expected success", function( assert ) {
	expect(2);

	var te = new TypeException(goodExpectedType, goodCallingMethod);
	var exceptionMsg = "Type mismatch: expected type is `" + goodExpectedType + "`.";
	assert.strictEqual(
		exceptionMsg,
		te.message,
		"`message` property does not equal the constructed string."
	);

	assert.strictEqual(
		goodExpectedType,
		te.type,
		"`type` property does not equal the parameter."
	);
});

QUnit.test( "property accessor method tests", function( assert ) {
	expect(1);

	var good = new TypeException(goodExpectedType, goodCallingMethod);
	assert.strictEqual(
		goodExpectedType, 
		good.getType(), 
		"`getType()` return value does not equal supplied `type` property."
	);
});
// Unit tests for exceptions/card-game-debug-message.js

var goodMsg = "This is a message";
var goodMsgObj = { msg : "This is a message" };
var goodMsgArr = [ "This is a message" ];
var goodCallingMethod = "anonymous function";

QUnit.test( "constructor tests expected failures", function( assert ) {

	expect(4);

	assert.throws(
		function () { var cgdb = new CardGameDebugMessage(); },
		"CardGameDebugMessage.__construct() - The required `message` parameter must be string, array, or object.",
		"Expected null `message` param exception has passed!"
	);

	assert.throws(
		function () { var cgdb = new CardGameDebugMessage(false); },
		"CardGameDebugMessage.__construct() - The required `message` parameter must be string, array, or object.",
		"Expected boolean `message` param exception has passed!"
	);

	assert.throws(
		function () { var cgdb = new CardGameDebugMessage(true, goodCallingMethod); },
		"CardGameDebugMessage.__construct() - The required `message` parameter must be string, array, or object.",
		"Expected good `callingMethod` but illegal type `message` param exception has passed!"
	);

	assert.throws(
		function () { var cgdb = new CardGameDebugMessage(goodMsg, false); },
		"CardGameDebugMessage.__construct() - The required `callingMethod` parameter must be a string.",
		"Expected good `message` but illegal type `callingMethod` param exception has passed!"
	);
});

QUnit.test( "constructor tests expected success", function( assert ) {
	expect(6);

	var good = new CardGameDebugMessage(goodMsg, goodCallingMethod);
	assert.strictEqual(
		goodMsg,
		good.message, 
		"`message` property equals the string specified."
	);
	assert.strictEqual(
		goodCallingMethod, 
		good.callingMethod, 
		"`callingMethod` property equals the value specified."
	);

	good = new CardGameDebugMessage(goodMsgObj, goodCallingMethod);
	assert.strictEqual(
		goodMsgObj, 
		good.message, 
		"`message` property equals the object specified."
	);
	assert.strictEqual(
		goodCallingMethod, 
		good.callingMethod, 
		"`callingMethod` property equals the value specified."
	);

	good = new CardGameDebugMessage(goodMsgArr, goodCallingMethod);
	assert.strictEqual(
		goodMsgArr, 
		good.message, 
		"`message` property equals the array specified."
	);
	assert.strictEqual(
		goodCallingMethod, 
		good.callingMethod, 
		"`callingMethod` property equals the value specified."
	);
});

QUnit.test( "property accessor method tests", function( assert ) {
	expect(2);

	var good = new CardGameDebugMessage(goodMsg, goodCallingMethod);
	var getGM = good.getMessage();
	assert.strictEqual(
		goodMsg,
		getGM,  
		"`getMessage()` properly retrieves correct `message` property."
	);

	var getCM = good.getCallingMethod();
	assert.strictEqual(
		goodCallingMethod,
		getCM,  
		"`getCallingMethod()` properly retrieves correct `callingMethod` property."
	);
});

QUnit.test( "toString() method tests", function( assert ) {
	expect(3);

	var cgdb = new CardGameDebugMessage(goodMsg, goodCallingMethod);
	assert.strictEqual(
		"Debug: " + goodCallingMethod + "() - " + goodMsg,
		cgdb.toString(),
		"Expected output of `.toString()` does not match."
	);
	
	cgdb = new CardGameDebugMessage(goodMsgObj, goodCallingMethod);
	assert.strictEqual(
		"Debug: " + goodCallingMethod + "() - " + goodMsgObj,
		cgdb.toString(),
		"Expected output of `.toString()` does not match."
	);
	
	cgdb = new CardGameDebugMessage(goodMsgArr, goodCallingMethod);
	assert.strictEqual(
		"Debug: " + goodCallingMethod + "() - " + goodMsgArr,
		cgdb.toString(),
		"Expected output of `.toString()` does not match."
	);
});

QUnit.test( "toConsole() method tests", function( assert ) {
	expect(2);

	var cgdb = new CardGameDebugMessage(goodMsgObj, goodCallingMethod);
	assert.strictEqual(
		cgdb,
		cgdb.toConsole(),
		"Expected output of `.toConsole()` does not match."
	);
	
	cgdb = new CardGameDebugMessage(goodMsg, goodCallingMethod);
	assert.strictEqual(
		cgdb.toString(),
		cgdb.toConsole(),
		"Expected output of `.toConsole()` does not match."
	);
});
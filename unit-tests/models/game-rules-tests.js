// Unit tests for models/game-rules.js

var badNumDecksInGame = "aString";
var goodNumDecksInGame = 4;

var badIncludeJokers = "aString";
var goodIncludeJokers = true;

var badAcesHigh = "aString";
var goodAcesHigh = true;

var badUseTimer = "aString";
var goodUseTimer = true;

var badStackModel = "aString";
var goodStackModel = [];


var st = new StackTypes();
var fd = new FanningDirectionSet();
var badLayout = "aString";
var goodLayout = [
	[ 
		null, 
		null, 
		{
			stackType : st.dealer,
			fanningDirection : fd.none,
			numCardsFacingDown : 104,
			numCardsFacingUp : 0
		},
		{
			stackType : st.inPlay,
			fanningDirection : fd.up,
			numCardsFacingDown : 5,
			numCardsFacingUp : 2
		} 
	]
];

/** Constructor tests **/

QUnit.test( "constructor success tests", function( assert ) {
	expect(1);

	var good = new GameRules();
	assert.ok(
		good.instanceOf(GameRules) === true,
		"Expected that the instantiated object is a `GameRules` class."
	);
});

/** Set/Get methods **/
QUnit.test( "`__setNumDecksInGame()` and `getNumDecksInGame()` tests", function( assert ) {
	expect(2);

	var good = new GameRules();

	assert.throws(
		function() { 
			good.__setNumDecksInGame(badNumDecksInGame);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Integer"
			);
		},
		"Expected that `n` param must be an Integer was not thrown!"
	);

	good.__setNumDecksInGame(goodNumDecksInGame);
	assert.strictEqual(
		good.getNumDecksInGame(),
		goodNumDecksInGame,
		'The Integer returned from `getNumDecksInGame()` (' + 
			good.getNumDecksInGame() + 
			') does not match the one passed into `__setNumDecksInGame()` (' + 
			goodNumDecksInGame + ').'
	);
});

QUnit.test( "`__setIncludeJokers()` and `getIncludeJokers()` tests", function( assert ) {
	expect(2);

	var good = new GameRules();

	assert.throws(
		function() { 
			good.__setIncludeJokers(badIncludeJokers);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Boolean"
			);
		},
		"Expected that `ij` param must be a Boolean was not thrown!"
	);

	good.__setIncludeJokers(goodIncludeJokers);
	assert.strictEqual(
		good.getIncludeJokers(),
		goodIncludeJokers,
		"The Boolean returned from `getIncludeJokers()` does not match the one passed into `__setIncludeJokers()`."
	);
});

QUnit.test( "`__setAcesHigh()` and `getAcesHigh()` tests", function( assert ) {
	expect(2);

	var good = new GameRules();

	assert.throws(
		function() { 
			good.__setAcesHigh(badAcesHigh);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Boolean"
			);
		},
		"Expected that `ah` param must be a Boolean was not thrown!"
	);

	good.__setAcesHigh(goodAcesHigh);
	assert.strictEqual(
		good.getAcesHigh(),
		goodAcesHigh,
		"The Boolean returned from `getAcesHigh()` does not match the one passed into `__setAcesHigh()`."
	);
});

QUnit.test( "`__setStackModel()` and `getStackModel()` tests", function( assert ) {
	expect(2);

	var good = new GameRules();

	assert.throws(
		function() { 
			good.__setStackModel(badStackModel);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Array"
			);
		},
		"Expected that `st` param must be an Array was not thrown!"
	);

	good.__setStackModel(goodStackModel);
	assert.strictEqual(
		good.getStackModel(),
		goodStackModel,
		"The Array returned from `getStackModel()` does not match the one passed into `__setStackModel()`."
	);
});

QUnit.test( "`__setLayout()` and `getLayout()` tests", function( assert ) {
	expect(2);

	var good = new GameRules();

	assert.throws(
		function() { 
			good.__setLayout(badLayout);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Array"
			);
		},
		"Expected that `ly` param must be an Array was not thrown!"
	);

	good.__setLayout(goodLayout);
	assert.strictEqual(
		good.getLayout(),
		goodLayout,
		"The Array returned from `getLayout()` does not match the one passed into `__setLayout()`."
	);
});

QUnit.test( "`__setUseTimer()` and `getUseTimer()` tests", function( assert ) {
	expect(2);

	var good = new GameRules();

	assert.throws(
		function() { 
			good.__setUseTimer(badUseTimer);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "Boolean"
			);
		},
		"Expected that `timer` param must be a Boolean was not thrown!"
	);

	good.__setUseTimer(goodUseTimer);
	assert.strictEqual(
		good.getUseTimer(),
		goodUseTimer,
		"The Boolean returned from `getUseTimer()` does not match the one passed into `__setUseTimer()`."
	);
});

/** Private method tests **/
QUnit.test( "`__createStackModel()` tests", function( assert ) {
	expect(8);

	var good = new GameRules();
	var stackModel = good.__createStackModel();
	assert.strictEqual(
		stackModel,
		null,
		'Expected the returned `stackModel` to be `null` since no layout was available.'
	);

	good.__setLayout(goodLayout);
	stackModel = good.__createStackModel();
	assert.ok(
		$.type(stackModel) === "array",
		'Expected the returned `stackModel` to be an array.'
	);
	assert.strictEqual(
		stackModel.length,
		1,
		'Expected the returned `stackModel` to have one row.'
	);
	assert.strictEqual(
		stackModel[0].length,
		4,
		'Expected the first row of the returned `stackModel` to have 4 elements.'
	);
	assert.strictEqual(
		stackModel[0][0],
		null,
		'Expected the first element of first row of the returned `stackModel` to be null.'
	);
	assert.strictEqual(
		stackModel[0][1],
		null,
		'Expected the second element of first row of the returned `stackModel` to be null.'
	);
	assert.ok(
		(stackModel[0][2].hasOwnProperty('instanceOf') && stackModel[0][2].instanceOf(Stack)),
		'Expected the third element of first row of the returned `stackModel` to be a Stack.'
	);
	assert.ok(
		(stackModel[0][3].hasOwnProperty('instanceOf') && stackModel[0][3].instanceOf(Stack)),
		'Expected the fourth element of first row of the returned `stackModel` to be a Stack.'
	);
});

/** Public method tests **/
QUnit.test( "`getDealerStack()` tests", function( assert ) {
	expect(1);

	var good = new GameRules();
	good.__setLayout(goodLayout);
	good.__setStackModel(good.__createStackModel());
	var stackModel = good.getStackModel();
	var dealerStack = good.getDealerStack();
	assert.strictEqual(
		dealerStack,
		stackModel[0][2],
		'Expected the returned `dealerStack` to be equal to the Stack element stored in `stackModel[0][2]`.'
	);
});

QUnit.test( "`getStacksByType()` tests", function( assert ) {
	expect(5);

	var good = new GameRules();
	good.__setLayout(goodLayout);
	good.__setStackModel(good.__createStackModel());
	var stackModel = good.getStackModel();
	var dealerStacks = good.getStacksByType(st.dealer);
	assert.strictEqual(
		dealerStacks.length,
		1,
		'Expected to find only one `dealer` Stack in the model'
	);
	assert.strictEqual(
		dealerStacks[0],
		stackModel[0][2],
		'Expected the first object in the returned `dealerStacks` to be equal to the Stack element stored in `stackModel[0][2]`.'
	);

	var inPlayStacks = good.getStacksByType(st.inPlay);
	assert.strictEqual(
		inPlayStacks.length,
		1,
		'Expected to find only one `inPlay` Stack in the model'
	);
	assert.strictEqual(
		inPlayStacks[0],
		stackModel[0][3],
		'Expected the first object in the returned `inPlayStacks` to be equal to the Stack element stored in `stackModel[0][3]`.'
	);

	var foundationStacks = good.getStacksByType(st.foundation);
	assert.strictEqual(
		foundationStacks.length,
		0,
		'Expected to find no `foundation` Stacks in the model'
	);
});


QUnit.test( "`runForEachStackObject()` tests", function( assert ) {
	expect(4);

	var good = new GameRules();
	good.__setLayout(goodLayout);
	good.__setStackModel(good.__createStackModel());
	var f = function(stack) {
		var expected = stack === null ? 
			"empty" : 
			"a " + stack.getStackType().getStackTypeName();
		assert.ok(
			stack === null ? 
				true : 
				stack.instanceOf(Stack) === true,
			'Expected this stack to be ' + expected
		);
	};
	good.runForEachStackObject(this, f);
});
// Unit tests for card-game-app.js

var $badContainerElement = "bong";
var $badContainerElementEmpty = $();
var $goodContainerElement = $('<div></div>');

var badGames = 'plop';
var badGamesEmpty = [];
var goodGames = ['Test', 'Nonexistent'];

var badDebug = 'plop';
var goodDebug = true;

/** 
 * Requires the extended classes which implement the required abstract classes' stuff.
 * Gotta do it this way until QUnit has mock objects. *shrug*
 */
var st = new StackTypes();
var fd = new FanningDirectionSet();
var TestRules = Class({ extends : GameRules }, {
	_numDecksInGame : 1,
	_includeJokers : false,
	_acesHigh : false,
	_layout : [
		[ {
			stackType : st.inPlay.getStackTypeName(),
			fanningDirection : fd.up,
			numCardsFacingDown : 5,
			numCardsFacingUp : 2
		}, null, null ]
	],
	__construct : function() { this.super('__construct'); } 
});
var TestView = Class({ extends : GameView }, {
	__construct : function(stackModel) { this.super('__construct', stackModel); } 
});

/** Constructor tests **/
QUnit.test( "constructor failure tests", function( assert ) {
	expect(7);

	assert.throws(
		function() { var cga = new CardGameApp(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'Container element is required.' &&
				e.getCallingMethod() === 'CardGameApp.__construct'
			);
		},
		"Expected that `$containerElement` param is required was not thrown!"
	);

	assert.throws(
		function() { var cga = new CardGameApp($badContainerElement); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'jQuery'
			);
		},
		"Expected that `$containerElement` param is a jQuery was not thrown!"
	);

	assert.throws(
		function() { var cga = new CardGameApp($badContainerElementEmpty); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'Specified element could not be found.' &&
				e.getCallingMethod() === 'CardGameApp.__construct'
			);
		},
		"Expected that `$containerElement` param is required was not thrown!"
	);

	assert.throws(
		function() { var cga = new CardGameApp($goodContainerElement); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'List of games is required.' &&
				e.getCallingMethod() === 'CardGameApp.__construct'
			);
		},
		"Expected that `games` param is required was not thrown!"
	);

	assert.throws(
		function() { var cga = new CardGameApp($goodContainerElement, badGames); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Array'
			);
		},
		"Expected that `games` param is an Array was not thrown!"
	);

	assert.throws(
		function() { var cga = new CardGameApp($goodContainerElement, badGamesEmpty); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'List of games cannot be empty.' &&
				e.getCallingMethod() === 'CardGameApp.__construct'
			);
		},
		"Expected that `games` param is not empty was not thrown!"
	);

	assert.throws(
		function() { var cga = new CardGameApp($goodContainerElement, goodGames, badDebug); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Boolean'
			);
		},
		"Expected that `debug` param is a Boolean was not thrown!"
	);
});

QUnit.test( "constructor success tests", function( assert ) {
	expect(3);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);
	assert.strictEqual(
		good.getDebug(),
		goodDebug,
		'The Boolean object returned from `getDebug()` does not match the one passed into the constructor.'
	);
	assert.strictEqual(
		good.getRegisteredGames().length,
		1,
		'Expected 1 game successfully registered.'
	);
	assert.strictEqual(
		good.getLoadedGame(),
		goodGames[0],
		'Expected the loaded game name to be ' + goodGames[0] + '.'
	);

	// As of right now there are no existing games, so this will fail.
	/*assert.throws(
		function() { var cga = new new CardGameApp($goodContainerElement, goodGames, goodDebug); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'None of the specified Games exist.' &&
				e.getCallingMethod() === 'CardGameApp.__registerGames'
			);
		},
		"Expected that no actual games exist was not thrown!"
	);*/
});

/** Set/Get methods ** /
QUnit.test( "`__setAppView()` and `getAppView()` tests", function( assert ) {
	expect();

});

/** Private method tests ** /
QUnit.test( "`__()` tests", function( assert ) {
	expect();

});

/** Public method tests ** /
QUnit.test( "`()` tests", function( assert ) {
	expect();

});

*/
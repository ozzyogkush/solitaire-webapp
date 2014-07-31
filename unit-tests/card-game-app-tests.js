// Unit tests for card-game-app.js

// The CardGameApp logs to the browser console, which we cannot examine.
// Therefore, replace that object with a local one that we CAN examine.
var oldConsole = console;
console = {
	loggedMessages : [],
	lastMessage : null,
	log : function(message)
	{
		console.lastMessage = message;
		console.loggedMessages.push(console.lastMessage);
		//oldConsole.log(console.lastMessage);
	},
	getLastMessage : function()
	{
		return console.lastMessage;
	}
};

var $badContainerElement = "bong";
var $badContainerElementEmpty = $();
var $goodContainerElement = $('<div></div>');

var badGames = 'plop';
var badGamesEmpty = [];
var badGamesNonexistent = ['Nonexistent', 'Whosaidwhatnow'];
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
	_useTimer : true,
	_layout : [
		[ 
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
			},
			null,
			null
		]
	],
	__construct : function() { this.super('__construct'); } 
});
var TestView = Class({ extends : GameView }, {
	__construct : function(stackModel) { this.super('__construct', stackModel); } 
});

/** Constructor tests **/
QUnit.test( "constructor failure tests", function( assert ) {
	expect(14);

	var cga = new CardGameApp();
	assert.strictEqual(
		console.getLastMessage().instanceOf(CardGameException),
		true,
		'Expected a `CardGameException` to have been thrown and handled.'
	);
	assert.strictEqual(
		console.getLastMessage().getMessage(),
		'Container element is required.',
		"The `$containerElement` param is required."
	);

	cga = new CardGameApp($badContainerElement);
	assert.strictEqual(
		console.getLastMessage().instanceOf(TypeException),
		true,
		'Expected a `TypeException` to have been thrown and handled.'
	);
	assert.strictEqual(
		console.getLastMessage().getType(),
		'jQuery',
		"The expected type of the `$containerElement` param is `jQuery`."
	);

	cga = new CardGameApp($badContainerElementEmpty);
	assert.strictEqual(
		console.getLastMessage().instanceOf(CardGameException),
		true,
		'Expected a `CardGameException` to have been thrown and handled.'
	);
	assert.strictEqual(
		console.getLastMessage().getMessage(),
		'Specified element could not be found.',
		"The `$containerElement` param jQuery object cannot be empty."
	);

	cga = new CardGameApp($goodContainerElement);
	assert.strictEqual(
		console.getLastMessage().instanceOf(CardGameException),
		true,
		'Expected a `CardGameException` to have been thrown and handled.'
	);
	assert.strictEqual(
		console.getLastMessage().getMessage(),
		'List of games is required.',
		"The `games` param is required."
	);

	cga = new CardGameApp($goodContainerElement, badGames);
	assert.strictEqual(
		console.getLastMessage().instanceOf(TypeException),
		true,
		'Expected a `TypeException` to have been thrown and handled.'
	);
	assert.strictEqual(
		console.getLastMessage().getType(),
		'Array',
		"The expected type of the `games` param is `Array`."
	);

	cga = new CardGameApp($goodContainerElement, badGamesEmpty);
	assert.strictEqual(
		console.getLastMessage().instanceOf(CardGameException),
		true,
		'Expected a `CardGameException` to have been thrown and handled.'
	);
	assert.strictEqual(
		console.getLastMessage().getMessage(),
		'List of games cannot be empty.',
		"The `games` param Array cannot be empty."
	);

	cga = new CardGameApp($goodContainerElement, goodGames, badDebug);
	assert.strictEqual(
		console.getLastMessage().instanceOf(TypeException),
		true,
		'Expected a `TypeException` to have been thrown and handled.'
	);
	assert.strictEqual(
		console.getLastMessage().getType(),
		'Boolean',
		"The expected type of the optional `debug` param is `Boolean`."
	);
});

QUnit.test( "constructor success tests", function( assert ) {
	expect(6);

	// Using a test mock class this works.
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

	assert.strictEqual(
		console.getLastMessage().instanceOf(CardGameDebugMessage),
		true,
		'Expected a `CardGameDebugMessage` to have been logged.'
	);
	assert.strictEqual(
		console.getLastMessage().getMessage(),
		'Successfully loaded the game ' + goodGames[0],
		"Expected the logged `CardGameDebugMessage` to indicate the game was successfully loaded."
	);
	assert.strictEqual(
		console.getLastMessage().getCallingMethod(),
		'CardGameApp.__construct',
		"Expected the logged `CardGameDebugMessage` to have been logged from `CardGameApp.__construct()`."
	);
});

/** Set/Get methods **/
QUnit.test( "`__setAppView()` and `getAppView()` tests", function( assert ) {
	expect(3);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);
	good.__setAppView(null);
	assert.strictEqual(
		good.getAppView(),
		null,
		'Expected result of `getAppView()` to be null'
	);

	assert.throws(
		function() { good.__setAppView("bong"); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'AppView'
			);
		},
		"Expected that `appView` param is an AppView was not thrown!"
	);

	var goodAppView = new AppView($('<div></div>'));
	good.__setAppView(goodAppView);
	assert.strictEqual(
		good.getAppView(),
		goodAppView,
		'Expected the object returned from `getAppView()` to be the same one passed into `__setAppView()`.'
	);
});

QUnit.test( "`__setGameController()` and `getGameController()` tests", function( assert ) {
	expect(3);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);
	good.__setGameController(null);
	assert.strictEqual(
		good.getGameController(),
		null,
		'Expected result of `getGameController()` to be null'
	);

	assert.throws(
		function() { good.__setGameController("bong"); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'GameController'
			);
		},
		"Expected that `gameController` param is an GameController was not thrown!"
	);

	var goodGameController = new GameController('Test');
	good.__setGameController(goodGameController);
	assert.strictEqual(
		good.getGameController(),
		goodGameController,
		'Expected the object returned from `getGameController()` to be the same one passed into `__setGameController()`.'
	);
});

QUnit.test( "`__setRegisteredGames()` and `getGameController()` tests", function( assert ) {
	expect(2);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);

	assert.throws(
		function() { good.__setRegisteredGames("bong"); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Array'
			);
		},
		"Expected that `gameController` param is an Array was not thrown!"
	);

	good.__setRegisteredGames(goodGames);
	assert.strictEqual(
		good.getRegisteredGames(),
		goodGames,
		'Expected the array returned from `getRegisteredGames()` to be the same one passed into `__setRegisteredGames()`.'
	);
});

QUnit.test( "`__setLoadedGame()` and `getGameController()` tests", function( assert ) {
	expect(2);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);

	assert.throws(
		function() { good.__setLoadedGame([]); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'String'
			);
		},
		"Expected that `gameController` param is a String was not thrown!"
	);

	good.__setLoadedGame(goodGames[0]);
	assert.strictEqual(
		good.getLoadedGame(),
		goodGames[0],
		'Expected the string returned from `getLoadedGame()` to be the same one passed into `__setLoadedGame()`.'
	);
});

QUnit.test( "`__setDebug()` and `getDebug()` tests", function( assert ) {
	expect(2);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);

	assert.throws(
		function() { good.__setDebug(badDebug); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Boolean'
			);
		},
		"Expected that `debug` param is a Boolean was not thrown!"
	);

	good.__setDebug(goodDebug);
	assert.strictEqual(
		good.getDebug(),
		goodDebug,
		'Expected the Boolean returned from `getDebug()` to be the same one passed into `__setDebug()`.'
	);
});

/** Private method tests **/
QUnit.test( "`__registerGames()` tests", function( assert ) {
	expect(6);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);

	assert.throws(
		function() { good.__registerGames(badGamesEmpty); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === "None of the specified Games exist." &&
				e.getCallingMethod() === 'CardGameApp.__registerGames'
			);
		},
		"Expected that `debug` param is a Boolean was not thrown!"
	);

	assert.throws(
		function() { good.__registerGames(badGamesNonexistent); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === "None of the specified Games exist." &&
				e.getCallingMethod() === 'CardGameApp.__registerGames'
			);
		},
		"Expected that `debug` param is a Boolean was not thrown!"
	);

	good.__registerGames(goodGames);
	assert.strictEqual(
		good.getRegisteredGames().length,
		1,
		'Expected 1 game successfully registered.'
	);
	assert.strictEqual(
		good.getRegisteredGames()[0].gameName,
		goodGames[0],
		'Expected the `gameName` property of the only registered game to be "' + goodGames[0] + '".'
	);
	assert.strictEqual(
		good.getRegisteredGames()[0].gameRulesClass,
		TestRules,
		'Expected the `gameRulesClass` property of the only registered game to be "TestRules".'
	);
	assert.strictEqual(
		good.getRegisteredGames()[0].gameViewClass,
		TestView,
		'Expected the `gameViewClass` property of the only registered game to be "TestView".'
	);
});

QUnit.test( "`__initApplication()` tests", function( assert ) {
	expect(3);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);

	assert.throws(
		function() { good.__initApplication(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'View `$container` param is required.' &&
				e.getCallingMethod() === 'AppView.__construct'
			);
		},
		"Expected that `$containerElement` param is required was not thrown!"
	);

	assert.throws(
		function() { good.__initApplication($badContainerElement); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'jQuery'
			);
		},
		"Expected that `$containerElement` param is a jQuery was not thrown!"
	);

	good.__initApplication($('<div></div>'));
	assert.strictEqual(
		good.getAppView().instanceOf(AppView),
		true,
		'Expected the object returned from `getAppView()` to be an instance of AppView.'
	);
});

QUnit.test( "`__setApplicationEvents()` tests", function( assert ) {
	expect(3);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);
	good._appView = null;
	assert.throws(
		function() { good.__setApplicationEvents(); },
		function (e) {
			return (e.message.match(/getButtons/) !== null);
		},
		"Expected that `getButtons()` is an undefined method was not thrown!"
	);

	// Without calling the `__setApplicationEvents()` method yet, no events should be attached
	good.__initApplication($goodContainerElement.clone());
	var buttons = good.getAppView().getButtons();
	var startNewGameBtn = buttons.filter('[data-card-game-button="startNewGame"]');
	var resetGameBtn = buttons.filter('[data-card-game-button="restartCurrentGame"]');

	var startNewGameBtnEvents = $._data(startNewGameBtn, 'events');
	var resetGameBtnEvents = $._data(resetGameBtn, 'events');
	assert.ok(
		startNewGameBtnEvents === undefined,
		'Expected the `startNewGameBtn` jQuery button has no events attached.'
	);
	assert.ok(
		resetGameBtnEvents === undefined,
		'Expected the `resetGameBtn` jQuery button has no events attached.'
	);

	// Once the `__setApplicationEvents()` is called, events should exist.
	// Nothing happens yet when the user clicks the button.
	/*good.__setApplicationEvents();
	buttons = good.getAppView().getButtons();
	startNewGameBtn = buttons.filter('[data-card-game-button="startNewGame"]');
	startNewGameBtn.trigger('click');
	assert.ok(
		good.getAppView().getGameChoiceModal().css('display') !== 'none',
		'Expected the Game Choice Modal element to be displayed to the user.'
	);*/

	// Nothing happens yet when the user clicks the button.
	/*resetGameBtn = buttons.filter('[data-card-game-button="restartCurrentGame"]');
	resetGameBtn.trigger('click');
	assert.ok(
		good.getAppView().getGameChoiceModal().css('display') !== 'none',
		'Expected the Game Choice Modal element to be displayed to the user.'
	);*/
});

QUnit.test( "`__loadDefaultGame()` tests", function( assert ) {
	expect(3);

	// Using a test mock class this works.
	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);
	var canvasCtrlrSelector = 'div[data-card-game-view-element="canvas-container"]';
	assert.strictEqual(
		good.getAppView().getContainer().find(canvasCtrlrSelector).length,
		1,
		'Expected only one `div` with the `data-card-game-view-element` attribute equal to "canvas-container".'
	);

	good.__loadDefaultGame();
	assert.strictEqual(
		good.getAppView().getContainer().find(canvasCtrlrSelector).length,
		1,
		'Expected only one `div` with the `data-card-game-view-element` attribute equal to "canvas-container".'
	);
	assert.strictEqual(
		good.getLoadedGame(),
		goodGames[0],
		'Expected the loaded game name to be ' + goodGames[0] + '.'
	);
});

QUnit.test( "`__loadGame()` tests", function( assert ) {
	expect(7);

	// Using a test mock class this works.
	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);
	var canvasCtrlrSelector = 'div[data-card-game-view-element="canvas-container"]';
	assert.strictEqual(
		good.getAppView().getContainer().find(canvasCtrlrSelector).length,
		1,
		'Expected only one `div` with the `data-card-game-view-element` attribute equal to "canvas-container".'
	);

	// Expected failure since no "' + goodGames[1] + 'Rules" or 
	// "' + goodGames[1] + 'View" classes exist
	var gameNameLoaded = good.__loadGame(goodGames[1]);
	assert.strictEqual(
		gameNameLoaded,
		null,
		'Should have failed to load a new GameController and returned null'
	);

	// Expected success
	gameNameLoaded = good.__loadGame(goodGames[0]);
	assert.strictEqual(
		typeof good.__timer,
		'number',
		'Expected the `__timer` to be a number'
	);
	var timerContainerHTML = good.getAppView().getTimerContainer().html();
	assert.strictEqual(
		timerContainerHTML,
		':00',
		'Expected the first HTML of the timer container to be ":00"'
	);
	assert.strictEqual(
		good.getAppView().getContainer().find(canvasCtrlrSelector).length,
		1,
		'Expected only one `div` with the `data-card-game-view-element` attribute equal to "canvas-container".'
	);
	assert.strictEqual(
		gameNameLoaded,
		goodGames[0],
		'Expected the loaded game name returned to be "' + goodGames[0] + '".'
	);
	assert.strictEqual(
		good.getLoadedGame(),
		goodGames[0],
		'Expected the loaded game name to be "' + goodGames[0] + '".'
	);
});


QUnit.test( "`__startGameTimer()` tests", function( assert ) {
	expect(3);

	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);
	clearInterval(good.__timer);

	good.__startGameTimer();
	assert.strictEqual(
		typeof good.__timer,
		'number',
		'Expected the `__timer` to be a number'
	);

	var timerContainerHTML = good.getAppView().getTimerContainer().html();
	assert.strictEqual(
		timerContainerHTML,
		':00',
		'Expected the first HTML of the timer container to be ":00"'
	);

	QUnit.stop();
	setTimeout(function() {
		timerContainerHTML = good.getAppView().getTimerContainer().html();
		assert.strictEqual(
			timerContainerHTML,
			':05',
			'Expected the HTML of the timer container to be ":05" after 5 seconds'
		);
		QUnit.start();
	}, 5000);
});

QUnit.test( "`__addGameViewToAppView()` tests", function( assert ) {
	expect(2);

	// Using a test mock class this works.
	var good = new CardGameApp($goodContainerElement, goodGames, goodDebug);
	var canvasCtrlrSelector = 'div[data-card-game-view-element="canvas-container"]';
	assert.strictEqual(
		good.getAppView().getContainer().find(canvasCtrlrSelector).length,
		1,
		'Expected only one `div` with the `data-card-game-view-element` attribute equal to "canvas-container".'
	);

	good.__addGameViewToAppView();
	assert.strictEqual(
		good.getAppView().getContainer().find(canvasCtrlrSelector).length,
		1,
		'Expected only one `div` with the `data-card-game-view-element` attribute equal to "canvas-container".'
	);
});

/** Public method tests **/
QUnit.test( "`logConsoleDebugMessage()` tests", function( assert ) {
	expect(5);

	// Using a test mock class this works.
	var good = new CardGameApp($goodContainerElement, goodGames);

	// Expect nothing to happen
	var currentLoggedMessagesLength = console.loggedMessages.length;
	good.logConsoleDebugMessage();
	assert.strictEqual(
		console.loggedMessages.length,
		currentLoggedMessagesLength,
		'Expected no new messages logged yet since debug was false.'
	);

	// Set debug to true to actually log stuff.
	good.__setDebug(goodDebug);

	// Log a CardGameDebugMessage
	var cgdm = new CardGameDebugMessage(
		'Take a bong toke', 
		'__anonymous'
	);
	good.logConsoleDebugMessage(cgdm);

	assert.strictEqual(
		console.loggedMessages.length,
		currentLoggedMessagesLength + 1,
		'Expected 1 additional message logged.'
	);
	assert.strictEqual(
		console.getLastMessage(),
		cgdm,
		'Expected the `CardGameDebugMessage` `cgdm` to have been logged.'
	);

	// Log a string
	var str = "I smoke two joints...";
	good.logConsoleDebugMessage(str);
	assert.strictEqual(
		console.loggedMessages.length,
		currentLoggedMessagesLength + 2,
		'Expected 1 additional message logged.'
	);
	assert.strictEqual(
		console.getLastMessage(),
		str,
		'Expected the last message to be the supplied string.'
	);
});
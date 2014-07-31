// Unit tests for controllers/game-controller.js

var badGameName = {};
var badGameNameValue = "Unknown";
var goodGameName = "Test";

var badGameRules = "what";
var goodGameRules = new GameRules();

var badGameView = "what";
var goodGameView = new GameView([[]]);

var badStackModel = "bong";

var badCards = "plop";
var goodCards = $('<div></div>');

var st = new StackTypes();
var fd = new FanningDirectionSet();

/** 
 * Requires the extended classes which implement the required abstract classes' stuff.
 * Gotta do it this way until QUnit has mock objects. *shrug*
 */
var TestRules = Class({ extends : GameRules }, {
	_numDecksInGame : 2,
	_includeJokers : false,
	_acesHigh : false,
	_useTimer : true,
	_layout : [
		[ null, null, null, {
			stackType : st.inPlay,
			fanningDirection : fd.up,
			numCardsFacingDown : 5,
			numCardsFacingUp : 2
		},
		{
			stackType : st.dealer,
			fanningDirection : fd.none,
			numCardsFacingDown : 104,
			numCardsFacingUp : 0
		} ]
	],
	__construct : function() { this.super('__construct'); } 
});
var TestView = Class({ extends : GameView }, { __construct : function(stackModel) { this.super('__construct', stackModel); } });


/** Constructor tests **/
QUnit.test( "constructor failure tests", function( assert ) {
	expect(3);

	assert.throws(
		function() { var gc = new GameController(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `gameName` param is required.' &&
				e.getCallingMethod() === 'GameController.__construct'
			);
		},
		"Expected that `gameName` param is required was not thrown!"
	);

	assert.throws(
		function() { var gc = new GameController(badGameNameValue); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The expected game class "UnknownRules" does not exist.' &&
				e.getCallingMethod() === 'GameController.__loadGameRules'
			);
		},
		"Expected that a class by the name 'UnknownRules' doesn't exist was not thrown!"
	);

	assert.throws(
		function() { var gc = new GameController(badGameName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'String'
			);
		},
		"Expected that `gameName` param is a String was not thrown!"
	);

});

QUnit.test( "constructor success tests", function( assert ) {
	expect(1);

	var good = new GameController(goodGameName);
	assert.ok(
		good.instanceOf(GameController) === true,
		"Expected that the instantiated object is a `GameController` class."
	);
});

/** Set/Get methods **/
QUnit.test( "`__setGameName()` and `getGameName()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	assert.throws(
		function() { good.__setGameName(badGameName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'String'
			);
		},
		"Expected that `gameName` param is a String was not thrown!"
	);

	good.__setGameName(goodGameName);
	assert.strictEqual(
		good.getGameName(),
		goodGameName,
		'The String returned from `getGameName()` (' + 
			good.getGameName() + 
			') does not match the one passed into `__setGameName()` (' + 
			goodGameName + ').'
	);
});

QUnit.test( "`__setGameRules()` and `getGameRules()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	assert.throws(
		function() { good.__setGameRules(badGameRules); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'GameRules'
			);
		},
		"Expected that `gameName` param is a GameRules was not thrown!"
	);

	good.__setGameRules(goodGameRules);
	assert.strictEqual(
		good.getGameRules(),
		goodGameRules,
		'The GameRules returned from `getGameRules()` (' + 
			good.getGameRules() + 
			') does not match the one passed into `__setGameRules()` (' + 
			goodGameRules + ').'
	);
});

QUnit.test( "`__setGameView()` and `getGameView()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	assert.throws(
		function() { good.__setGameView(badGameRules); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'GameView'
			);
		},
		"Expected that `gameName` param is a GameView was not thrown!"
	);

	good.__setGameView(goodGameView);
	assert.strictEqual(
		good.getGameView(),
		goodGameView,
		'The GameView returned from `getGameView()` (' + 
			good.getGameView() + 
			') does not match the one passed into `__setGameView()` (' + 
			goodGameView + ').'
	);
});

QUnit.test( "`__setCards()` and `getCards()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	assert.throws(
		function() { good.__setCards(badCards); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'jQuery'
			);
		},
		"Expected that `$cards` param is a jQuery object was not thrown!"
	);

	good.__setCards(goodCards);
	assert.strictEqual(
		good.getCards(),
		goodCards,
		'The jQuery object returned from `getCards()` (' + 
			good.getCards() + 
			') does not match the one passed into `__setCards()` (' + 
			goodCards + ').'
	);
});

QUnit.test( "`__setCardsResetCopy()` and `getCardsResetCopy()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	assert.throws(
		function() { good.__setCardsResetCopy(badCards); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'jQuery'
			);
		},
		"Expected that `$cardsCopy` param is a jQuery object was not thrown!"
	);

	good.__setCardsResetCopy(goodCards);
	assert.strictEqual(
		good.getCardsResetCopy(),
		goodCards,
		'The jQuery object returned from `getCardsResetCopy()` (' + 
			good.getCardsResetCopy() + 
			') does not match the one passed into `__setCardsResetCopy()` (' + 
			goodCards + ').'
	);
});

/** Private method tests **/
QUnit.test( "`__loadGameRules()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	good.__setGameName(badGameNameValue);
	assert.throws(
		function() { good.__loadGameRules(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The expected game class "' + badGameNameValue + 'Rules" does not exist.' &&
				e.getCallingMethod() === 'GameController.__loadGameRules'
			);
		},
		"Expected that a class by the name 'TestRules' doesn't exist was not thrown!"
	);

	good.__setGameName(goodGameName);
	good.__loadGameRules();
	var gr = good.getGameRules();
	assert.ok(
		gr.instanceOf(TestRules) === true,
		'Expected the GameRules object generated to be an instance of the sub-class "' + goodGameName + 'Rules"' 
	);
});

QUnit.test( "`__loadGameView()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);

	good.__setGameName(badGameNameValue);
	assert.throws(
		function() { good.__loadGameView(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The expected game class "' + badGameNameValue + 'View" does not exist.' &&
				e.getCallingMethod() === 'GameController.__loadGameView'
			);
		},
		"Expected that a class by the name 'TestView' doesn't exist was not thrown!"
	);

	good.__setGameName(goodGameName);
	good.__loadGameView();
	var gv = good.getGameView();
	assert.ok(
		gv.instanceOf(TestView) === true,
		'Expected the GameView object generated to be an instance of the sub-class "' + goodGameName + 'View"' 
	);
});

QUnit.test( "`__shuffleCardArray()` tests", function( assert ) {
	expect(4);

	var good = new GameController(goodGameName);

	// Setup our base array
	var unsortedArr = [];
	for (var i = 1; i <= 20; i++) {
	    unsortedArr.push(i);
	}

	// Shuffle the cards once.
	var numDifferent = 0;
	var shuffledCards = good.__shuffleCardArray(unsortedArr);
	assert.strictEqual(
		shuffledCards.length,
		unsortedArr.length,
		'Expected the sorted and unsorted arrays to have the same length'
	);
	for (var j = 0; j < unsortedArr.length; j++) {
		if (shuffledCards[j] === unsortedArr[j]) {
			numDifferent++;
		}
	}
	assert.ok(
		numDifferent > 0,
		'Expected the order of the shuffled array to be different from the unsorted array'
	);

	// Shuffle 5 times.
	numDifferent = 0;
	unsortedArr.reverse(); // the __shuffleCardArray() method reverses the original
	shuffledCards = good.__shuffleCardArray(unsortedArr, 5);
	assert.strictEqual(
		shuffledCards.length,
		unsortedArr.length,
		'Expected the sorted and unsorted arrays to have the same length'
	);
	for (var k = 0; k < unsortedArr.length; k++) {
		if (shuffledCards[k] === unsortedArr[k]) {
			numDifferent++;
		}
	}
	assert.ok(
		numDifferent < shuffledCards.length,
		'Expected the order of the shuffled array to be different from the unsorted array'
	);
});

QUnit.test( "`__shuffleCards()` tests", function( assert ) {
	expect(3);

	var good = new GameController(goodGameName);
	var $unsortedCards = good.getCards();
	var unsortedCards = $unsortedCards.toArray();

	assert.strictEqual(
		unsortedCards.length,
		104,
		'EXpected there to be 104 cards in the unsortedCards array'
	);

	// shuffle the cards and check.
	var numDifferent = 0;
	good.__shuffleCards();
	// The `_cards` element returned from `getCards()` should have been modified.
	good.getCards().each(function(index, item) {
		if ($(item).attr('src') !== $unsortedCards.eq(index).attr('src')) {
			numDifferent++;
		}
	});

	assert.ok(
		numDifferent > 0,
		'Expected the order of the randomized set of cards to be different from the original set of cards'
	);

	// shuffle the cards 3 times and check again.
	numDifferent = 0;
	good.__shuffleCards(3);

	good.getCards().each(function(index, item) {
		if ($(item).attr('src') !== $unsortedCards.eq(index).attr('src')) {
			numDifferent++;
		}
	});

	assert.ok(
		numDifferent > 0,
		'Expected the order of the randomized set of cards to be different from the original set of cards'
	);
});

QUnit.test( "`__storeCopyOfCards()` tests", function( assert ) {
	expect(1);

	var good = new GameController(goodGameName);
	good._cardsResetCopy = null;

	good.__storeCopyOfCards();
	var numDifferent = 0;
	good.getCardsResetCopy().each(function(index, item) {
		if ($(item).attr('src') !== good.getCards().eq(index).attr('src')) {
			numDifferent++;
		}
	});
	assert.strictEqual(
		numDifferent,
		0,
		'Expected the copy of the cards to be the same as the original'
	);
});

QUnit.test( "`__stackCollectAllCards()` tests", function( assert ) {
	expect(5);

	var good = new GameController(goodGameName);

	good.__shuffleCards();
	good.__storeCopyOfCards();
	var numCards = good.getCards().length;
	var dealerStack = good.getGameRules().getDealerStack();
	var $dealerStackView = good.getGameView().getStackView(dealerStack);

	var $dealerStackCards = $dealerStackView
		.find('img').filter('[data-card-game-view-element="card"]');
	assert.strictEqual(
		$dealerStackCards.length,
		0,
		'Expected the dealer stack to have 0 cards at this point in time.'
	);

	// Make the call to the main function...
	good.__stackCollectAllCards(dealerStack);

	// ...and do test assertions.
	assert.strictEqual(
		good.getCards().length,
		104,
		'Expected 104 cards to still exist'
	);
	
	assert.strictEqual(
		$dealerStackView.length,
		1,
		'Expected only one element in the `$dealerStackView` jQuery object'
	);
	assert.strictEqual(
		$dealerStackView.attr('data-card-game-view-element'),
		'stack',
		'Expected the `data-card-game-view-element` attribute in the `$dealerStackView` jQuery object to have a value of "stack".'
	);
	$dealerStackCards = $dealerStackView
		.find('img').filter('[data-card-game-view-element="card"]');
	assert.strictEqual(
		$dealerStackCards.length,
		numCards,
		'Expected the dealer stack to have ' + numCards + ' cards at this point in time.'
	);
});

QUnit.test( "`__getNumCardsToDeal()` tests", function( assert ) {
	expect(1);

	var good = new GameController(goodGameName);
	var numCardsToDeal = 7;
	assert.strictEqual(
		good.__getNumCardsToDeal(),
		numCardsToDeal,
		'Expected the game to want to deal ' + numCardsToDeal + ' cards.'
	);
});

QUnit.test( "`__dealCards()` tests", function( assert ) {
	expect(3);

	var good = new GameController(goodGameName);

	good.__shuffleCards();
	good.__storeCopyOfCards();
	var numCards = good.getCards().length;
	var dealerStack = good.getGameRules().getDealerStack();
	good.__stackCollectAllCards(dealerStack);

	var $dealerStackView = good.getGameView().getStackView(dealerStack);
	var $dealerStackCards = $dealerStackView
		.find('img').filter('[data-card-game-view-element="card"]');
	assert.strictEqual(
		$dealerStackCards.length,
		numCards,
		'Expected the dealer stack to have ' + numCards + ' cards at this point in time.'
	);

	// Deal the cards and test for assertions.
	good.__dealCards();
	
	$dealerStackCards = $dealerStackView
		.find('img').filter('[data-card-game-view-element="card"]');
	assert.strictEqual(
		$dealerStackCards.length,
		numCards - good.__getNumCardsToDeal(),
		'Expected the dealer stack to have ' + (numCards - good.__getNumCardsToDeal()) + ' cards at this point in time.'
	);

	var inPlayStack = good.getGameRules().getStackModel()[0][3];
	var $inPlayStackView = good.getGameView().getStackView(inPlayStack);
	var $inPlayStackCards = $inPlayStackView
		.find('img').filter('[data-card-game-view-element="card"]');
	
	assert.strictEqual(
		$inPlayStackCards.length,
		good.__getNumCardsToDeal(),
		'Expected the only inPlay stack to have ' + good.__getNumCardsToDeal() + ' cards at this point in time.'
	);
});

/** Public method tests **/

QUnit.test( "`beginGamePlay()` tests", function( assert ) {
	expect(5);

	var good = new GameController(goodGameName);

	// gotta begin gameplay to ensure cards are dealt
	var begun = good.beginGamePlay();
	var numCards = good.getCards().length;

	var dealerStack = good.getGameRules().getDealerStack();
	var $dealerStackView = good.getGameView().getStackView(dealerStack);
	assert.strictEqual(
		$dealerStackView.length,
		1,
		'Expected only one element in the `$dealerStackView` jQuery object'
	);
	assert.strictEqual(
		$dealerStackView.attr('data-card-game-view-element'),
		'stack',
		'Expected the `data-card-game-view-element` attribute in the `$dealerStackView` jQuery object to have a value of "stack".'
	);
	var $dealerStackCards = $dealerStackView
		.find('img').filter('[data-card-game-view-element="card"]');
	assert.strictEqual(
		$dealerStackCards.length,
		numCards - good.__getNumCardsToDeal(),
		'Expected the dealer stack to have ' + (numCards - good.__getNumCardsToDeal()) + ' cards at this point in time.'
	);

	var inPlayStack = good.getGameRules().getStackModel()[0][3];
	var $inPlayStackView = good.getGameView().getStackView(inPlayStack);
	var $inPlayStackCards = $inPlayStackView
		.find('img').filter('[data-card-game-view-element="card"]');
	
	assert.strictEqual(
		$inPlayStackCards.length,
		good.__getNumCardsToDeal(),
		'Expected the only inPlay stack to have ' + good.__getNumCardsToDeal() + ' cards at this point in time.'
	);

	assert.ok(
		begun,
		'Expected the `success` return val from `beginGamePlay()` to be true'
	);
});

/** **/
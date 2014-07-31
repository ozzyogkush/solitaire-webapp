// Unit tests for views/game-view.js

var st = new StackTypes();
var fd = new FanningDirectionSet();

var goodStackModel = [
	[
		new Stack(
			st.dealer,
			fd.none,
			104,
			0
		),
		null,
		new Stack(
			st.inPlay,
			fd.down,
			0,
			1
		)
	]
];
var badStackModel = false;
var badStackModel2 = [];

var $goodContainer = $('<div></div>');
var $badContainer = "a string";
var $goodCard = $('<img />')
	.attr({
		src : "path/file",
		'data-card-game-view-element' : 'card',
		'data-card-face-showing' : 'front',
		'data-card-front-source' : "path/file",
		'data-card-back-source' : "path/file",
		'data-card-deck-num' : 2
	})
	.data({
		'suit' : { name : "bong" },
		'card-number' : { number : 5 }
	});

var $badCard = $('<img />')
	.attr({
		src : "path/file",
		'data-card-face-showing' : 'front',
		'data-card-front-source' : "path/file"
	});

/** Constructor tests **/
QUnit.test( "constructor failure tests", function( assert ) {
	expect(3);

	assert.throws(
		function() { var gv = new GameView(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `stackModel` array param is required.' &&
				e.getCallingMethod() === 'GameView.__construct'
			);
		},
		"Expected that `stackModel` param is required was not thrown!"
	);

	assert.throws(
		function() { var gv = new GameView(badStackModel); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Array'
			);
		},
		"Expected that `stackModel` param is an array was not thrown!"
	);

	assert.throws(
		function() { var gv = new GameView(badStackModel2); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'Expected `stackModel` param to have at least one row of stacks.' &&
				e.getCallingMethod() === 'GameView.__construct'
			);
		},
		"Expected that `stackModel` param has at least one row of stacks was not thrown!"
	);
});

QUnit.test( "constructor success tests", function( assert ) {
	expect(1);

	var good = new GameView(goodStackModel);
	assert.ok(
		good.instanceOf(GameView) === true,
		"Expected that the instantiated object is a `GameView` class."
	);
});

/** Set/Get methods **/
QUnit.test( "`__setGameContainer()` and `getGameContainer()` tests", function( assert ) {
	expect(2);

	assert.throws(
		function() { 
			var good = new GameView(goodStackModel);
			good.__setGameContainer($badContainer);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "jQuery"
			);
		},
		"Expected that `$gc` param must be a jQuery object was not thrown!"
	);

	var $gcClone = $goodContainer.clone();
	var good = new GameView(goodStackModel);
	good.__setGameContainer($gcClone);
	assert.strictEqual(
		good.getGameContainer(),
		$gcClone,
		"The jQuery element returned from `getGameContainer()` does not match the one passed into `__setGameContainer()`."
	);
});

/** Private method tests **/
QUnit.test( "`__createLayoutFromSpecs()` tests", function( assert ) {
	// This method assumes that the input is valid (a non-empty array or arrays of Stack objects).
	expect(5);

	var good = new GameView(goodStackModel);
	var $gameViewContainer = good.__createLayoutFromSpecs(goodStackModel);
	assert.ok(
		$gameViewContainer.prop('tagName').toLowerCase() === "div",
		'Expected the element type to be a "div".'
	);
	assert.strictEqual(
		$gameViewContainer.attr('data-card-game-view-element'),
		'canvas-container',
		'The `data-card-game-view-element` attribute of the top-level `div` should equal "canvas-container".'
	);

	$rows = $gameViewContainer.children('div[data-card-game-view-element="canvas-row"]');
	assert.strictEqual(
		$rows.length,
		goodStackModel.length,
		'Expected the top-level `div` to have ' + goodStackModel.length + ' rows with `data-card-game-view-element` attributes equal to "canvas-row".'
	);
	assert.strictEqual(
		$rows.eq(0).children('div[data-card-game-view-element="stack"]').length,
		goodStackModel[0].length,
		'Expected the first row of the top-level `div` to have ' + goodStackModel[0].length + ' rows.'
	);
	assert.strictEqual(
		$rows.eq(0).children('div[data-card-game-view-element="stack"]').eq(1)
			.data('stack'),
		"empty",
		'Expected the third element in the first row of the top-level `div` to have a `stack` data value of "empty".'
	);
});

QUnit.test( "`__isCard()` tests", function( assert ) {
	expect(2);

	var good = new GameView(goodStackModel);
	assert.ok(
		good.__isCard($badCard) === false,
		"Expected the `$badCard` element to cause the method to return false."
	);
	assert.ok(
		good.__isCard($goodCard),
		"Expected the `$goodCard` element to cause the method to return true."
	);
});

QUnit.test( "`__createCard()` tests", function( assert ) {
	expect(8);

	var ss = new SuitSet();
	var cns = new CardNumberSet();
	var spades = ss.spades;
	var ace = cns.ace;

	var good = new GameView(goodStackModel);
	var $card = good.__createCard(1, spades, ace);
	assert.ok(
		good.__isCard($card),
		"Expected `$card` to be a valid card."
	);

	var expectedSrc = "../img/cards/" + ace.getCardNumberName() + "_of_" + spades.getSuitName() + ".png";
	assert.ok(
		$card.prop('src').match(expectedSrc) !== null,
		'Expected the `src` property to equate to "' + expectedSrc + "'."
	);
	assert.strictEqual(
		$card.attr('data-card-game-view-element'),
		'card',
		'Expected the `data-card-game-view-element` attribute to equate to "card".'
	);
	assert.ok(
		$card.attr('data-card-front-source').match(expectedSrc) !== null,
		'Expected the `data-card-front-source` attribute to equate to "' + expectedSrc + '".'
	);
	assert.strictEqual(
		$card.attr('data-card-back-source'),
		'../img/cards/card_back.png',
		'Expected the `data-card-back-source` attribute to equate to "../img/cards/card_back.png".'
	);
	assert.strictEqual(
		parseInt($card.attr('data-card-deck-num')),
		1,
		'Expected the `data-card-deck-num` attribute to equate to 1".'
	);
	assert.strictEqual(
		$card.data('suit'),
		spades,
		'Expected the `data-card-game-suit` attribute to equate to "' + spades + '".'
	);
	assert.strictEqual(
		$card.data('card-number'),
		ace,
		'Expected the `data-card-game-card-number` attribute to equate to "' + ace + '".'
	);
});

QUnit.test( "`__createDeck()` tests", function( assert ) {
	expect(6);

	var good = new GameView(goodStackModel);
	var $deck = good.__createDeck(2, false, false);

	assert.strictEqual(
		$deck.length,
		52,
		'Expected 52 cards in the deck.'
	);

	$matchedCard = null;
	$deck.each(function() {
		var $card = $(this);
		if ($card.data('suit').getSuitName() === "spades" &&
			$card.data('card-number').getCardNumberName() === "ace") {
			$matchedCard = $card;
			return true;
		}
	});

	assert.ok(
		$matchedCard !== null,
		'Expected to find the Ace of Spades in the deck of cards'
	);
	assert.strictEqual(
		$matchedCard.data('card-number').getCardValue(),
		1,
		'Expected the Ace of Spades to have a CardNumber value of 1.'
	);

	// Aces High!
	$deck = good.__createDeck(3, true, false);

	assert.strictEqual(
		$deck.length,
		52,
		'Expected 52 cards in the deck.'
	);

	$matchedCard = null;
	$deck.each(function() {
		var $card = $(this);
		if ($card.data('suit').getSuitName() === "spades" &&
			$card.data('card-number').getCardNumberName() === "ace") {
			$matchedCard = $card;
			return true;
		}
	});

	assert.ok(
		$matchedCard !== null,
		'Expected to find the Ace of Spades in the deck of cards'
	);
	assert.strictEqual(
		$matchedCard.data('card-number').getCardValue(),
		14,
		'Expected the Ace of Spades to have a CardNumber value of 14 due to Aces High.'
	);
});

/** Public method tests **/
QUnit.test( "`createCards()` tests", function( assert ) {
	expect(10);

	var good = new GameView(goodStackModel);
	// Failure attempts
	assert.throws(
		function() { var $deck = good.createCards(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `numDecks` param is required.' &&
				e.getCallingMethod() === 'GameView.createCards'
			);
		},
		"Expected that `numDecks` param is required was not thrown!"
	);
	assert.throws(
		function() { var $deck = good.createCards({}); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Integer'
			);
		},
		"Expected that `numDecks` param is an Integer was not thrown!"
	);
	assert.throws(
		function() { var $deck = good.createCards(1); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `acesHigh` param is required.' &&
				e.getCallingMethod() === 'GameView.createCards'
			);
		},
		"Expected that `acesHigh` param is required was not thrown!"
	);
	assert.throws(
		function() { var $deck = good.createCards(1, {}); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Boolean'
			);
		},
		"Expected that `acesHigh` param is a Boolean was not thrown!"
	);
	assert.throws(
		function() { var $deck = good.createCards(1, true); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `includeJokers` param is required.' &&
				e.getCallingMethod() === 'GameView.createCards'
			);
		},
		"Expected that `includeJokers` param is required was not thrown!"
	);
	assert.throws(
		function() { var $deck = good.createCards(1, true, {}); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Boolean'
			);
		},
		"Expected that `includeJokers` param is a Boolean was not thrown!"
	);

	// Successful attempts
	var $deck = good.createCards(2, true, false);

	assert.ok(
		$deck.jquery !== undefined,
		'Expected the `$deck` to be a jQuery object'
	);

	assert.strictEqual(
		$deck.length,
		104,
		'Expected 104 cards in the deck.'
	);

	$matchedCard = null;
	$deck.each(function() {
		var $card = $(this);
		if ($card.data('suit').getSuitName() === "spades" &&
			$card.data('card-number').getCardNumberName() === "ace") {
			$matchedCard = $card;
			return true;
		}
	});

	assert.ok(
		$matchedCard !== null,
		'Expected to find the Ace of Spades in the deck of cards'
	);
	assert.strictEqual(
		$matchedCard.data('card-number').getCardValue(),
		14,
		'Expected the Ace of Spades to have a CardNumber value of 14 due to Aces High.'
	);
});

QUnit.test( "`flipCard()` tests", function( assert ) {
	expect(6);

	var ss = new SuitSet();
	var cns = new CardNumberSet();
	var spades = ss.spades;
	var ace = cns.ace;

	var good = new GameView(goodStackModel);
	var $card = good.__createCard(1, spades, ace);
	// Failure attempts
	assert.throws(
		function() { $card = good.flipCard(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `$card` param is required.' &&
				e.getCallingMethod() === 'GameView.flipCard'
			);
		},
		"Expected that `$card` param is required was not thrown!"
	);
	assert.throws(
		function() { $card = good.flipCard("notACard"); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `$card` param is not a valid Card.' &&
				e.getCallingMethod() === 'GameView.flipCard'
			);
		},
		"Expected that `card` param is a valid Card was not thrown!"
	);

	// Success attempts
	$card = good.flipCard($card);
	assert.strictEqual(
		$card.attr('data-card-face-showing'),
		'back',
		'Expected the `data-card-face-showing` attribute of the Card to equal "back".'
	);
	assert.ok(
		$card.attr('src').match($card.attr('data-card-back-source')) !== null,
		'Expected the `src` attribute of the Card to equal the value of the `data-card-back-source` attribute.'
	);

	$card = good.flipCard($card);
	assert.strictEqual(
		$card.attr('data-card-face-showing'),
		'front',
		'Expected the `data-card-face-showing` attribute of the Card to equal "front".'
	);
	assert.ok(
		$card.attr('src').match($card.attr('data-card-front-source')) !== null,
		'Expected the `src` attribute of the Card to equal the value of the `data-card-front-source` attribute.'
	);

});

QUnit.test( "`showCardBack()` tests", function( assert ) {
	expect(4);

	var ss = new SuitSet();
	var cns = new CardNumberSet();
	var spades = ss.spades;
	var ace = cns.ace;

	var good = new GameView(goodStackModel);
	var $card = good.__createCard(1, spades, ace);
	// Failure attempts
	assert.throws(
		function() { $card = good.showCardBack(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `$card` param is required.' &&
				e.getCallingMethod() === 'GameView.showCardBack'
			);
		},
		"Expected that `$card` param is required was not thrown!"
	);
	assert.throws(
		function() { $card = good.showCardBack("notACard"); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `$card` param is not a valid Card.' &&
				e.getCallingMethod() === 'GameView.showCardBack'
			);
		},
		"Expected that `card` param is a valid Card was not thrown!"
	);

	// Success attempts
	$card = good.showCardBack($card);
	assert.strictEqual(
		$card.attr('data-card-face-showing'),
		'back',
		'Expected the `data-card-face-showing` attribute of the Card to equal "back".'
	);
	assert.ok(
		$card.attr('src').match($card.attr('data-card-back-source')) !== null,
		'Expected the `src` attribute of the Card to equal the value of the `data-card-back-source` attribute.'
	);
});

QUnit.test( "`showCardFront()` tests", function( assert ) {
	expect(4);

	var ss = new SuitSet();
	var cns = new CardNumberSet();
	var spades = ss.spades;
	var ace = cns.ace;

	var good = new GameView(goodStackModel);
	var $card = good.__createCard(1, spades, ace);
	// Failure attempts
	assert.throws(
		function() { $card = good.showCardFront(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `$card` param is required.' &&
				e.getCallingMethod() === 'GameView.showCardFront'
			);
		},
		"Expected that `$card` param is required was not thrown!"
	);
	assert.throws(
		function() { $card = good.showCardFront("notACard"); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `$card` param is not a valid Card.' &&
				e.getCallingMethod() === 'GameView.showCardFront'
			);
		},
		"Expected that `card` param is a valid Card was not thrown!"
	);

	// Success attempts
	$card = good.showCardFront($card);
	assert.strictEqual(
		$card.attr('data-card-face-showing'),
		'front',
		'Expected the `data-card-face-showing` attribute of the Card to equal "front".'
	);
	assert.ok(
		$card.attr('src').match($card.attr('data-card-front-source')) !== null,
		'Expected the `src` attribute of the Card to equal the value of the `data-card-front-source` attribute.'
	);
});

QUnit.test("`getStackView()` tests", function( assert ) {
	expect(2);

	var good = new GameView(goodStackModel);
	var $goodStackView = good.getStackView(goodStackModel[0][0]);
	assert.strictEqual(
		$goodStackView.length,
		1,
		'Expected only one element in the `$goodStackView` jQuery object'
	);
	assert.strictEqual(
		$goodStackView.data('stack'),
		goodStackModel[0][0],
		'Expected the `stack` data in the `$goodStackView` jQuery object to be the one passed into `getStackView()`.'
	);
});

QUnit.test("`emptyStackView()` tests", function( assert ) {
	//expect(2);

	var good = new GameView(goodStackModel);
	good.getGameContainer()
		.find('div[data-card-game-view-element="stack"]')
		.append($('<div></div>').text('A bunch of text'));

	assert.strictEqual(
		good.getStackView(goodStackModel[0][0]).children('div').eq(0).text(),
		'A bunch of text',
		'Expected the first Stacks View object to have a div with some text'
	);

	good.emptyStackView(goodStackModel[0][0]);
	assert.strictEqual(
		good.getStackView(goodStackModel[0][0]).children().length,
		0,
		'Expected all the children of the first Stacks View object to be deleted'
	);
});
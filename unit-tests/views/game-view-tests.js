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

var badImgDir = { a : "b" };
var badImgDirEmpty = "";
var goodImgDir = '../../devbuild/img/cards';

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
	expect(6);

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
		function() { var gv = new GameView(badStackModel, goodImgDir); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Array'
			);
		},
		"Expected that `stackModel` param is an array was not thrown!"
	);

	assert.throws(
		function() { var gv = new GameView(badStackModel2, goodImgDir); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'Expected `stackModel` param to have at least one row of stacks.' &&
				e.getCallingMethod() === 'GameView.__construct'
			);
		},
		"Expected that `stackModel` param has at least one row of stacks was not thrown!"
	);

	assert.throws(
		function() { var gv = new GameView(goodStackModel); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `imageDir` param is required.' &&
				e.getCallingMethod() === 'GameView.__construct'
			);
		},
		"Expected that `imageDir` param is required was not thrown!"
	);

	assert.throws(
		function() { var gv = new GameView(goodStackModel, badImgDir); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'String'
			);
		},
		"Expected that `imageDir` param is a String was not thrown!"
	);

	assert.throws(
		function() { var gv = new GameView(goodStackModel, badImgDirEmpty); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `imageDir` string must not be empty.' &&
				e.getCallingMethod() === 'GameView.__construct'
			);
		},
		"Expected that `imageDir` param is not empty was not thrown!"
	);
});

QUnit.test( "constructor success tests", function( assert ) {
	expect(2);

	var good = new GameView(goodStackModel, goodImgDir);
	assert.ok(
		good.instanceOf(GameView) === true,
		"Expected that the instantiated object is a `GameView` class."
	);
	assert.ok(
		good.instanceOf(IViewRules) === true,
		"Expected that the instantiated object is a `IViewRules` interface."
	);
});

/** Set/Get methods **/
QUnit.test( "`__setGameContainer()` and `getGameContainer()` tests", function( assert ) {
	expect(2);

	assert.throws(
		function() { 
			var good = new GameView(goodStackModel, goodImgDir);
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
	var good = new GameView(goodStackModel, goodImgDir);
	good.__setGameContainer($gcClone);
	assert.strictEqual(
		good.getGameContainer(),
		$gcClone,
		"The jQuery element returned from `getGameContainer()` does not match the one passed into `__setGameContainer()`."
	);
});

QUnit.test( "`__setImageDir()` and `getImageDir()` tests", function( assert ) {
	expect(2);

	var good = new GameView(goodStackModel, goodImgDir);

	assert.throws(
		function() { good.__setImageDir(badImgDir); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'String'
			);
		},
		"Expected that `dir` param is a String was not thrown!"
	);

	good.__setImageDir(goodImgDir);
	assert.strictEqual(
		good.getImageDir(),
		goodImgDir + "/",
		'Expected the String returned from `getImageDir()` to be the same one passed into `__setImageDir()` plus a trailing "/" character.'
	);
});

/** Private method tests **/
QUnit.test( "`__createLayoutFromSpecs()` tests", function( assert ) {
	// This method assumes that the input is valid (a non-empty array or arrays of Stack objects).
	expect(6);

	var good = new GameView(goodStackModel, goodImgDir);
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
		$rows.eq(0)
			.children('div[data-card-game-view-element="stack"]').eq(0)
			.children('div[data-card-game-view-element="card-container"]')
				.length,
		1,
		'Expected the first row of the top-level `div` to have 1 child `div` with an `data-card-game-view-element` attribute equal to "card-container".'
	);
	assert.strictEqual(
		$rows.eq(0).children('div[data-card-game-view-element="stack"]').eq(1)
			.data('stack'),
		"empty",
		'Expected the third element in the first row of the top-level `div` to have a `stack` data value of "empty".'
	);
});

QUnit.test( "`__createStackView()` tests", function( assert ) {
	expect(10);

	var good = new GameView(goodStackModel, goodImgDir);
	var $stackView = null;
	assert.throws(
		function() { $stackView = good.__createStackView("a string"); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'Stack'
			);
		},
		"Expected that `stack` param is a Stack was not thrown!"
	);

	// No Stack...
	$stackView = good.__createStackView();
	assert.strictEqual(
		$stackView.hasClass('fan-none'),
		true,
		'Expected a class name of "fan-none".'
	);
	assert.strictEqual(
		$stackView.hasClass('empty'),
		true,
		'Expected an extra class name of "empty".'
	);
	assert.strictEqual(
		$stackView.attr('data-card-game-view-element'),
		"stack",
		'Expected the `data-card-game-view-element` attribute to equal "stack".'
	);
	assert.strictEqual(
		$stackView.children('div[data-card-game-view-element="card-container"]').length,
		1,
		'Expected the stack view to have one child `div` element with its `data-card-game-view-element` attribute to equal "card-container".'
	);
	assert.strictEqual(
		$stackView.data('stack'),
		"empty",
		'Expected the stack data to be "empty".'
	);

	// A Stack...
	$stackView = good.__createStackView(goodStackModel[0][2]);
	assert.strictEqual(
		$stackView.hasClass('fan-down'),
		true,
		'Expected a class name of "fan-down".'
	);
	assert.strictEqual(
		$stackView.attr('data-card-game-view-element'),
		"stack",
		'Expected the `data-card-game-view-element` attribute to equal "stack".'
	);
	assert.strictEqual(
		$stackView.children('div[data-card-game-view-element="card-container"]').length,
		1,
		'Expected the stack view to have one child `div` element with its `data-card-game-view-element` attribute to equal "card-container".'
	);
	assert.strictEqual(
		$stackView.data('stack'),
		goodStackModel[0][2],
		'Expected the stack data to be the same as the last one of the second row in the `goodStackModel`.'
	);
});

QUnit.test( "`__isCard()` tests", function( assert ) {
	expect(2);

	var good = new GameView(goodStackModel, goodImgDir);
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

	var good = new GameView(goodStackModel, goodImgDir);
	var $card = good.__createCard(1, spades, ace);
	assert.ok(
		good.__isCard($card),
		"Expected `$card` to be a valid card."
	);

	var expectedSrc = goodImgDir + "/" + ace.getCardNumberName() + "_of_" + spades.getSuitName() + ".png";
	assert.strictEqual(
		$card.attr('src'),
		expectedSrc,
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
		goodImgDir + '/card_back.png',
		'Expected the `data-card-back-source` attribute to equate to "' + goodImgDir + '/card_back.png".'
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

	var good = new GameView(goodStackModel, goodImgDir);
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

	var good = new GameView(goodStackModel, goodImgDir);
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

	var good = new GameView(goodStackModel, goodImgDir);
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

	var good = new GameView(goodStackModel, goodImgDir);
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

	var good = new GameView(goodStackModel, goodImgDir);
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
	expect(3);

	var good = new GameView(goodStackModel, goodImgDir);
	assert.throws(
		function() { var $goodStackView = good.getStackView(null); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'No Stack View could be found for the supplied Stack object.' &&
				e.getCallingMethod() === 'GameView.getStackView'
			);
		},
		"Expected that no Stack View could be found was not thrown!"
	);

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

QUnit.test("`getStackViewFromCoords()` tests", function( assert ) {
	expect(5);

	var good = new GameView(goodStackModel, goodImgDir);
	var $stackView = good.getStackViewFromCoords(5, 5);
	assert.strictEqual(
		$stackView,
		null,
		'Expected the `$stackView` object to be null'
	);

	var $goodStackView = good.getStackView(goodStackModel[0][0]);
	$goodStackView.css({
		position : 'absolute',
		top : '50px',
		left : '50px',
		width : '100px',
		height : '100px'
	});
	$stackView = good.getStackViewFromCoords(100, 100);
	assert.ok(
		$stackView !== null && $stackView.jquery !== undefined,
		'Expected the `$stackView` object to be a jQuery element'
	);
	assert.strictEqual(
		$stackView.length,
		1,
		'Expected only one element in the `$stackView` object.'
	);
	assert.strictEqual(
		$stackView.get(0),
		$goodStackView.get(0),
		'Expected the `$stackView` object found in `getStackViewFromCoords()` to match the one found by `getStackView()`'
	);
	assert.strictEqual(
		$stackView.data('stack'),
		goodStackModel[0][0],
		'Expected the `stack` data in the `$stackView` object to be the first one in the first row of the `goodStackModel` object.'
	);
});

QUnit.test("`emptyStackView()` tests", function( assert ) {
	expect(2);

	var good = new GameView(goodStackModel, goodImgDir);
	var $someCards = good.createCards(1, false, false);
	good.getGameContainer()
		.find('div[data-card-game-view-element="card-container"]')
		.append($someCards);

	assert.strictEqual(
		good.getStackView(goodStackModel[0][0])
			.children('div[data-card-game-view-element="card-container"]')
			.children('img[data-card-game-view-element="card"]')
			.length,
		52,
		'Expected the first Stack View\'s card container to have 52 cards'
	);

	good.emptyStackView(goodStackModel[0][0]);
	assert.strictEqual(
		good.getStackView(goodStackModel[0][0]).children('div[data-card-game-view-element="card-container"]').children().length,
		0,
		'Expected all the children of the first Stacks View\'s card container to be deleted'
	);
});

/** Event Handlers **/
QUnit.test("`mouseDownTouchStartEventHandler()` tests", function( assert ) {
	expect(3);

	var good = new GameView(goodStackModel, goodImgDir);
	good.getGameContainer()
		.on(
			'mousedown touchstart',
			{ rules : new GameRules() },
			$.proxy(
				good.mouseDownTouchStartEventHandler,
				good
			)
		);

	var $stackView = good.getStackView(goodStackModel[0][0]);
	var $card = $goodCard.clone(true, true);

	$card.appendTo(
		$stackView.children('div[data-card-game-view-element="card-container"]')
	);
	assert.strictEqual(
		$stackView.find('img[data-card-game-view-element="card"]').length,
		1,
		'Expected the StackView to have one card in it.'
	);

	// Trigger the `mousedown` event
	$card.trigger('mousedown');

	var $movingStack = good
		.getGameContainer()
			.find('div[data-card-game-view-element="stack"]')
			.filter('.moving');
	assert.strictEqual(
		$movingStack.length,
		1,
		'Expected one moving Stack View in the DOM.'
	);
	assert.strictEqual(
		$movingStack.find($card).length,
		1,
		'Expected to find the specified card in the moving stack'
	);
});

QUnit.test("`mouseUpTouchEndEventHandler()` tests", function( assert ) {
	expect(5);

	var good = new GameView(goodStackModel, goodImgDir);
	good.getGameContainer()
		.on(
			'mousedown touchstart',
			{ rules : new GameRules() },
			$.proxy(
				good.mouseDownTouchStartEventHandler,
				good
			)
		);

	var $stackView = good.getStackView(goodStackModel[0][0]);
	$stackView.css({
		position : 'absolute',
		top : '50px',
		left : '50px',
		width : '100px',
		height : '100px'
	});
	var $card = $goodCard.clone(true, true);

	$card.appendTo(
		$stackView.children('div[data-card-game-view-element="card-container"]')
	);
	assert.strictEqual(
		$stackView.find('img[data-card-game-view-element="card"]').length,
		1,
		'Expected the StackView to have one card in it.'
	);

	// Trigger the `mousedown` event
	$card.trigger('mousedown');

	var $movingStack = good
			.getGameContainer()
				.find('div[data-card-game-view-element="stack"]')
				.filter('.moving');
	assert.strictEqual(
		$movingStack.length,
		1,
		'Expected one moving Stack View in the DOM.'
	);
	assert.strictEqual(
		$stackView.find('img[data-card-game-view-element="card"]').length,
		0,
		'Expected the StackView to have one card in it.'
	);

	// Trigger the `mouseup` event
	var muEvent = jQuery.Event('mouseup', {
		pageX : 100,
		pageY : 100
	});
	$card.trigger(muEvent);
	$movingStack = good
		.getGameContainer()
			.find('div[data-card-game-view-element="stack"]')
			.filter('.moving');
	assert.strictEqual(
		$movingStack.length,
		0,
		'Expected no moving Stack Views in the DOM.'
	);
	assert.strictEqual(
		$stackView.find('img[data-card-game-view-element="card"]').length,
		1,
		'Expected the StackView to have one card in it.'
	);
});

QUnit.test("`mouseMoveTouchMoveEventHandler()` tests", function( assert ) {
	expect(5);
	var cssStackProps = {
		position : 'absolute',
		top : '50px',
		left : '50px',
		width : '100px',
		height : '100px'
	};

	var good = new GameView(goodStackModel, goodImgDir);
	good.getGameContainer()
		.css(cssStackProps)
		.css({
			position : 'relative',
			width : '400px',
			height : '400px'
		})
		.on(
			'mousedown touchstart',
			{ rules : new GameRules() },
			$.proxy(
				good.mouseDownTouchStartEventHandler,
				good
			)
		);

	var $stackView = good.getStackView(goodStackModel[0][0]);
	$stackView.css(cssStackProps);
	var $card = $goodCard.clone(true, true);

	$card.appendTo(
		$stackView.children('div[data-card-game-view-element="card-container"]')
	);
	assert.strictEqual(
		$stackView.find('img[data-card-game-view-element="card"]').length,
		1,
		'Expected the StackView to have one card in it.'
	);

	// Trigger the `mousedown` event
	$card.trigger('mousedown');

	var $movingStack = good
			.getGameContainer()
				.find('div[data-card-game-view-element="stack"]')
				.filter('.moving');
	assert.strictEqual(
		$movingStack.length,
		1,
		'Expected one moving Stack View in the DOM.'
	);
	assert.strictEqual(
		$stackView.find('img[data-card-game-view-element="card"]').length,
		0,
		'Expected the StackView to have one card in it.'
	);

	$movingStack.css(cssStackProps);

	// Trigger the `mousemove` event
	var baseLeft = 110;
	var baseTop = 110;
	var mmEvent = jQuery.Event('mousemove', {
		pageX : baseLeft,
		pageY : baseTop,
		target : $card.get(0)
	});
	good.getGameContainer().trigger(mmEvent);
	assert.strictEqual(
		$movingStack.css('left'),
		(baseLeft - ($movingStack.width() / 2)) + 'px',
		'The roving stacks css `left` property does not equal the expected value.'
	);
	assert.strictEqual(
		$movingStack.css('top'),
		(baseTop - good.getGameContainer().offset().top - 5) + 'px',
		'The roving stacks css `top` property does not equal the expected value.'
	);
});

QUnit.test("`mouseClickEventHandler()` tests", function( assert ) {
	//expect(3);

	var good = new GameView(goodStackModel, goodImgDir);
	good.getGameContainer()
		.on(
			'click',
			{ rules : new GameRules() },
			$.proxy(
				good.mouseClickEventHandler,
				good
			)
		);

	var $stackView = good.getStackView(goodStackModel[0][0]);
	var $card = $goodCard.clone(true, true);

	assert.ok(true, 'bong');
});
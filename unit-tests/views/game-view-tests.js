// Unit tests for view/game-view.js

var $goodContainer = $('<div></div>');
var badContainer = "a string";
var badButtons = "a string";

/** Constructor tests **/
QUnit.test( "constructor failure tests", function( assert ) {
	expect(2);

	assert.throws(
		function() { var gv = new GameView(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'View `$container` param is required.' &&
				e.getCallingMethod() === 'GameView.__construct'
			);
		},
		"Expected that `$container` param is required has passed!"
	);

	assert.throws(
		function () { var gv = new GameView(badContainer); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "jQuery"
			);
		},
		"Expected that `$container` param must be a jQuery object has passed!"
	);
});

QUnit.test( "constructor successful tests", function( assert ) {
	expect(1);

	var good = new GameView($goodContainer.clone());
	assert.ok(
		good.instanceOf(GameView) === true,
		"Expected that the instantiated object is a `GameView` class."
	);
});

/** Set/Get methods **/
QUnit.test( "`__setContainer()` and `getContainer()` tests", function( assert ) {
	expect(2);

	assert.throws(
		function() { 
			var good = new GameView($goodContainer.clone());
			good.__setContainer(badContainer);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "jQuery"
			);
		},
		"Expected that `$container` param must be a jQuery object has passed!"
	);

	var $gcClone = $goodContainer.clone();
	var good = new GameView($gcClone);
	good.__setContainer($gcClone);
	assert.strictEqual(
		good.getContainer(),
		$gcClone,
		"The jQuery element returned from `getContainer()` does not match the one passed into `__setContainer()`."
	);
});

QUnit.test( "`__setButtons()` and `getButtons()` tests", function( assert ) {
	expect(7);

	// Bad type
	assert.throws(
		function() { 
			var good = new GameView($goodContainer.clone());
			good.__setButtons(badButtons);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "jQuery"
			);
		},
		"Expected that `$btns` param must be a jQuery object has passed!"
	);

	// Correct type
	var good = new GameView($goodContainer.clone());
	var $goodButtons = $('<button></button>')
		.prop('id', 'tb1')
		.add(
			$('<button></button>')
				.prop('id', 'tb2')
		);
	good.__setButtons($goodButtons);
	var $buttonContainer = good.getContainer().children().eq(0);

	assert.strictEqual(
		$buttonContainer.length,
		1,
		"Expected the `$buttonContainer` object to contain a single `div` element"
	);
	assert.strictEqual(
		$buttonContainer.attr('data-card-game-view-element'),
		"button-container",
		"The first element in the `$buttons` object should have a 'data-card-game-view-element' attribute equal to 'button-container'."
	);
	assert.ok(
		(
			$buttonContainer.children().eq(0).prop('id') === 'tb1' &&
			$buttonContainer.children().eq(1).prop('id') === 'tb2'
		),
		"The `$buttonContainer` should contain the supplied `$goodButtons` as children in the DOM."
	);
	assert.strictEqual(
		good.getButtons(),
		$goodButtons,
		"The jQuery element returned from `getButtons()` does not match the one passed into `__setButtons()`."
	);

	// null button set
	good.__setButtons(null);
	$buttonContainer = good
		.getContainer()
		.find(
			'div[data-card-game-view-element="button-container"]'
		);

	assert.strictEqual(
		$buttonContainer.length,
		0,
		"Expected the `$buttonContainer` object to be empty"
	);
	assert.strictEqual(
		good.getButtons(),
		null,
		"The jQuery element returned from `getButtons()` should be null."
	);
});

QUnit.test( "`__setGameChoiceModal()` and `getGameChoiceModal()` tests", function( assert ) {
	expect(6);

	// Bad type
	assert.throws(
		function() { 
			var badModal = "a string";
			var good = new GameView($goodContainer.clone());
			good.__setGameChoiceModal(badModal);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "jQuery"
			);
		},
		"Expected that `$gcm` param must be a jQuery object has passed!"
	);

	// Correct type
	var good = new GameView($goodContainer.clone());
	var $goodModal = $('<div></div>').prop('id', 'testmodal');
	good.__setGameChoiceModal($goodModal);
	var $modal = good.getContainer().children().last();

	assert.strictEqual(
		$modal.length,
		1,
		"Expected the `getContainer().children()`s last element to be a single `div` element"
	);
	assert.ok(
		$modal.prop('id') === 'testmodal',
		"The `$modal` should have an ID of `testmodal`."
	);
	assert.strictEqual(
		good.getGameChoiceModal(),
		$goodModal,
		"The jQuery element returned from `getGameChoiceModal()` does not match the one passed into `__setGameChoiceModal()`."
	);

	// null button set
	good.__setGameChoiceModal(null);
	$modal = good
		.getContainer()
		.find(
			'div[data-card-game-view-element="game-choice-modal"]'
		);

	assert.strictEqual(
		$modal.length,
		0,
		"Expected the `$modal` object to be empty"
	);
	assert.strictEqual(
		good.getGameChoiceModal(),
		null,
		"The jQuery element returned from `getGameChoiceModal()` should be null."
	);
});

QUnit.test( "`__setPluginCanvas()` and `getPluginCanvas()` tests", function( assert ) {
	expect(5);

	// Bad type
	assert.throws(
		function() { 
			var badCvs = "a string";
			var good = new GameView($goodContainer.clone());
			good.__setPluginCanvas(badCvs);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "PluginView"
			);
		},
		"Expected that `cvs` param must be a PluginView object has passed!"
	);

	// Correct type
	var good = new GameView($goodContainer.clone());
	// @TODO - abstract PluginView class should not be able to be instantiated; 
	// instead, mock an implemented subclass here (which implements 'missing' 
	// methods) and use that pattern from now on where appropriate.
	var goodCanvas = new PluginView();
	goodCanvas.__setDOMElements($('<div></div>').prop('id', 'test-plugin-canvas'));
	good.__setPluginCanvas(goodCanvas);
	var $testPluginCanvasDiv = good.getGameChoiceModal().prev('div');
	assert.strictEqual(
		//good.getContainer().children().filter('#test-plugin-canvas').length,
		$testPluginCanvasDiv.prop('id'),
		'test-plugin-canvas',
		"Expected a `div` with ID 'test-plugin-canvas' to be in the DOM before the modal element returned by `getGameChoiceModal()`."
	);
	assert.strictEqual(
		good.getPluginCanvas(),
		goodCanvas,
		'The PluginView returned from `getPluginCanvas()` does not match the one passed into `__setPluginCanvas()`.'
	);

	// null button set
	good.__setPluginCanvas(null);
	$pluginCanvasDOM = good
		.getContainer()
		.find(
			goodCanvas.getDOMElements()
		);

	assert.strictEqual(
		$pluginCanvasDOM.length,
		0,
		"Expected the `$pluginCanvasDOM` object to be empty"
	);
	assert.strictEqual(
		good.getPluginCanvas(),
		null,
		"The jQuery element returned from `getPluginCanvas()` should be null."
	);
});

/** Private method tests **/
QUnit.test( "__createButtonAddEventHandler() tests", function( assert ) {
	expect(18);

	var goodDataCardGameButton = "some string";
	var badDataCardGameButton = {};
	var goodButtonText = "some text";
	var badButtonText = {};
	var goodEventHandler = function(event) { $(this).data('goodEventHandlerRun', true); };
	var badEventHandler = "oops";

	var good = new GameView($goodContainer.clone());
	assert.throws(
		function() { 
			$btn = good.__createButtonAddEventHandler();
		},
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `dataCardGameButton` param is required.' &&
				e.getCallingMethod() === 'GameView.__createButtonAddEventHandler'
			);
		},
		"Expected a thrown `CardGameException` stating that the `dataCardGameButton` param is required."
	);

	assert.throws(
		function() {
			$btn = good.__createButtonAddEventHandler(goodDataCardGameButton);
		},
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `buttonText` param is required.' &&
				e.getCallingMethod() === 'GameView.__createButtonAddEventHandler'
			);
		},
		"Expected a thrown `CardGameException` stating that the `buttonText` param is required."
	);

	assert.throws(
		function() {
			$btn = good.__createButtonAddEventHandler(badDataCardGameButton, goodButtonText);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected a thrown `TypeException` stating that expected type is a 'string'."
	);

	assert.throws(
		function() {
			$btn = good.__createButtonAddEventHandler(goodDataCardGameButton, badButtonText);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "string"
			);
		},
		"Expected a thrown `TypeException` stating that expected type is a 'string'."
	);

	// Successfully create the button
	var $goodBtn = good.__createButtonAddEventHandler(goodDataCardGameButton, goodButtonText);
	assert.ok(
		$goodBtn.jquery !== undefined,
		"The `$goodBtn` object is not a jQuery object."
	);
	assert.strictEqual(
		$goodBtn.length,
		1,
		"The `$goodBtn` jQuery object should have 1 button element."
	);
	assert.strictEqual(
		$goodBtn.attr('data-card-game-button'),
		goodDataCardGameButton,
		"The `$goodBtn` object should have a 'data-card-game-button' attribute equal to '" + goodDataCardGameButton + "'."
	);
	assert.strictEqual(
		$goodBtn.text(),
		goodButtonText,
		"The `.text()` method on the `$goodBtn` object should return '" + goodButtonText + "'."
	);

	// Successfully create the button, with a bad event handler function
	var $goodBtn2 = good.__createButtonAddEventHandler(
		goodDataCardGameButton, 
		goodButtonText, 
		badEventHandler
	);
	assert.ok(
		$goodBtn2.jquery !== undefined,
		"The `$goodBtn2` object is not a jQuery object."
	);
	assert.strictEqual(
		$goodBtn2.length,
		1,
		"The `$goodBtn2` jQuery object should have 1 button element."
	);
	assert.strictEqual(
		$goodBtn2.attr('data-card-game-button'),
		goodDataCardGameButton,
		"The `$goodBtn2` object should have a 'data-card-game-button' attribute equal to '" + goodDataCardGameButton + "'."
	);
	assert.strictEqual(
		$goodBtn2.text(),
		goodButtonText,
		"The `.text()` method on the `$goodBtn2` object should return '" + goodButtonText + "'."
	);

	$goodBtn2.trigger('click');
	assert.ok(
		$goodBtn2.data('goodEventHandlerRun') === undefined,
		"A `click` event handler function was run when it should not have."
	);

	// Successfully create the button, with a good event handler function
	var $goodBtn3 = good.__createButtonAddEventHandler(
		goodDataCardGameButton, 
		goodButtonText, 
		goodEventHandler
	);
	assert.ok(
		$goodBtn3.jquery !== undefined,
		"The `$goodBtn3` object is not a jQuery object."
	);
	assert.strictEqual(
		$goodBtn3.length,
		1,
		"The `$goodBtn3` jQuery object should have 1 button element."
	);
	assert.strictEqual(
		$goodBtn3.attr('data-card-game-button'),
		goodDataCardGameButton,
		"The `$goodBtn3` object should have a 'data-card-game-button' attribute equal to '" + goodDataCardGameButton + "'."
	);
	assert.strictEqual(
		$goodBtn3.text(),
		goodButtonText,
		"The `.text()` method on the `$goodBtn3` object should return '" + goodButtonText + "'."
	);

	$goodBtn3.trigger('click');
	assert.ok(
		$goodBtn3.data('goodEventHandlerRun') === true,
		"The expected function event handler was not run when the `click` event was triggered."
	);
});

QUnit.test( "__createButtons() tests", function( assert ) {
	expect(4);

	var good = new GameView($goodContainer.clone());
	var $buttons = good.__createButtons();

	assert.ok(
		$buttons.jquery !== undefined,
		"The `$buttons` object is not a jQuery object."
	);

	assert.strictEqual(
		$buttons.length,
		2,
		"The `$buttons` jQuery object should have 2 button elements."
	);

	assert.strictEqual(
		$buttons.eq(0).attr('data-card-game-button'),
		"startNewGame",
		"The first element in the `$buttons` object should have a 'data-card-game-button' attribute equal to 'startNewGame'."
	);

	assert.strictEqual(
		$buttons.eq(1).attr('data-card-game-button'),
		"restartCurrentGame",
		"The second element in the `$buttons` object should have a 'data-card-game-button' attribute equal to 'restartCurrentGame'."
	);
});

QUnit.test( "__createGameChoiceModal() tests", function( assert ) {
	expect(3);

	var good = new GameView($goodContainer.clone());
	var $modal = good.__createGameChoiceModal();

	assert.ok(
		$modal.jquery !== undefined,
		"The `$modal` object is not a jQuery object."
	);

	assert.strictEqual(
		$modal.length,
		1,
		"The `$modal` jQuery object should have 1 div element."
	);

	assert.strictEqual(
		$modal.attr('data-card-game-view-element'),
		"game-choice-modal",
		"The first element in the `$buttons` object should have a 'data-card-game-view-element' attribute equal to 'game-choice-modal'."
	);

	// @TODO - add tests here for children/grandchildren element inside
	// the $modal DOM.
});

QUnit.test( "`__initLayout()` tests", function( assert ) {
	expect(12);

	assert.throws(
		function() { 
			var good = new GameView($goodContainer.clone());
			good.__initLayout(badContainer);
		},
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === "jQuery"
			);
		},
		"Expected that `$container` param must be a jQuery object has passed!"
	);

	var good = new GameView($goodContainer.clone());
	// Get state to where it should be
	good.__setButtons(null);
	good.__setGameChoiceModal(null);
	good.__container = null;

	// Run the method to be tested with the correct container element
	good.__initLayout($goodContainer.clone());
	var $goodButtons = good.getButtons();
	assert.ok(
		$goodButtons.jquery !== undefined,
		"The `$goodButtons` object is not a jQuery object."
	);
	assert.strictEqual(
		$goodButtons.length,
		2,
		"The `$goodButtons` jQuery object should have 2 button elements."
	);
	assert.strictEqual(
		$goodButtons.eq(0).attr('data-card-game-button'),
		"startNewGame",
		"The first element in the `$goodButtons` object should have a 'data-card-game-button' attribute equal to 'startNewGame'."
	);
	assert.strictEqual(
		$goodButtons.eq(1).attr('data-card-game-button'),
		"restartCurrentGame",
		"The second element in the `$goodButtons` object should have a 'data-card-game-button' attribute equal to 'restartCurrentGame'."
	);

	var $buttonContainer = good.getContainer().children().eq(0);

	assert.strictEqual(
		$buttonContainer.length,
		1,
		"Expected the `$buttonContainer` object to contain a single `div` element"
	);
	assert.strictEqual(
		$buttonContainer.attr('data-card-game-view-element'),
		"button-container",
		"The first element in the `$buttons` object should have a 'data-card-game-view-element' attribute equal to 'button-container'."
	);
	assert.strictEqual(
		$buttonContainer.children().get(0),
		$goodButtons.get(0),
		"The first child of `$buttonContainer` should be the first one in the set returned from `getButtons()`."
	);
	assert.strictEqual(
		$buttonContainer.children().get(1),
		$goodButtons.get(1),
		"The second child of `$buttonContainer` should be the second one in the set returned from `getButtons()`."
	);

	var $modal = good.getContainer().children().last();
	assert.strictEqual(
		$modal.length,
		1,
		"Expected the `getContainer().children()`s last element to be a single `div` element"
	);
	assert.strictEqual(
		$modal.attr('data-card-game-view-element'),
		'game-choice-modal',
		"The `$modal` object should have an 'data-card-game-view-element' attribute equal to `game-choice-modal`."
	);
	assert.equal(
		good.getGameChoiceModal().get(0),
		$modal.get(0),
		"The jQuery element returned from `getGameChoiceModal()` does not match the one that's in the DOM."
	);
});


// @TODO - unit tests for `__initLayout()`, `initPluginView()`, `resetPluginView()`, 
// and any other methods that may exist.

/** Public method tests **/

/*QUnit.test( "private method tests", function( assert ) {
	expect(1);
	assert.strictEqual(
		goodContainer,
		good.getContainer(),
		"The $container stored in `good` does not equal the one passed in the constructor."
	);

	assert.ok(
		good.getButtons() !== null,
		"`getButtons()` returned null; expected to return a jQuery set of Buttons"
	);

	assert.ok(
		good.getContainer().find(good.getButtons()).length === 2,
		"Expected to find"
	);
});*/
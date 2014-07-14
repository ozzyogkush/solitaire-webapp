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

	var good = new GameView($goodContainer);
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
			var good = new GameView($goodContainer);
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

	var good = new GameView($goodContainer);
	good.__setContainer($goodContainer);
	assert.strictEqual(
		good.getContainer(),
		$goodContainer,
		"The jQuery element returned from `getContainer()` does not match the one passed into `__setContainer()`."
	);
});

QUnit.test( "`__setButtons()` and `getButtons()` tests", function( assert ) {
	expect(7);

	// Bad type
	assert.throws(
		function() { 
			var good = new GameView($goodContainer);
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
	var good = new GameView($goodContainer);
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
			var good = new GameView($goodContainer);
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
	var good = new GameView($goodContainer);
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
			var good = new GameView($goodContainer);
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
	var good = new GameView($goodContainer);
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
QUnit.test( "__createButtons() tests", function( assert ) {
	expect(4);

	var good = new GameView($goodContainer);
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

	var good = new GameView($goodContainer);
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
		$modal.eq(0).attr('data-card-game-view-element'),
		"game-choice-modal",
		"The first element in the `$buttons` object should have a 'data-card-game-view-element' attribute equal to 'game-choice-modal'."
	);

	// @TODO - add tests here for children/grandchildren element inside
	// the $modal DOM.
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
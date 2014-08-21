/**
 * Base class for implementing specific games' views.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		GameView
 * @name		GameView
 * @version		0.3
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var GameView = Class({ implements : IViewRules }, {
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * jQuery object that contains the elements that are added to the DOM, which represent
	 * the visual state of the game, and with which the user directly interacts to play the game.
	 *
	 * @private		
	 * @type		jQuery
	 * @memberOf	GameView
	 * @since		0.2
	 * @default		null
	 */
	_gameContainer : null,
	
	/**
	 * Sets the `_gameContainer` property to the value of `$gc`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$gc			The set of DOM elements that make up the plugin view canvas. Required.
	 */
	__setGameContainer : function($gc)
	{
		if (typeof $gc !== "object" || $gc.jquery === undefined) {
			throw new TypeException("jQuery", "GameView.__setGameContainer");
		}
		this._gameContainer = $gc;
	},
	
	/**
	 * Returns the `_gameContainer` property.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 *
	 * @return		jQuery			_gameContainer		Returns the `_gameContainer` property.
	 */
	getGameContainer : function()
	{
		return this._gameContainer;
	},

	/**
	 * Contains the location of images where cards etc. reside. Will always contain 
	 * a trailing slash ("/").
	 *
	 * @private		
	 * @type		String
	 * @memberOf	GameView
	 * @since		
	 * @default		null
	 */
	_imageDir : null,

	/**
	 * Sets the `_imageDir` property to the value of `dir`. Will append a trailing slash ("/")
	 * if one is not already there.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		String			dir			The directory where images are stored.. Required.
	 */
	__setImageDir : function(dir)
	{
		if (typeof dir !== "string") {
			throw new TypeException("String", "GameView.__setImageDir");
		}

		if (dir.lastIndexOf("/") < (dir.length - 1)) {
			dir += "/";			
		}
		this._imageDir = dir;
	},

	/**
	 * Returns the `_imageDir` property.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		
	 *
	 * @return		String			_imageDir		Returns the `_imageDir` property.
	 */
	getImageDir : function()
	{
		return this._imageDir;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/** This is an abstract class and should never be instantiated as is. **/

	/**
	 * Construct the GameView object and initialize the game view's canvas area
	 * to display the elements of the game.
	 * 
	 * @constructor
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 *
	 * @param		Array			stackModel			The set of Stacks that define the layout. Required.
	 * @param		String			imageDir			Location of the image directory from which to serve card images. Required.
	 */
	__construct : function(stackModel, imageDir)
	{
		var callStackCurrent = 'GameView.__construct';

		if (stackModel === undefined) {
			throw new CardGameException('The `stackModel` array param is required.', callStackCurrent);
		}
		if ($.type(stackModel) !== "array") {
			throw new TypeException('Array', 'GameView.__construct');
		}
		if (stackModel.length < 1) {
			throw new CardGameException('Expected `stackModel` param to have at least one row of stacks.', callStackCurrent);	
		}

		// Set the screen with Stacks that do not yet have cards in them.
		var $gameViewContainer = this.__createLayoutFromSpecs(stackModel);
		this.__setGameContainer($gameViewContainer);
			
		if ($.type(imageDir) === "undefined") {
			throw new CardGameException("The `imageDir` param is required.", callStackCurrent);
		}
		else if ($.type(imageDir) !== "string") {
			throw new TypeException("String", callStackCurrent);
		}
		else if (imageDir.length === 0) {
			throw new CardGameException("The `imageDir` string must not be empty.", callStackCurrent);
		}

		// We have a good image directory, so set it.
		this.__setImageDir(imageDir);
	},

	/** Private Functions **/

	/**
	 * Generate the layout of empty stacks based on the model. Assumes that the
	 * `stackModel` is an array that has at least one row of Stacks.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		0.2
	 * @updated		0.3
	 * 
	 * @param		Array			stackModel				The set of Stacks that define the layout. Required.
	 *
	 * @return		jQuery			$gameViewContainer		Returns the created set of DOM elements starting with the container.
	 */
	__createLayoutFromSpecs : function(stackModel)
	{
		var $gameViewContainer = $('<div></div>').attr('data-card-game-view-element', 'canvas-container');
		
		var $domRows = $('');

		for (var i = 0; i < stackModel.length; i++) {
			var stackRow = stackModel[i];
			var rowGridSize = stackRow.length;

			var $domRow = $('<div></div>')
				.attr('data-card-game-view-element', 'canvas-row')
				.addClass('row stacks-' + rowGridSize);
				
			for (var j = 0; j < stackRow.length; j++) {
				var stack = stackRow[j];

				var $stackDOMElement = this.__createStackView(stack);

				// Add this cell to the DOM row
				$domRow.append($stackDOMElement);
			}

			// Add this domRow to the list to be returned
			$gameViewContainer.append($domRow);
		}

		return $gameViewContainer;
	},

	/**
	 * Generate an individual Stack View DOM element based on the provided Stack
	 * object. If the `stack` param is null or undefined, we create an "empty" 
	 * Stack View which can be used as a placeholder or to take up space. Otherwise,
	 * it will add a class specifying the fanning direction, and add the Stack object
	 * as `data` on the Stack View for future reference.
	 * 
	 * @throws		TypeException	If the provided non-undefined, non-null Stack is not an instance of the `Stack` class.
	 * @private
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		Stack			stack					The Stack object. Optional.
	 *
	 * @return		jQuery			$stackDOMElement		Returns the generated Stack View DOM element.
	 */
	__createStackView : function(stack)
	{
		var callStackCurrent = 'GameView.__createStackView';
		var undefNullStack = (stack === undefined || stack === null);
		var fanClass = 'fan-';

		if (undefNullStack) {
			fanClass += 'none';
		}
		else if (! stack.hasOwnProperty('instanceOf') || ! stack.instanceOf(Stack)) {
			throw new TypeException("Stack", callStackCurrent);
		}
		else {
			fanClass += stack.getFanningDirection().getFanningDirectionName();
		}

		var $stackDOMElement = $('<div></div>')
			.attr('data-card-game-view-element', 'stack')
			.addClass(fanClass)
			.data({
				'stack' : (undefNullStack ? "empty" : stack)
			})
			.append(
				$('<div></div>').attr('data-card-game-view-element', 'card-container')
			);

		if (undefNullStack) {
			$stackDOMElement.addClass('empty');
		}

		return $stackDOMElement;
	},

	/**
	 * Checks whether a jQuery element is a valid Card image. Assumes the `$card` param
	 * is a valid jQuery object.
	 *
	 * @private
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$card			The DOM element to check. Required.
	 *
	 * @return		Boolean			tbr				True if the element is a valid Card image, false otherwise.
	 */
	__isCard : function($card)
	{
		var tbr = true;

		var isJquery = (typeof $card === "object" && $card.jquery !== undefined);

		if (! isJquery ||
			$card.prop('tagName').toLowerCase() !== "img" ||
			$card.attr('data-card-game-view-element') === undefined ||
			$card.attr('data-card-game-view-element') !== "card" ||
			$card.attr('data-card-face-showing') === undefined ||
			$card.attr('data-card-front-source') === undefined ||
			$card.attr('data-card-back-source') === undefined ||
			$card.attr('data-card-deck-num') === undefined ||
			$card.data('suit') === undefined ||
			$card.data('card-number') === undefined) {
			tbr = false;
		}

		return tbr;
	},

	/**
	 * Generate a single Card jQuery element and returns it.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		0.2
	 *
	 * @param		Integer			deckNum					The current deck number for this deck of cards. Required.
	 * @param		Suit			suitObj					The current deck number for this deck of cards. Required.
	 * @param		CardNumber		cardNumberObject		The current deck number for this deck of cards. Required.
	 *
	 * @return		jQuery			$card					Returns the created Card element.
	 */
	__createCard : function(deckNum, suitObj, cardNumberObject)
	{
		var cardImageSrcName = cardNumberObject.getCardNumberName().toLowerCase() + 
			"_of_" + 
			suitObj.getSuitName().toLowerCase() + 
			".png";
		var $card = $('<img />')
			.attr({
				src : this.getImageDir() + cardImageSrcName,
				'data-card-game-view-element' : 'card',
				'data-card-face-showing' : 'front',
				'data-card-front-source' : this.getImageDir() + cardImageSrcName,
				'data-card-back-source' : this.getImageDir() + "card_back.png",
				'data-card-deck-num' : deckNum
			})
			.data({
				'suit' : suitObj,
				'card-number' : cardNumberObject
			});

		return $card;
	},

	/**
	 * Generate a deck of Card objects and return it.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		0.2
	 * @TODO		implement Jokers
	 *
	 * @param		Integer			deckNum			The current deck number for this deck of cards. Required.
	 *
	 * @return		jQuery			$deck			Returns the created set of Card elements.
	 */
	__createDeck : function(deckNum, acesHigh, includeJokers)
	{
		var $deck = $();
		var ss = new SuitSet();
		var cns = new CardNumberSet();

		if (acesHigh) {
			cns.ace.__setCardValue(cns.king.getCardValue() + 1);
		}

		// the jQuery `each()` method reassigns the `this` var, so set a local reference to it here.
		var that = this;

		$.each(ss, function(suitName, suitObj) {
			$.each(cns, function(cardNumberName, cardNumberObject) {
				$deck = $deck.add(that.__createCard(deckNum, suitObj, cardNumberObject));
			});
		});

		return $deck;
	},

	/** Public Functions **/

	/**
	 * Generate the number of Decks of Card objects that the game rules specify and return it.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 *
	 * @param		Integer			numDecks		The number of decks of cards to generate.
	 *
	 * @return		jQuery			$cards			Returns the created set of Card elements.
	 */
	createCards : function(numDecks, acesHigh, includeJokers)
	{
		// Check for valid params...
		if (numDecks === undefined) {
			throw new CardGameException('The `numDecks` param is required.', 'GameView.createCards');
		}
		var parsed = null;
		if (typeof numDecks !== "number" || isNaN(parsed = parseInt(numDecks))) {
			throw new TypeException("Integer", "GameView.createCards");
		}

		if (acesHigh === undefined) {
			throw new CardGameException('The `acesHigh` param is required.', 'GameView.createCards');
		}
		if (typeof acesHigh !== "boolean") {
			throw new TypeException("Boolean", "GameView.createCards");
		}

		if (includeJokers === undefined) {
			throw new CardGameException('The `includeJokers` param is required.', 'GameView.createCards');
		}
		if (typeof includeJokers !== "boolean") {
			throw new TypeException("Boolean", "GameView.createCards");
		}

		// ...got valid params, so lets go!
		var $cards = $();

		for (var i = 0; i < numDecks; i++) {
			$cards = $cards.add(this.__createDeck(numDecks, acesHigh, includeJokers));
		}

		return $cards;
	},

	/**
	 * Flip a Card in the DOM. If the front is currently showing, show the back,
	 * or vice-versa.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$card			The Card DOM element to visually flip. Required.
	 */
	flipCard : function($card)
	{
		if ($card === undefined) {
			throw new CardGameException('The `$card` param is required.', 'GameView.flipCard');
		}
		else if (! this.__isCard($card)) {
			throw new CardGameException('The `$card` param is not a valid Card.', 'GameView.flipCard');
		}

		// @TODO: make this a cool animation
		if ($card.attr('data-card-face-showing') === "front") {
			$card = this.showCardBack($card);
		}
		else if ($card.attr('data-card-face-showing') === "back") {
			$card = this.showCardFront($card);
		}

		return $card;
	},

	/**
	 * Specifically show the back of a Card in the DOM.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$card			The Card DOM element of which to show the back. Required.
	 */
	showCardBack : function($card)
	{
		if ($card === undefined) {
			throw new CardGameException('The `$card` param is required.', 'GameView.showCardBack');
		}
		else if (! this.__isCard($card)) {
			throw new CardGameException('The `$card` param is not a valid Card.', 'GameView.showCardBack');
		}

		$card.attr({
			'src' : $card.attr('data-card-back-source'),
			'data-card-face-showing' : "back"
		});

		return $card;
	},

	/**
	 * Specifically show the front of a Card in the DOM
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$card			The Card DOM element of which to show the front. Required.
	 */
	showCardFront : function($card)
	{
		if ($card === undefined) {
			throw new CardGameException('The `$card` param is required.', 'GameView.showCardFront');
		}
		else if (! this.__isCard($card)) {
			throw new CardGameException('The `$card` param is not a valid Card.', 'GameView.showCardFront');
		}

		$card.attr({
			'src' : $card.attr('data-card-front-source'),
			'data-card-face-showing' : "front"
		});

		return $card;
	},

	/**
	 * Retrieve the DOM element representing a Stack element in the View.
	 *
	 * @throws		CardGameException				If the DOM element for the supplied Stack can't be found
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		Stack			stack			The Stack whose DOM element we want to find. Required.
	 *
	 * @return		jQuery			$matchedView	The jQuery extended DOM element that represents the supplied Stack element in the View.
	 */
	getStackView : function(stack)
	{
		var $allStackDOMElements = this.getGameContainer()
			.find('div')
				.filter('[data-card-game-view-element="stack"]');
		var $matchedView = $allStackDOMElements
			.filter(function() {
				return (
					$(this).data('stack') !== null &&
					$(this).data('stack') === stack
				);
			});

		if ($matchedView.length === 0) {
			throw new CardGameException(
				'No Stack View could be found for the supplied Stack object.', 
				'GameView.getStackView'
			);
		}

		return $matchedView;
	},

	/**
	 * Determine which Stack View exists below the specified (x, y) coordinates.
	 *
	 * Will ignore empty or moving/roving stacks.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		Integer			x					The x coordinate. Required.
	 * @param		Integer			y					The y coordinate. Required.
	 *
	 * @return		mixed			$matchedView		A jQuery extended Stack view element or null if none are in bounds.
	 */
	getStackViewFromCoords : function(x, y)
	{
		var $allStackDOMElements = this.getGameContainer()
			.find('div')
				.filter('[data-card-game-view-element="stack"]');

		var $matchedView = $allStackDOMElements
			.filter(function() {
				if ($(this).hasClass('moving') || $(this).hasClass('empty')) { 
					// Ignore moving or empty stack views.
					return false; 
				}

				var bounds = {
					x0 : $(this).offset().left,
					y0 : $(this).offset().top,
					x1 : ($(this).offset().left + $(this).outerWidth()),
					y1 : ($(this).offset().top + $(this).outerHeight())
				};

				// Check to see if this Stack has any Cards in it...
				var $cards = $(this).find('img').filter('[data-card-game-view-element="card"]');
				if ($cards.length > 1) {
					// ...if so, set the (x1, y1) bounds to the final card's offset + dimensions.
					$lastCard = $cards.last();
					bounds.x1 = ($lastCard.offset().left + $lastCard.outerWidth());
					bounds.y1 = ($lastCard.offset().top + $lastCard.outerHeight());
				}

				if ((bounds.x0 > x || x > bounds.x1) ||
					(bounds.y0 > y || y > bounds.y1)) {
					// Not in bounds, so don't include it in the set.
					return false;
				}

				// It's in the bounds!
				return true;
			});

		// Return the matched Stack view if found, or null if not found.
		return ($matchedView.length > 0 ? $matchedView : null);
	},

	/**
	 * Empty the DOM element representing a Stack element in the View. If the
	 * Stack is null or isn't an instance of the Stack class, do nothing.
	 *
	 * In either case, the elements removed should keep their data in case
	 * they get re-added to the DOM later.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * @updated		0.3
	 * 
	 * @param		Stack			stack			The Stack whose DOM element we want to empty. Required.
	 */
	emptyStackView : function(stack)
	{
		if (stack !== null && 
			stack.hasOwnProperty('instanceOf') &&
			stack.instanceOf(Stack) === true) {
			var $stackDOMElement = this.getStackView(stack);
			$stackDOMElement
				.children('div')
				.filter('[data-card-game-view-element="card-container"]')
					.children('img')
					.filter('[data-card-game-view-element="card"]')
						.detach();
		}
	},

	/** Event Handlers **/

	/**
	 * Figures out what card elements to put into a 'moving' state, and adds
	 * the `mousemove`, `touchmove`, `mouseup`, `touchend`, and `touchcancel`
	 * events to the relevant elements. Passes along relevant element references
	 * in data.
	 *
	 * The `this` object is expected to refer to an instance of this class.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		Event			event			jQuery `mousedown` or `touchstart` event object. Required.
	 */
	mouseDownTouchStartEventHandler : function(event)
	{
		event.stopImmediatePropagation();
		var $target = $(event.target);
		if (this.__isCard($target)) {
			var targetOffset = $target.offset();
			var $parentStack = $target.closest('div[data-card-game-view-element="stack"]');

			// Create a new stackview...
			var $se = this.__createStackView($parentStack.data('stack'));
			var $cardsToMove = $target
				.nextAll('[data-card-game-view-element="card"]')
				.addBack();
			
			// ...and add the selected cards to it.
			$se.removeClass('empty')
				.addClass('moving')
				.css({
					width: $target.width() + "px",
					left: targetOffset.left + "px",
					top: (targetOffset.top - this.getGameContainer().offset().top) + "px"
				});

			// Add the mouseup and mousemove event handlers.
			this.getGameContainer()
				.one(
					'mouseup touchend touchcancel',
					{ 
						rules : event.data.rules,
						originalStackView : $parentStack,
						rovingStack : $se
					},
					$.proxy(
						this.mouseUpTouchEndEventHandler,
						this
					)
				)
				.append($se)
				//.closest('body')
					.on(
						'mousemove touchmove',
						{ 
							rules : event.data.rules,
							rovingStack : $se
						},
						$.proxy(
							this.mouseMoveTouchMoveEventHandler,
							this
						)
					);

			$cardsToMove.appendTo($se.children('div[data-card-game-view-element="card-container"]'));
		}
	},

	/**
	 * Removes the `mousemove` and `touchmove` events from the body
	 *
	 * The `this` object is expected to refer to an instance of this class.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		Event			event			jQuery `mouseup` or `touchend` event object. Required.
	 */
	mouseUpTouchEndEventHandler : function(event)
	{
		this.getGameContainer().closest('body').off('mousemove touchmove');

		var $rovingStack = event.data.rovingStack;
		var $ct = $(event.currentTarget);
		var $originalStackView = event.data.originalStackView;
		if ($rovingStack.attr('data-card-game-view-element') !== null &&
			$rovingStack.attr('data-card-game-view-element') === "stack" &&
			$rovingStack.hasClass('moving')) {

			var x = event.pageX;
			var y = event.pageY;
			if (event.type === "touchend") {
				var touches = event.originalEvent.changedTouches;
				x = touches[0].pageX;
				y = touches[0].pageY;
			}
			var $cards = $rovingStack
				.find('img')
				.filter('[data-card-game-view-element="card"]');

			var $targetStack = this.getStackViewFromCoords(x, y);

			if ($targetStack !== null &&
				event.data.rules.cardsCanDropIntoStack($cards, $targetStack)) {
				$targetStack.children('div[data-card-game-view-element="card-container"]').append($cards);
			}
			else {
				$originalStackView.children('div[data-card-game-view-element="card-container"]').append($cards);
			}

			$rovingStack.remove();
		}
	},

	/**
	 * 
	 *
	 * The `this` object is expected to refer to an instance of this class.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		Event			event			jQuery `click` event object. Required.
	 */
	mouseClickEventHandler : function(event)
	{
		event.preventDefault();
		var $target = $(event.target);
		var numMovesAllowed = event.data.rules.getCardNumAbleToMoveFromInPlayStack();

		if (this.__isCard($target)) {
			var $cardsToMove = $target
				.nextAll('[data-card-game-view-element="card"]')
				.addBack();
		}
	},

	/**
	 * Moves the 'roving' stack of cards to the current mouse or touch point
	 * in the DOM.
	 *
	 * The `this` object is expected to refer to an instance of this class.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		Event			event			jQuery `mousemove` or `touchmove` event object. Required.
	 */
	mouseMoveTouchMoveEventHandler : function(event)
	{
		event.preventDefault();
		var $rovingStack = event.data.rovingStack;
		
		var baseLeft = event.pageX;
		var baseTop = event.pageY;

		if (event.type === "touchmove") {
			var touches = event.originalEvent.touches;
			baseLeft = touches[0].pageX;
			baseTop = touches[0].pageY;
		}

		var newLeft = (baseLeft - ($rovingStack.width() / 2));
		var newTop = (baseTop - this.getGameContainer().offset().top - 5);

		$rovingStack.css({
			left: newLeft + "px",
			top: newTop + "px"
		});
	}
});
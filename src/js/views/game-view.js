/**
 * Base class for implementing specific games' views.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		GameView
 * @name		GameView
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var GameView = Class({
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
	 * @since		
	 * @default		null
	 */
	_gameContainer : null,
	
	/**
	 * Sets the `_gameContainer` property to the value of `$gc`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		
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
	 * @since		
	 *
	 * @return		jQuery			_gameContainer		Returns the `_gameContainer` property.
	 */
	getGameContainer : function()
	{
		return this._gameContainer;
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
	 * @since		
	 *
	 * @param		Array			stackModel			The set of Stacks that define the layout. Required.
	 */
	__construct : function(stackModel)
	{
		if (stackModel === undefined) {
			throw new CardGameException('The `stackModel` array param is required.', 'GameView.__construct');
		}
		if ($.type(stackModel) !== "array") {
			throw new TypeException('Array', 'GameView.__construct');
		}
		if (stackModel.length < 1) {
			throw new CardGameException('Expected `stackModel` param to have at least one row of stacks.', 'GameView.__construct');	
		}

		// Set the screen with Stacks that do not yet have cards in them.
		var $gameViewContainer = this.__createLayoutFromSpecs(stackModel);
		this.__setGameContainer($gameViewContainer);
	},

	/** Private Functions **/

	/**
	 * Generate the layout of empty stacks based on the model. Assumes that the
	 * `stackModel` is an array that has at least one row of Stacks.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		
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
			var rowGridSize = stackRow.length + 1;

			var $domRow = $('<div></div>').attr('data-card-game-view-element', 'canvas-row');
			for (var j = 0; j < stackRow.length; j++) {
				var stack = stackRow[j];
				
				var $stackDOMElement = $('<div></div>')
					.attr({
						'data-card-game-view-element' : 'stack',
						'data-card-game-view-stack' : (
							stack === null ? 
								"empty" : 
								stack
							)
					});

				// Add this cell to the DOM row
				$domRow.append($stackDOMElement);
			}

			// Add this domRow to the list to be returned
			$gameViewContainer.append($domRow);
		}

		return $gameViewContainer;
	},

	/**
	 * Checks whether a jQuery element is a valid Card image. Assumes the `$card` param
	 * is a valid jQuery object.
	 *
	 * @private
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		jQuery			$card			The DOM element to check. Required.
	 *
	 * @return		Boolean			$tbr			True if the element is a valid Card image, false otherwise.
	 */
	__isCard : function($card)
	{
		$tbr = true;

		var isJquery = (typeof $card === "object" && $card.jquery !== undefined);

		if (! isJquery ||
			$card.prop('tagName').toLowerCase() !== "img" ||
			$card.attr('data-card-face-showing') === undefined ||
			$card.attr('data-card-front-source') === undefined ||
			$card.attr('data-card-back-source') === undefined ||
			$card.attr('data-card-deck-num') === undefined ||
			$card.data('suit') === undefined ||
			$card.data('card-number') === undefined) {
			$tbr = false;
		}

		return $tbr;
	},

	/**
	 * Generate a single Card jQuery element and returns it.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		
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
				src : "../img/cards/" + cardImageSrcName,
				'data-card-face-showing' : 'front',
				'data-card-front-source' : "../img/cards/" + cardImageSrcName,
				'data-card-back-source' : "../img/cards/card_back.png",
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
	 * @since		
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
	 * @since		
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
	 * @since		
	 * 
	 * @param		jQuery			$card			The Card DOM element to visually flip. Required.
	 */
	flipCard : function($card)
	{
		if ($card === undefined) {
			throw new CardGameException('The `$card` param is required.', 'GameView.flipCard');
		}
		if (! this.__isCard($card)) {
			throw new CardGameException('The `$card` param is not a valid Card.', 'GameView.flipCard');
		}

		// @TODO: make this a cool animation
		if ($card.attr('data-card-face-showing') === "front") {
			$card.attr({
				'src' : $card.attr('data-card-back-source'),
				'data-card-face-showing' : "back"
			}); 
		}
		else if ($card.attr('data-card-face-showing') === "back") {
			$card.attr({
				'src' : $card.attr('data-card-front-source'),
				'data-card-face-showing' : "front"
			}); 
		}

		return $card;
	}

	/** Event Handlers **/
});
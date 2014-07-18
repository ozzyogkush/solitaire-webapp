/**
 * Abstract base class for implmenting specific game variations' canvas DOM and manipulation.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		GameView
 * @name		GameView
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var GameView = Class({ implements : IViewRules }, {
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * Model object that contains the game rules, including the layout specs
	 * and the number and type of stacks that the cards will be moved into/out of.
	 *
	 * @private		
	 * @type		GameRules
	 * @memberOf	GameView
	 * @since		
	 * @default		null
	 */
	_pluginModel : null,
	
	/**
	 * Sets the `_pluginModel` property to the value of `_pluginModel`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		
	 * 
	 * @param		GameRules			pluginModel			The implemented variation GameRules _pluginModel. Required.
	 */
	__setModel : function(pluginModel)
	{
		if (! pluginModel.hasOwnProperty('instanceOf') || ! pluginModel.instanceOf(GameRules)) {
			throw new TypeException("GameRules", "GameView.__setModel");
		}
		this._pluginModel = pluginModel;
	},
	
	/**
	 * Returns the `_pluginModel` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		
	 *
	 * @return		GameRules			_pluginModel		Returns the `_pluginModel` property.
	 */
	getModel : function()
	{
		return this._pluginModel;
	},

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
	_DOMElements : null,
	
	/**
	 * Sets the `_DOMElements` property to the value of `$dome`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		jQuery			$dome			The set of DOM elements that make up the plugin view canvas. Required.
	 */
	__setDOMElements : function($dome)
	{
		if (typeof $dome !== "object" || $dome.jquery === undefined) {
			throw new TypeException("jQuery", "GameView.__setDOMElements");
		}
		this._DOMElements = $dome;
	},
	
	/**
	 * Returns the `_DOMElements` property.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		
	 *
	 * @return		jQuery			_DOMElements		Returns the `_DOMElements` property.
	 */
	getDOMElements : function()
	{
		return this._DOMElements;
	},

	/**
	 * jQuery object that contains the Card elements that are added to the DOM, and with 
	 * which the user directly interacts to play the game.
	 *
	 * @private		
	 * @type		jQuery
	 * @memberOf	GameView
	 * @since		
	 * @default		null
	 */
	_cards : null,
	
	/**
	 * Sets the `_cards` property to the value of `$cards`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		jQuery			$cards			The set of Cards that will be added to the DOM. Required.
	 */
	__setCards : function($cards)
	{
		if (typeof $cards !== "object" || $cards.jquery !== undefined) {
			throw new TypeException("jQuery", "GameView.__setCards");
		}
		this._cards = $cards;
	},
	
	/**
	 * Returns the `_cards` property.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		
	 *
	 * @return		jQuery			_cards		Returns the `_cards` property.
	 */
	getCards : function()
	{
		return this._cards;
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
	 * @param		GameRules			model			The model rules that define how the game runs. Required.
	 */
	__construct : function(model)
	{
		if (model !== undefined && model !== null) {
			//throw new CardGameException('Model cannot be null.', 'GameView.__construct');
			this.__initGameView(model);
		}
	},

	/** Private Functions **/

	/**
	 * Set the model rules that define how the game runs, and initialize the game 
	 * view's canvas area to display the elements of the game.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		
	 *
	 * @param		GameRules			model			The model rules that define how the game runs. Required.
	 */
	__initGameView : function(model)
	{
		// Add the cards to their respective Stacks in the GameView's DOM.
		this.__setModel(model);

		// Set the screen with Stacks that do not yet have cards in them.
		var $gameViewContainer = this.__createLayoutFromSpecs();
		this.__setDOMElements($gameViewContainer);

		// Create the cards and add them to the model.
		$cards = this.__createCards();
		this.__setCards($cards);
	},

	/**
	 * Generate the layout of empty stacks based on the model.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		
	 *
	 * @return		jQuery			$gameViewContainer		Returns the created set of DOM elements starting with the container.
	 */
	__createLayoutFromSpecs : function()
	{
		var stacks = this.getModel().getStacks();

		var $gameViewContainer = $('<div></div>').attr('data-card-game-view-element', 'canvas-container');
		
		if (stacks.length > 0) {
			var $domRows = $('');

			for (var i = 0; i < stacks.length; i++) {
				var stackRow = stacks[i];
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
		}

		return $gameViewContainer;
	},

	/**
	 * Generate the number of Decks of Card objects that the game rules specify and return it.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		
	 *
	 * @return		jQuery			$cards			Returns the created set of Card elements.
	 */
	__createCards : function()
	{
		var $cards = $();

		for (var i = 0; i < this.getModel().getNumDecksInGame(); i++) {
			$cards.add(this.__createDeck());
		}

		return $cards;
	},

	/**
	 * Generate a deck of Card objects and return it.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		
	 *
	 * @return		jQuery			$deck			Returns the created set of Card elements.
	 */
	__createDeck : function()
	{
		var $deck = $();
		var ss = new SuitSet();
		var cns = new CardNumberSet();
		if (this.getModel().getAcesHigh()) {
			cns.ace.setCardValue(cns.king.getCardValue() + 1);
		}

		$.each(ss, function(suitName, suitObj) {
			$.each(cns, function(cardNumberName, cardNumberObject) {
				//$deck.add(new Card(suitObj, cardNumberObject));
				$deck.add(this.__createCard(suitObj, cardNumberObject));
			});
		});

		// Add Joker cards if the game calls for it
		// @TODO - implement this later
		if (this.getModel().getIncludeJokers()) {
			//$deck.add(new Card(suitObj, cardNumberObject));
			//$deck.add(new Card(suitObj, cardNumberObject));
		}

		return $deck;
	},

	__createCard : function(suitObj, cardNumberObject)
	{
		var cardImageSrcName = cardNumberObject.getCardNumberName() + "_of_" + suitObj.getSuitName() + ".png";
		var $card = $('<img />')
			.attr({
				src : "../img/cards/" + cardImageSrcName,
				'data-card-game-suit' : suitObj, 
				'data-card-game-card-number' : cardNumberObject
			});

		return $card;
	}

	/** Public Functions **/

	/** Event Handlers **/

	/**
	 * This method will be run when a user triggers a `mousedown` or `touchstart` event.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 */
	mouseDownTouchStartEventHandler : function() { /* This is a stub! */ },

	/**
	 * This method will be run when a user triggers a `mouseup` or `touchend` event.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 */
	mouseUpTouchEndEventHandler : function() { /* This is a stub! */ },

	/**
	 * This method will be run when a user triggers a `click` event.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 */
	mouseClickEventHandler : function() { /* This is a stub! */ },

	/**
	 * This method will be run when a user triggers a `mousemove` or `touchmove` event.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 */
	mouseMoveTouchMoveEventHandler : function() { /* This is a stub! */ }
});
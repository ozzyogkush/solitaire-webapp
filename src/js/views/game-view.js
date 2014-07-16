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
		if (! _pluginModel.hasOwnProperty('instanceOf') || ! _pluginModel.instanceOf(GameRules)) {
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

	_DOMElements : null,
	
	/**
	 * Sets the `_DOMElements` property to the value of `dome`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		jQuery			dome			The set of DOM elements that make up the plugin view canvas. Required.
	 */
	__setDOMElements : function(dome)
	{
		if (typeof dome !== "object" || dome.jquery === undefined) {
			throw new TypeException("jQuery", "GameView.__setDOMElements");
		}
		this._DOMElements = dome;
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

	_cards : null,
	
	/**
	 * Sets the `_cards` property to the value of `cards`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		jQuery			cards			The set of Cards that will be added to the DOM. Required.
	 */
	__setCards : function(cards)
	{
		if (typeof cards !== "object" || cards.jquery !== undefined) {
			throw new TypeException("jQuery", "GameView.__setCards");
		}
		this._cards = cards;
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

	__construct : function(model)
	{
		if (model !== undefined && model !== null) {
			//throw new CardGameException('Model cannot be null.', 'GameView.__construct');
			this.__initGameView(model);
		}
	},

	/** Private Functions **/

	__initGameView : function(model)
	{
		// Add the cards to their respective Stacks in the GameView's DOM.
		this.__setModel(model);

		// Set the empty screen
		this.__setDOMElements(this.__createLayoutFromSpecs());

		// Create the cards and add them to the Model's stack.
		this.__setCards(this.__createCards());
	},

	/**
	 * Generate the layout of empty stacks based on the layout specified in the model.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		
	 *
	 * @return		jQuery			$domRows		Returns the created set of DOM rows.
	 */
	__createLayoutFromSpecs : function()
	{
		var layout = this.getModel().getLayout();

		var $domRows = $('');

		if (layout.length > 0) {
			var stackTypes = new StackTypes();
			for (var i = 0; i < layout.length; i++) {
				var row = layout[i];
				var rowGridSize = row.length + 1;
				var $domRow = $('<div></div>').attr('data-card-game-view-element', 'canvas-row');
				for (var j = 0; j < (rowGridSize - 1); j++) {
					var stackType = row[j] !== null ? stackTypes[row[j]] : "none";
					var $domGridCell = $('<div></div>')
						.attr({
							'data-card-game-view-element' : 'grid-row-cell',
							'data-card-game-stack-type' : stackType
						});

					// Add this cell to the DOM row
					$domRow.append($domGridCell);
				}

				// Add this domRow to the list to be returned
				$domRows.add($domRow);
			}
		}

		return $domRows;
	},

	__createCards : function()
	{
		var $cards = $();

		for (var i = 0; i < this.getModel().getNumDecksInGame(); i++) {
			$cards.add(this.__createDeck());
		}

		return $cards;
	},

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
				$deck.add(new Card(suitObj, cardNumberObject));
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

	/** Public Functions **/

	dealerCollectAllCards : function()
	{

	},

	/*shuffleStack : function(stack)
	{

	},*/

	/** Event Handlers **/

	/**
	 * This method will be run when a user triggers a `mousedown` or `touchstart` event on a single Card.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 */
	mouseDownTouchStartCard : function() { /* This is a stub! */ },

	/**
	 * This method will be run when a user triggers a `mouseup` or `touchend` event on a single Card.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 */
	mouseUpTouchEndCard : function() { /* This is a stub! */ },

	/**
	 * This method will be run when a user triggers a `mousedown` or `touchstart` event on a Stack of Cards.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 */
	mouseDownTouchStartStack : function() { /* This is a stub! */ },

	/**
	 * This method will be run when a user triggers a `mouseup` or `touchend` event on a Stack of Cards.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 */
	mouseUpTouchEndStack : function() { /* This is a stub! */ },

	/**
	 * This method will be run when a user triggers a `mousemove` or `touchmove` event on a Card or Stack of Cards.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		
	 */
	mouseMoveTouchMove : function() { /* This is a stub! */ }
});
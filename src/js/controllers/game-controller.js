/**
 * Controls the interaction between the sub-classed GameRules and GameView classes
 * in order to allow the user to play the game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		GameController
 * @name		GameController
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var GameController = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The name of the game. Prefix for the extended GameRules and GameView classes;
	 * ie `{_gameName}Rules` and `{_gameName}View`.
	 *
	 * @private
	 * @type		String
	 * @memberOf	GameController
	 * @since		
	 * @default		null
	 */
	_gameName : null,
	
	/**
	 * Sets the `_gameName` property to the value of `gn`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		
	 * 
	 * @param		String			gn			The name of the game. Required.
	 */
	__setGameName : function(gn)
	{
		if (typeof gn !== "string") {
			throw new TypeException("String", "GameController.__setGameName");
		}
		this._gameName = gn;
	},
	
	/**
	 * Returns the `_gameName` property.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		
	 *
	 * @return		String			_gameName		Returns the `_gameName` property.
	 */
	getGameName : function()
	{
		return this._gameName;
	},

	/**
	 * Contains the rules and layout for the current game. Should be an instance
	 * of a sub-class of GameRules, ie `{_gameName}Rules`.
	 *
	 * @private
	 * @type		GameRules
	 * @memberOf	GameController
	 * @since		
	 * @default		null
	 */
	_gameRules : null,
	
	/**
	 * Sets the `_gameRules` property to the value of `gv`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		
	 * 
	 * @param		GameRules			gr			The rules and layout of the game. Required.
	 */
	__setGameRules : function(gr)
	{
		if (! gr.hasOwnProperty('instanceOf') || ! gr.instanceOf(GameRules)) {
			throw new TypeException("GameRules", "GameController.__setGameRules");
		}
		this._gameRules = gr;
	},
	
	/**
	 * Returns the `_gameRules` property.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		
	 *
	 * @return		GameRules			_gameRules		Returns the `_gameRules` property.
	 */
	getGameRules : function()
	{
		return this._gameRules;
	},

	/**
	 * Contains the view elements and event/move logic for the current game. Should
	 * be an instance of a sub-class of GameView, ie `{_gameName}View`.
	 *
	 * @private
	 * @type		GameView
	 * @memberOf	GameController
	 * @since		
	 * @default		null
	 */
	_gameView : null,
	
	/**
	 * Sets the `_gameView` property to the value of `gv`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		
	 * 
	 * @param		GameView			gv			The rules and layout of the game. Required.
	 */
	__setGameView : function(gv)
	{
		if (! gv.hasOwnProperty('instanceOf') || ! gv.instanceOf(GameView)) {
			throw new TypeException("GameView", "GameController.__setGameView");
		}
		this._gameView = gv;
	},
	
	/**
	 * Returns the `_gameView` property.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		
	 *
	 * @return		GameView			_gameView		Returns the `_gameView` property.
	 */
	getGameView : function()
	{
		return this._gameView;
	},

	/**
	 * Contains the set of jQuery extended `div` elements which make up the set of cards
	 * used to play the current game.
	 *
	 * @private
	 * @type		jQuery
	 * @memberOf	GameController
	 * @since		
	 * @default		null
	 */
	_cards : null,
	
	/**
	 * Sets the `_cards` property to the value of `$cards`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		
	 * 
	 * @param		jQuery			$cards			The set of jQuery extended card elements. Required.
	 */
	__setCards : function($cards)
	{
		if (typeof $cards !== "object" || $cards.jquery === undefined) {
			throw new TypeException("jQuery", "GameController.__setCards");
		}
		this._cards = $cards;
	},
	
	/**
	 * Returns the `_cards` property.
	 * 
	 * @public
	 * @memberOf	GameController
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

	/**
	 * Initialize the object, setting the name of the game to be loaded. Then
	 * load up the game's rules, its view elements, and finally a set of jQuery
	 * extended card elements to store for later use.
	 *
	 * @constructor
	 * @public
	 * @memberOf	GameController
	 * @since		
	 *
	 * @param		String			gameName			The name of the game. Prefix for the extended GameRules and GameView classes. Required.
	 */
	__construct : function(gameName)
	{
		if (gameName === undefined) {
			throw new CardGameException('The `gameName` param is required.', 'GameController.__construct');
		}
		this.__setGameName(gameName);

		// Load the game rules
		this.__loadGameRules();

		// Load the game view
		this.__loadGameView();

		// Generate the set of cards needed for this game and store them for future use.
		var $cards = this.getGameView().createCards(
			this.getGameRules().getNumDecksInGame(), 
			this.getGameRules().getAcesHigh(), 
			this.getGameRules().getIncludeJokers()
		);
		this.__setCards($cards);
	},

	/** Private Functions **/

	/**
	 * Generates a new instance of a subclass of GameRules, based on the name of 
	 * the current game. Stores the generated instance in `_gameRules`.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		
	 */
	__loadGameRules : function()
	{
		var grClassName = this.getGameName() + 'Rules';
		try {
			var gameRules = new window[grClassName]();
			this.__setGameRules(gameRules);
		}
		catch (e) {
			if (e.message.match(/'undefined' is not a constructor \(evaluating 'new window\[grClassName\]\(\)'\)/) !== null) {
				throw new CardGameException('The expected game class "' + grClassName + '" does not exist.', 'GameController.__loadGameRules');
			}
			else { throw e; }
		}
	},

	/**
	 * Generates a new instance of a subclass of GameView, based on the name of 
	 * the current game. Stores the generated instance in `_gameView`. Assumes that
	 * `__loadGameRules()` has been run successfully prior to this method being called.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		
	 */
	__loadGameView : function()
	{
		var gvClassName = this.getGameName() + 'View';
		try {
			var gameView = new window[gvClassName](this.getGameRules().getStackModel());
			this.__setGameView(gameView);
		}
		catch (e) {
			if (e.message.match(/'undefined' is not a constructor \(evaluating 'new window\[gvClassName\]\(this\.getGameRules\(\)\.getStackModel\(\)\)'\)/) !== null) {
				throw new CardGameException('The expected game class "' + gvClassName + '" does not exist.', 'GameController.__loadGameView');
			}
			else { throw e; }
		}
	},

	/**
	 * Helper function to sort an array the way a human would shuffle
	 * a deck of cards: split it in half, and alternate adding a small
	 * random number of cards from the left deck then from the right deck
	 * to the shuffled set.
	 *
	 * Recursive function that can shuffle an array any number of times in order
	 * to get a more reasonable distribution.
	 *
	 * This should be relatively fast since we're not resizing arrays constantly.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		
	 */
	__shuffleCardArray : function(cardArr, numTimes)
	{
		cardArr.reverse();
		var numCards = cardArr.length;
		var middle = Math.floor(numCards/2);
		var shuffledCardsArr = [];
		shuffledCardsArr.length = numCards;

		var cardLeftStart = 0;
		var cardRightStart = middle;
		var merged = false;
		var i = 0;
		while (! merged) {
			// Choose the lower number between the number of cards
			// remaining from the left pile, and a random # between 1 and 4,
			// to add from the left pile first.
			var cardsLeftRemaining = middle - cardLeftStart;
			var randFromLeft = Math.min(
				Math.ceil(Math.random() * 4),
				cardsLeftRemaining
			);
			for (var j = 0; j < randFromLeft; j++) {
				shuffledCardsArr[i++] = cardArr[cardLeftStart++];
			}
			
			// Choose the lower number between the number of cards
			// remaining from the right pile, and a random # between 1 and 4,
			// to add from the right pile.
			var cardsRightRemaining = numCards - cardRightStart;
			var randFromRight = Math.min(
				Math.ceil(Math.random() * 4),
				cardsRightRemaining
			);
			for (var k = 0; k < randFromRight; k++) {
				shuffledCardsArr[i++] = cardArr[cardRightStart++];
			}

			// The left and right hand splits of the cards have been merged
			// when there are no more cards left to shuffle.
			merged = (cardLeftStart == middle && cardRightStart == numCards);
		}

		var parsedNumTimes = null;
		if (numTimes !== undefined && 
			! isNaN(parsedNumTimes = parseInt(numTimes)) && 
			parsedNumTimes > 0) {
			return this.__shuffleCardArray(shuffledCardsArr, parsedNumTimes - 1);
		}
		
		return shuffledCardsArr;
	},

	__shuffleCards : function(numTimes)
	{
		// Shuffle the cards...
		var cardsArr = this.getCards().toArray();
		var shuffledCardsArr = this.__shuffleCardArray(cardsArr, numTimes);

		var $shuffledCards = $(shuffledCardsArr);
		this.__setCards($shuffledCards);
	},

	__storeCopyOfCards : function()
	{

	},

	__stackCollectAllCards : function(dealerStack)
	{

	},

	__dealCards : function()
	{

	},

	__startGameTimer : function()
	{

	},

	/** Public Functions **/

	/**
	 * Begins a new round of the current game.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		
	 *
	 * @return		Boolean			RETURNOBJVAR			DESCRIPTION
	 */
	beginGamePlay : function()
	{
		var success = false;

		this.__shuffleCards();

		this.__storeCopyOfCards();

		this.__stackCollectAllCards(this.getGameRules().getDealerStack());

		this.__dealCards();

		this.__startGameTimer();

		success = true;

		return success;
	}
});
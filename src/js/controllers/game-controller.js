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

	/**
	 * Contains a copy of the shuffled set of cards prior to being dealt to any Stacks.
	 *
	 * @private
	 * @type		jQuery
	 * @memberOf	GameController
	 * @since		
	 * @default		null
	 */
	_cardsResetCopy : null,
	
	/**
	 * Sets the `_cardsResetCopy` property to the value of `$cards`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		
	 * 
	 * @param		jQuery			$cardsCopy			The copy of the set of jQuery extended card elements. Required.
	 */
	__setCardsResetCopy : function($cardsCopy)
	{
		if (typeof $cardsCopy !== "object" || $cardsCopy.jquery === undefined) {
			throw new TypeException("jQuery", "GameController.__setCardsResetCopy");
		}
		this._cardsResetCopy = $cardsCopy;
	},
	
	/**
	 * Returns the `_cardsResetCopy` property.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		
	 *
	 * @return		jQuery			_cardsResetCopy		Returns the `_cardsResetCopy` property.
	 */
	getCardsResetCopy : function()
	{
		return this._cardsResetCopy;
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
	 * @TODO		Speed test this algorithm with increasing cardArr length and numTimes
	 *
	 * @param		Array		cardArr				The array of card elements to shuffle. Required.
	 * @param		Integer		numTimes			The number of times to recursively run this method. Optional.
	 *
	 * @return		Array		shuffledCardsArr	The shuffled array of cards.
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

	/**
	 * Shuffle the set of cards a given number of times and re-stores it in `_cards`.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		
	 *
	 * @param		Integer			numTimes		The number of times to shuffle the cards. Optional.
	 */
	__shuffleCards : function(numTimes)
	{
		// Shuffle the cards...
		var cardsArr = this.getCards().toArray();
		var shuffledCardsArr = this.__shuffleCardArray(cardsArr, numTimes);

		var $shuffledCards = $(shuffledCardsArr);
		this.__setCards($shuffledCards);
	},

	/**
	 * Takes a clone of the set of Cards and stores them for later re-use.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		
	 */
	__storeCopyOfCards : function()
	{
		this.__setCardsResetCopy(this.getCards().clone(true, false));
	},

	/**
	 * Empty all the DOM elements representing all the Stacks in the model, 
	 * then Find the DOM element representing a specific Stack object 
	 * and append all the Card DOM elements to it.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		
	 *
	 * @param		Stack			stack			The Stack object whose view will receive all Card view DOM objects as children. Required.
	 */
	__stackCollectAllCards : function(stack)
	{
		// First, empty all the stacks.
		this.getGameRules().runForEachStackObject(
			this.getGameView(),
			this.getGameView().emptyStackView
		);

		// Next, add all the cards to the specified stack.
		var $stackDOMElement = this.getGameView().getStackView(stack);
		var that = this;
		this.getCards().each(function(index, card) {
			var $card = $(card);
			var cardIndexOne = index + 1;
			if (cardIndexOne <= stack.getNumCardsFacingDown()) {
				// Make sure the first cards up to stack.getNumCardsFacingDown() are face down
				$card = that.getGameView().showCardBack($card);
			}
			else {
				// and the rest are face up.
				$card = that.getGameView().showCardFront($card);
			}
		})
		.appendTo($stackDOMElement);
	},

	/**
	 * Figure out how many cards need to be dealt to all the 'inPlay' stacks.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		
	 *
	 * @return		Integer			numCardsToDeal			The number of cards the app will deal to InPlay stacks.
	 */
	__getNumCardsToDeal : function() 
	{
		var numCardsToDeal = 0;
		var st = new StackTypes();
		this.getGameRules().runForEachStackObject(
			this,
			function(stack) {
				if (stack !== null && 
					stack.hasOwnProperty('instanceOf') &&
					stack.instanceOf(Stack) === true &&
					stack.getStackType().getStackTypeName() === st.inPlay.getStackTypeName()) {
					numCardsToDeal += stack.getNumCardsFacingDown() + stack.getNumCardsFacingUp();
				}
			}
		);

		return numCardsToDeal;
	},

	/**
	 * Deal all the Cards from the dealer Stack to all the inPlay Stacks, going 
	 * one Card per Stack at a time, up to the calculated total number of Cards 
	 * to deal.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		
	 */
	__dealCards : function()
	{
		var numCardsToDeal = this.__getNumCardsToDeal();
		var st = new StackTypes();
		var fd = new FanningDirectionSet();

		var inPlayStacks = this.getGameRules().getStacksByType(st.inPlay);

		var curCardIndex = 0;
		var curStackIndex = 0;
		var cardsNotDealt = true;
		do {
			var curStack = inPlayStacks[curStackIndex];
			var totalCardsInStackNeeded = curStack.getNumCardsFacingDown() + curStack.getNumCardsFacingUp();

			// Grab the Stack view...
			var $stackDOMElement = this.getGameView().getStackView(curStack);
			var $cardsInStack = $stackDOMElement
				.children('img[data-card-game-view-element="card"]');
			var curNumCardsInStack = $cardsInStack.length;
			
			// increment this now
			curStackIndex = (curStackIndex + 1) % inPlayStacks.length;
			if (curNumCardsInStack === totalCardsInStackNeeded) {
				// This stack has all the cards it needs, so bounce now.
				continue;
			}

			// This stack needs to add another card, so do it.
			var $card = this.getCards().eq(curCardIndex);
			if (curNumCardsInStack < curStack.getNumCardsFacingDown()) {
				// Make sure the first cards up to curStack.getNumCardsFacingDown() are face down
				$card = this.getGameView().showCardBack($card);
			}
			else {
				// and the rest are face up.
				$card = this.getGameView().showCardFront($card);
			}

			$card.appendTo($stackDOMElement);
			curCardIndex++;

			cardsNotDealt = (curCardIndex < numCardsToDeal);
		} while (cardsNotDealt);
	},

	__startGameTimer : function()
	{

	},

	/** Public Functions **/

	/**
	 * Begins a new round of the current game.
	 * 
	 * @throws		CardGameException				If the Dealer stack can't be found.
	 * @public
	 * @memberOf	GameController
	 * @since		
	 *
	 * @return		Boolean			success			Flag indicating that everything succeeded (true) or not (false).
	 */
	beginGamePlay : function()
	{
		var success = false;

		// Shuffle the cards a random number of times between 3 and 10
		var numTimes = 0;
		while (numTimes < 3) { numTimes = Math.floor(Math.random() * 10) + 1; }
		this.__shuffleCards(numTimes);

		// Store a copy of the cards in their currently shuffled state for later re-use.
		this.__storeCopyOfCards();

		// Get the Dealer stack and send all the Cards to its view.
		var dealerStack = this.getGameRules().getDealerStack();
		if (dealerStack === null) {
			throw new CardGameException('No Dealer stack exists in the layout.', 'GameController.beginGamePlay');
		}
		else if (
			! dealerStack.hasOwnProperty('instanceOf') ||
			dealerStack.instanceOf(Stack) !== true
		) {
			throw new CardGameException('The found Dealer stack is not a Stack object.', 'GameController.beginGamePlay');
		}
		this.__stackCollectAllCards(dealerStack);

		// Do an animation of dealing the cards from the Dealer stack to
		// the individual InPlay stacks (according to the rules of the game)
		this.__dealCards();

		// Start a game timer.
		this.__startGameTimer();

		success = true;

		return success;
	}
});
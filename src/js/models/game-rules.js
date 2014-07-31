/**
 * Abstract base class for implementing the Stack model for the layout of a card game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		GameRules
 * @name		GameRules
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var GameRules = Class({ implements : IModelRules }, {
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The number of full Decks of Cards that the game will require to be played.
	 *
	 * @private
	 * @type		Integer
	 * @memberOf	GameRules
	 * @since		
	 * @default		null
	 */
	_numDecksInGame : null,
	
	/**
	 * Sets the `_numDecksInGame` property to the value of `n`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		
	 * 
	 * @param		Integer			n			The number of decks of cards in the game. Required.
	 */
	__setNumDecksInGame : function(n)
	{
		var parsed = null;
		if (typeof n !== "number" || isNaN(parsed = parseInt(n))) {
			throw new TypeException("Integer", "GameRules.__setNumDecksInGame");
		}
		this._numDecksInGame = parsed;
	},
	
	/**
	 * Returns the `_numDecksInGame` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		Integer			_numDecksInGame				Returns the `_numDecksInGame` property.
	 */
	getNumDecksInGame : function()
	{
		return this._numDecksInGame;
	},

	/**
	 * Flag indicating whether the game requires Joker cards.
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	GameRules
	 * @since		
	 * @default		null
	 */
	_includeJokers : null,
	
	/**
	 * Sets the `_includeJokers` property to the value of `ij`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		
	 * 
	 * @param		Boolean			ij			The flag indicating whether to include Jokers. Required.
	 */
	__setIncludeJokers : function(ij)
	{
		if (typeof ij !== "boolean") {
			throw new TypeException("Boolean", "GameRules.__setIncludeJokers");
		}
		this._includeJokers = ij;
	},
	
	/**
	 * Returns the `_includeJokers` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		Boolean			_includeJokers		Returns the `_includeJokers` property.
	 */
	getIncludeJokers : function()
	{
		return this._includeJokers;
	},

	/**
	 * Flag indicating whether aces are highher than kings (true) or lower than twos (false).
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	GameRules
	 * @since		
	 * @default		false
	 */
	_acesHigh : null,
	
	/**
	 * Sets the `_acesHigh` property to the value of `ah`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		
	 * 
	 * @param		Boolean			ah			The flag indicating whether Aces are high. Required.
	 */
	__setAcesHigh : function(ah)
	{
		if (typeof ah !== "boolean") {
			throw new TypeException("Boolean", "GameRules.__setAcesHigh");
		}
		this._acesHigh = ah;
	},
	
	/**
	 * Returns the `_acesHigh` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		Boolean			_acesHigh		Returns the `_acesHigh` property.
	 */
	getAcesHigh : function()
	{
		return this._acesHigh;
	},

	/**
	 * The list of Stack objects that make up the play area.
	 *
	 * @private
	 * @type		Array
	 * @memberOf	GameRules
	 * @since		
	 * @default		null
	 */
	_stackModel : null,
	
	/**
	 * Sets the `_stacks` property to the value of `st`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		
	 * 
	 * @param		Array			st			The set of Stack objects making up the play area. Required.
	 */
	__setStackModel : function(st)
	{
		if ($.type(st) !== "array") {
			throw new TypeException("Array", "GameRules.__setStackModel");
		}
		this._stackModel = st;
	},
	
	/**
	 * Returns the `_stackModel` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		Array			_stackModel			Returns the `_stackModel` property.
	 */
	getStackModel : function()
	{
		return this._stackModel;
	},

	/**
	 * Describes the visual layout of the Stacks on the game board. A 2D array of arrays containing
	 * StackTypes, based on the Grid and Row layout options in Bootstrap 3. Cell entries can also be
	 * "empty" indicating that we want to separate cells by empty space.
	 *
	 * @private
	 * @type		Array
	 * @memberOf	GameRules
	 * @since		
	 * @default		null
	 */
	_layout : null,
	
	/**
	 * Sets the `_layout` property to the value of `ly`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		
	 * 
	 * @param		Array			ly			The description of the game layout based on StackTypes. Required.
	 */
	__setLayout : function(ly)
	{
		if ($.type(ly) !== "array") {
			throw new TypeException("Array", "GameRules.__setLayout");
		}
		this._layout = ly;
	},
	
	/**
	 * Returns the `_layout` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		Array			_layout		Returns the `_layout` property.
	 */
	getLayout : function()
	{
		return this._layout;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/** This is an abstract class and should never be instantiated as is. **/

	/**
	 * Initialize the object and create the stacks based on the model defined
	 * by the extended child class. This constructor should run AFTER the sub-class
	 * constructor generates and sets its layout
	 *
	 * @constructor
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 */
	__construct : function()
	{
		if (this.getLayout() !== null) {
			// actually create all the stacks and set to `stacks` property
			this.__setStackModel(this.__createStackModel());
		}
	},

	/** Private Functions **/

	/**
	 * Generates an object containing sets of Stacks. It will contain any number of each StackType
	 * as defined in the `_layout` property. Returns the generated object.
	 *
	 * @private
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		Array				stacks				Ordered sets of Stack objects in rows as defined by the layout
	 */
	__createStackModel : function()
	{
		var layout = this.getLayout();

		var stacks = null;

		if (layout !== null && layout.length > 0) {
            var stackTypes = new StackTypes();
            var fanningDirections = new FanningDirectionSet();
			stacks = [];

			for (var i = 0; i < layout.length; i++) {
				var row = layout[i];
				var stackRow = [];

				for (var j = 0; j < row.length; j++) {
					var layoutStackInfo = row[j];
					var st = null;
					if (layoutStackInfo !== null) {
						// Create the new Stack object...
						st = new Stack(
							stackTypes[layoutStackInfo.stackType.getStackTypeName()],
							fanningDirections[layoutStackInfo.fanningDirection.getFanningDirectionName()],
							layoutStackInfo.numCardsFacingDown,
							layoutStackInfo.numCardsFacingUp
						);	
					}

					// ...and add it to the set of Stacks in the current row.
					stackRow.push(st);
				}

				stacks.push(stackRow);
			}
		}

		return stacks;
	},

	/** Public Functions **/

	/**
	 * Find the Stack object in the `_stackModel` arrays which corresponds
	 * to the Stack that the Dealer uses to Deal cards.
	 *
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		Stack			dealerStack			The Stack element with StackType equal to 'dealer'. Returns null when no Dealer Stack is available.
	 */
	getDealerStack : function()
	{
		var stackTypes = new StackTypes();
		var dealerStack = this.getStacksByType(stackTypes.dealer)[0];

		return dealerStack;
	},

	/**
	 * Find all the Stack objects in the `_stackModel` arrays which correspond
	 * to the StackType passed in.
	 *
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		Array			stacksTBR			The Stack elements with the matched StackType. Returns an empty array if none are found.
	 */
	getStacksByType : function(stackType)
	{
		var stacksTBR = [];
		var stacks = this.getStackModel();

		if (stacks !== null && stacks.length > 0) {
			for (var i = 0; i < stacks.length; i++) {
				var stackRow = stacks[i];
				for (var j = 0; j < stackRow.length; j++) {
					var stack = stackRow[j];
					if (
						stack !== null &&
						stack.getStackType().getStackTypeName() === stackType.getStackTypeName()
					) {
						stacksTBR.push(stack);
					}
				}
			}
		}

		return stacksTBR;
	},
	
	/**
	 * Takes in a context and a method definition (or anonymous function)
	 * and runs it for all the Stack objects in the generated Stack model
	 * object. Safest way to ensure it hits all the Stacks.
	 *
	 * Also passes along the row index and cell (stack) index to the method
	 * so it can use it.
	 *
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @param		Object			context				The object/function which will become the value of `this` in the called method's scope.
	 * @param		Function		methodToRun			The method to run on each Stack object in the model.
	 */
	runForEachStackObject : function(context, methodToRun)
	{
		var allStacks = this.getStackModel();
		for (var i = 0, smlen = allStacks.length; i < smlen; i++) {
			for (var j = 0, rowlen = allStacks[i].length; j < rowlen; j++) {
				var curStack = allStacks[i][j];
				methodToRun.call(context, curStack, i, j);
			}
		}
	}

});
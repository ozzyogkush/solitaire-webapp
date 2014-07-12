/**
 * Abstract base class for implmenting specific game variations' rules required for
 * the user to be able to play the specific variation.
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
	 * Contains the number of cards a player is able currently allowed to move
	 * from an "In Play" stack to another "In Play" Stack (with cards or empty).
	 *
	 * @private		
	 * @type		Integer
	 * @memberOf	GameRules
	 * @since		
	 * @default		null
	 */
	_cardNumAbleToMoveFromInPlayStack : null,

	/**
	 * Sets the `_cardNumAbleToMoveFromInPlayStack` property to the parsed integer value of `cna`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		
	 * 
	 * @param		Integer			cna			The number of cards now allowed to be moved from an in play stack. Required.
	 */
	__setCardNumAbleToMoveFromInPlayStack : function(cna)
	{
		if (typeof cna !== "number" || (parsed = parseInt(cna) === null)) {
			throw new TypeException("number", "GameRules.__setCardNumAbleToMoveFromInPlayStack");
		}
		this._cardNumAbleToMoveFromInPlayStack = parsed;
	},

	/**
	 * Returns the `_cardNumAbleToMoveFromInPlayStack` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		String			_cardNumAbleToMoveFromInPlayStack		Returns the name string.
	 */
	getCardNumAbleToMoveFromInPlayStack : function()
	{
		return this._cardNumAbleToMoveFromInPlayStack;
	},

	/**
	 * The number of full Decks of Cards that the game will require to be played.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"number"
	 */
	_numDecksInGame : "number",
	
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
		if (typeof n !== "number" || (parsed = parseInt(cna) === null)) {
			throw new TypeException("number", "GameRules.__setNumDecksInGame");
		}
		this._numDecksInGame = n;
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
	 * @memberOf	IModelRules
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
			throw new TypeException("boolean", "GameRules.__setIncludeJokers");
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
	 * The list of Stack objects that make up the play area.
	 *
	 * @private
	 * @type		Object
	 * @memberOf	IModelRules
	 * @since		
	 * @default		null
	 */
	_stacks : null,
	
	/**
	 * Sets the `_stacks` property to the value of `st`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		
	 * 
	 * @param		Object			st			The set of Stack objects making up the play area. Required.
	 */
	__setStacks : function(st)
	{
		if (typeof st !== "object") {
			throw new TypeException("object", "GameRules.__setStacks");
		}
		this._stacks = st;
	},
	
	/**
	 * Returns the `_stacks` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		
	 *
	 * @return		Object			_stacks		Returns the `_stacks` property.
	 */
	getStacks : function()
	{
		return this._stacks;
	},

	/**
	 * Describes the visual layout of the Stacks on the game board. A 2D array of arrays containing
	 * StackTypes, based on the Grid and Row layout options in Bootstrap 3. Cell entries can also be
	 * "empty" indicating that we want to separate cells by empty space.
	 *
	 * @private
	 * @type		Object
	 * @memberOf	IModelRules
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
	 * @param		Object			ly			The description of the game layout based on StackTypes. Required.
	 */
	__setLayout : function(ly)
	{
		if (typeof ly !== "object") {
			throw new TypeException("object", "GameRules.__setLayout");
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
	 * @return		Object			_layout		Returns the `_layout` property.
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
});
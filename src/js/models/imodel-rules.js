/**
 * Interface for implementing the Stack model for the layout of a card game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		IModelRules
 * @name		IModelRules
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var IModelRules = Interface({
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
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"Integer"
	 */
	_cardNumAbleToMoveFromInPlayStack : "Integer",

	/**
	 * The number of full Decks of Cards that the game will require to be played.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"Integer"
	 */
	_numDecksInGame : "Integer",

	/**
	 * Flag indicating whether aces are highher than kings (true) or lower than twos (false).
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"boolean"
	 */
	_acesHigh : "boolean",

	/**
	 * Flag indicating whether the game requires Joker cards.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"boolean"
	 */
	_includeJokers : "boolean",

	/**
	 * The list of Stack objects that make up the play area.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"array"
	 */
	_stackkModel : "array",

	/**
	 * Describes the visual layout of the Stacks on the game board. A 2D array of arrays containing
	 * StackTypes, based on the Grid and Row layout options in Bootstrap 3. Cell entries can also be
	 * "empty" indicating that we want to separate cells by empty space.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"array"
	 */
	_layout : "array",

	/**
	 * Flag indicating whether to use a timer in this game (true) or not (false).
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"boolean"
	 */
	_useTimer : "boolean",

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * This function will perform a check of specified logic conditions that, when
	 * evaluated to `true`, indicates that the Player can put a set of Cards on
	 * a specified Stack.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"function"
	 */
	cardsCanDropIntoStack : "function",

	/**
	 * This function will perform a check of specified logic conditions that, when 
	 * evaluated to `true`, indicates that the Player has won the current game.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"function"
	 */
	gameWon : "function"
});
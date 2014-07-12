/**
 * Interface for implmenting specific events in a game that are required for
 * the user to be able to play the game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		IModelRules
 * @name		IModelRules
 * @version		
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
	 * @default		"number"
	 */
	_cardNumAbleToMoveFromInPlayStack : "number",

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
	 * @default		"object"
	 */
	_stacks : "object",

	/**
	 * Describes the visual layout of the Stacks on the game board. A 2D array of arrays containing
	 * StackTypes, based on the Grid and Row layout options in Bootstrap 3. Cell entries can also be
	 * "empty" indicating that we want to separate cells by empty space.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"object"
	 */
	_layout : "object",

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

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
	gameWon : "function",

	/**
	 * This method will be run when a user triggers a `mousedown` or `tapdown` event on a single Card.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"function"
	 */
	mouseOrTapDownCard : "function",

	/**
	 * This method will be run when a user triggers a `mouseup` or `tapup` event on a single Card.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"function"
	 */
	mouseOrTapUpCard : "function",

	/**
	 * This method will be run when a user triggers a `mousedown` or `tapdown` event on a Stack of Cards.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"function"
	 */
	mouseOrTapDownStack : "function",

	/**
	 * This method will be run when a user triggers a `mouseup` or `tapup` event on a Stack of Cards.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"function"
	 */
	mouseOrTapUpStack : "function",

	/**
	 * This method will be run when a user triggers a `mousemove` or `drag` event on a Card or Stack of Cards.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"function"
	 */
	mouseMoveOrDrag : "function"
});
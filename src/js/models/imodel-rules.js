/**
 * Interface for implementing the Stack model for the layout of a card game.
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

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------
});
/**
 * Interface for implmenting specific events in a game that are required for
 * the user to be able to play the game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		IViewRules
 * @name		IViewRules
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var IViewRules = Interface({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * This name of the Variation.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"string"
	 */
	_variationName : "string",

	/**
	 * The array of cards needed for this specific Variation.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"array"
	 */
	_cards : "array",

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * This method will be run when a user triggers a `mousedown` or `tapdown` event on a single Card.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"function"
	 */
	mouseOrTapDownCard : "function",

	/**
	 * This method will be run when a user triggers a `mouseup` or `tapup` event on a single Card.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"function"
	 */
	mouseOrTapUpCard : "function",

	/**
	 * This method will be run when a user triggers a `mousedown` or `tapdown` event on a Stack of Cards.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"function"
	 */
	mouseOrTapDownStack : "function",

	/**
	 * This method will be run when a user triggers a `mouseup` or `tapup` event on a Stack of Cards.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"function"
	 */
	mouseOrTapUpStack : "function",

	/**
	 * This method will be run when a user triggers a `mousemove` or `drag` event on a Card or Stack of Cards.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"function"
	 */
	mouseMoveOrDrag : "function"
});
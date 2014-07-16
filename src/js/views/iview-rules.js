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
	 * This method will be run when a user triggers a `mousedown` or `touchstart` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"function"
	 */
	mouseDownTouchStartEventHandler : "function",

	/**
	 * This method will be run when a user triggers a `mouseup` or `touchend` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"function"
	 */
	mouseUpTouchEndEventHandler : "function",

	/**
	 * This method will be run when a user triggers a `click` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"function"
	 */
	mouseClickEventHandler : "function",

	/**
	 * This method will be run when a user triggers a `mousemove` or `touchmove` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		
	 * @default		"function"
	 */
	mouseMoveTouchMoveEventHandler : "function"
});
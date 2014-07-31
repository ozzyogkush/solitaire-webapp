/**
 * Interface for implmenting specific events in a game that are required for
 * the user to be able to play the game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		IViewRules
 * @name		IViewRules
 * @version		0.2
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
	 * @since		0.2
	 * @default		"string"
	 */
	_variationName : "string",

	/**
	 * The array of cards needed for this specific Variation.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
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
	 * @since		0.2
	 * @default		"function"
	 */
	mouseDownTouchStartEventHandler : "function",

	/**
	 * This method will be run when a user triggers a `mouseup` or `touchend` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
	 * @default		"function"
	 */
	mouseUpTouchEndEventHandler : "function",

	/**
	 * This method will be run when a user triggers a `click` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
	 * @default		"function"
	 */
	mouseClickEventHandler : "function",

	/**
	 * This method will be run when a user triggers a `mousemove` or `touchmove` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
	 * @default		"function"
	 */
	mouseMoveTouchMoveEventHandler : "function"
});
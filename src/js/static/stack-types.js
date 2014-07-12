/**
 * Static object that represents all available Stack types in a game of cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		StackTypes
 * @name		StackTypes
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var StackTypes = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The "Dealer" type of Stack. Cards can be added to the top or bottom of the Stack.
	 *
	 * @private
	 * @type		String
	 * @memberOf	StackTypes
	 * @since		
	 * @default		"dealer"
	 */
	dealer : "dealer",

	/**
	 * The "Draw" type of Stack - the currently drawn set of cards in the rotation.
	 *
	 * @private
	 * @type		String
	 * @memberOf	StackTypes
	 * @since		
	 * @default		"dealer"
	 */
	draw : "draw",

	/**
	 * The "In PLay" type of Stack - meaning what the Player is actively holding or manipulating.
	 *
	 * @private
	 * @type		String
	 * @memberOf	StackTypes
	 * @since		
	 * @default		"inPlay"
	 */
	inPlay : "inPlay",

	/**
	 * The "Foundation" type of Stack - to which the Player moves cards to win the game.
	 *
	 * @private
	 * @type		String
	 * @memberOf	StackTypes
	 * @since		
	 * @default		"foundation"
	 */
	foundation : "foundation",

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Creates a new StackTypes object and returns the statically created object.
	 *
	 * @constructor
	 * @public
	 * @memberOf	StackTypes
	 * @since		
	 *
	 * @return		Object									The public API for the StackTypes static object.
	 */
	__construct : function()
	{
		// Return the static object.
		return {
			dealer : this.dealer,
			draw : this.draw,
			inPlay : this.inPlay,
			foundation : this.foundation
		};
	}

	/** Public Functions **/
});
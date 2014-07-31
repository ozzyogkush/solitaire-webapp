/**
 * Static object that represents all available Stack types in a game of cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		StackTypes
 * @name		StackTypes
 * @version		0.2
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
	 * @type		StackType
	 * @memberOf	StackTypes
	 * @since		0.2
	 * @default		null
	 */
	dealer : null,

	/**
	 * Returns the `dealer` property.
	 * 
	 * @public
	 * @memberOf	StackTypes
	 * @since		0.2
	 *
	 * @return		StackType		this.dealer		The `dealer` StackType object.
	 */
	getDealer : function()
	{
		return this.dealer;
	},

	/**
	 * The "Draw" type of Stack - the currently drawn set of cards in the rotation.
	 *
	 * @private
	 * @type		StackType
	 * @memberOf	StackTypes
	 * @since		0.2
	 * @default		null
	 */
	draw : null,

	/**
	 * Returns the `draw` property.
	 * 
	 * @public
	 * @memberOf	StackTypes
	 * @since		0.2
	 *
	 * @return		StackType		this.draw		The `draw` StackType object.
	 */
	getDraw : function()
	{
		return this.draw;
	},

	/**
	 * The "In Play" type of Stack - meaning what the Player is actively holding or manipulating.
	 *
	 * @private
	 * @type		StackType
	 * @memberOf	StackTypes
	 * @since		0.2
	 * @default		null
	 */
	inPlay : null,

	/**
	 * Returns the `inPlay` property.
	 * 
	 * @public
	 * @memberOf	StackTypes
	 * @since		0.2
	 *
	 * @return		StackType		this.inPlay		The `inPlay` StackType object.
	 */
	getInPlay : function()
	{
		return this.inPlay;
	},

	/**
	 * The "Foundation" type of Stack - to which the Player moves cards to win the game.
	 *
	 * @private
	 * @type		StackType
	 * @memberOf	StackTypes
	 * @since		0.2
	 * @default		null
	 */
	foundation : null,

	/**
	 * Returns the `foundation` property.
	 * 
	 * @public
	 * @memberOf	StackTypes
	 * @since		0.2
	 *
	 * @return		StackType		this.foundation		The `foundation` StackType object.
	 */
	getFoundation : function()
	{
		return this.foundation;
	},

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
	 * @since		0.2
	 *
	 * @return		Object									The public API for the StackTypes static object.
	 */
	__construct : function()
	{
		this.dealer = new StackType("dealer");
		this.draw = new StackType("draw");
		this.inPlay = new StackType("inPlay");
		this.foundation = new StackType("foundation");

		// Return the static object.
		return {
			dealer : this.getDealer(),
			draw : this.getDraw(),
			inPlay : this.getInPlay(),
			foundation : this.getFoundation()
		};
	}

	/** Public Functions **/
});
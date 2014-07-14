/**
 * Represents a Suit in a deck of cards. A Suit consists of 13 individual cards;
 * the numbers 2 - 10, a Jack, Queen, King, and an Ace.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		Suit
 * @name		Suit
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var Suit = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------
	
	/**
	 * The name of the suit.
	 *
	 * @private
	 * @type		String
	 * @memberOf	Suit
	 * @since		
	 * @default		null
	 */
	suitName : null,

	/**
	 * Sets the `suitName` property to the value of `n`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Suit
	 * @since		
	 * @param		String			n			The name of the Suit. Required.
	 */
	__setSuitName : function(n)
	{
		if (typeof n !== "string") {
			throw new TypeException("string", 'Suit.__setSuitName');
		}
		this.suitName = n;
	},

	/**
	 * Returns the `suitName` property.
	 * 
	 * @public
	 * @memberOf	Suit
	 * @since		
	 *
	 * @return		String			suitName			Returns the name string.
	 */
	getSuitName : function()
	{
		return this.suitName;
	},

	/**
	 * The color of the suit.
	 *
	 * @private
	 * @type		Color
	 * @memberOf	Suit
	 * @since		
	 * @default		null
	 */
	color : null,

	/**
	 * Sets the `color` property to the value of `c`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Suit
	 * @since		
	 * @param		Color			c			The color of the Suit. Required.
	 */
	__setColor : function(c)
	{
		if (typeof c !== "object" || c.parse === undefined || typeof c.parse !== 'function') {
			throw new TypeException("Color", 'Suit.__setColor');
		}
		this.color = c;
	},

	/**
	 * Returns the `color` property.
	 * 
	 * @public
	 * @memberOf	Suit
	 * @since		
	 *
	 * @return		Color			color			Returns the color object.
	 */
	getColor : function()
	{
		return this.color;
	},
	
	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Creates a new Suit object and returns the public methods as an object.
	 *
	 * @constructor
	 * @public
	 * @memberOf	Suit
	 * @since		
	 *
	 * @param		String				suitName		The name of the Suit. Required.
	 * @param		Color				color			The color of the Suit. Required.
	 *
	 * @return		Object								The public API for an object of this type.
	 */
	__construct : function(suitName, color)
	{
		if (suitName === undefined) {
			throw new CardGameException('Suit name cannot be null.', 'Suit.__construct');
		}

		if (color === undefined) {
			throw new CardGameException('Color cannot be null.', 'Suit.__construct');
		}

		// We have a valid name and color, so set those properties.
		this.__setSuitName(suitName);
		this.__setColor(color);
	}

	/** Private Functions **/

	/** Public Functions **/
});
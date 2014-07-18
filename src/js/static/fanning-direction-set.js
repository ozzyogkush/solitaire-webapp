/**
 * Static object that represents all available FanningDirections in games of Cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		FanningDirectionSet
 * @name		FanningDirectionSet
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var FanningDirectionSet = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The FanningDirection object representing `up`.
	 *
	 * @private
	 * @type		FanningDirection
	 * @memberOf	FanningDirectionSet
	 * @since		
	 * @default		null
	 */
	up : null,

	/**
	 * Returns the `up` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		
	 *
	 * @return		FanningDirection		this.up		The `up` FanningDirection object.
	 */
	getUp : function()
	{
		return this.up;
	},

	/**
	 * The FanningDirection object representing `down`.
	 *
	 * @private
	 * @type		FanningDirection
	 * @memberOf	FanningDirectionSet
	 * @since		
	 * @default		null
	 */
	down : null,

	/**
	 * Returns the `down` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		
	 *
	 * @return		FanningDirection		this.down		The `down` FanningDirection object.
	 */
	getDown : function()
	{
		return this.down;
	},

	/**
	 * The FanningDirection object representing `left`.
	 *
	 * @private
	 * @type		FanningDirection
	 * @memberOf	FanningDirectionSet
	 * @since		
	 * @default		null
	 */
	left : null,

	/**
	 * Returns the `left` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		
	 *
	 * @return		FanningDirection		this.left		The `left` FanningDirection object.
	 */
	getLeft : function()
	{
		return this.left;
	},

	/**
	 * The FanningDirection object representing `right`.
	 *
	 * @private
	 * @type		FanningDirection
	 * @memberOf	FanningDirectionSet
	 * @since		
	 * @default		null
	 */
	right : null,

	/**
	 * Returns the `right` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		
	 *
	 * @return		FanningDirection		this.right		The `right` FanningDirection object.
	 */
	getRight : function()
	{
		return this.right;
	},

	/**
	 * The FanningDirection object representing `none`, or no fanning direction.
	 *
	 * @private
	 * @type		FanningDirection
	 * @memberOf	FanningDirectionSet
	 * @since		
	 * @default		null
	 */
	none : null,

	/**
	 * Returns the `none` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		
	 *
	 * @return		FanningDirection		this.none		The `none` FanningDirection object.
	 */
	getNone : function()
	{
		return this.none;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Creates a new FanningDirectionSet object and returns the statically created object.
	 *
	 * @constructor
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		
	 *
	 * @return		Object									The public API for the FanningDirectionSet static object.
	 */
	__construct : function()
	{
		// Assign the cardnumber objects to each property
		this.up = new FanningDirection('up');
		this.down = new FanningDirection('down');
		this.left = new FanningDirection('left');
		this.right = new FanningDirection('right');
		this.none = new FanningDirection('none');

		// Return the static object.
		return {
			up : this.getUp(),
			down : this.getDown(),
			left : this.getLeft(),
			right : this.getRight(),
			none : this.getNone()
		};
	}

	/** Public Functions **/
});
/**
 * Represents a Direction that a Stack of Cards can be fanned.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		FanningDirection
 * @name		FanningDirection
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var FanningDirection = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The string indicating the english description of the direction to fan stacks of cards.
	 *
	 * @private
	 * @type		String
	 * @memberOf	FanningDirection
	 * @since		0.2
	 * @default		null
	 */
	_fanningDirectionName : null,

	/**
	 * Sets the `_fanningDirectionName` property to the value of `fdn`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	FanningDirection
	 * @since		0.2
	 * @param		String			fdn			The color of the FanningDirection. Required.
	 */
	__setFanningDirectionName : function(fdn)
	{
		if (typeof fdn !== "string") {
			throw new TypeException("string", 'FanningDirection.__setFanningDirectionName');
		}
		this._fanningDirectionName = fdn;
	},

	/**
	 * Returns the `_fanningDirectionName` property.
	 * 
	 * @public
	 * @memberOf	FanningDirection
	 * @since		0.2
	 *
	 * @return		String			_fanningDirectionName			Returns the `_fanningDirectionName` property.
	 */
	getFanningDirectionName : function()
	{
		return this._fanningDirectionName;
	},
	
	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Creates a new FanningDirection object and returns the public methods as an object.
	 *
	 * @constructor
	 * @public
	 * @memberOf	FanningDirection
	 * @since		0.2
	 *
	 * @param		String			fanningDirectionName		The english description of the direction of the FanningDirection. Required.
	 */
	__construct : function(fanningDirectionName)
	{
		if (fanningDirectionName === undefined) {
			throw new CardGameException('Fanning Direction name is required.', 'FanningDirection.__construct');
		}

		this.__setFanningDirectionName(fanningDirectionName);
	}

	/** Private Functions **/

	/** Public Functions **/
});
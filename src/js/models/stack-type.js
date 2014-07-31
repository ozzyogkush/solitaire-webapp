/**
 * Represents a type of Stack that can exist in a game of Cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		StackType
 * @name		StackType
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var StackType = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The string indicating the english description of the type of Stack this represents.
	 *
	 * @private
	 * @type		String
	 * @memberOf	StackType
	 * @since		0.2
	 * @default		null
	 */
	_stackTypeName : null,

	/**
	 * Sets the `_stackTypeName` property to the value of `stn`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	StackType
	 * @since		0.2
	 * @param		String			stn			The english description of the type of Stack this represents. Required.
	 */
	__setStackTypeName : function(stn)
	{
		if (typeof stn !== "string") {
			throw new TypeException("string", 'StackType.__setStackTypeName');
		}
		this._stackTypeName = stn;
	},

	/**
	 * Returns the `_stackTypeName` property.
	 * 
	 * @public
	 * @memberOf	StackType
	 * @since		0.2
	 *
	 * @return		String			_stackTypeName			Returns the `_stackTypeName` property.
	 */
	getStackTypeName : function()
	{
		return this._stackTypeName;
	},
	
	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Creates a new StackType object and returns the public methods as an object.
	 *
	 * @constructor
	 * @public
	 * @memberOf	StackType
	 * @since		0.2
	 *
	 * @param		String			stackTypeName		The english description of the type of the Stack. Required.
	 */
	__construct : function(stackTypeName)
	{
		if (stackTypeName === undefined) {
			throw new CardGameException('Stack Type name is required.', 'StackType.__construct');
		}

		this.__setStackTypeName(stackTypeName);
	}

	/** Private Functions **/

	/** Public Functions **/
});
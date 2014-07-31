/**
 * A custom Exception class for use on Card Game and its Variations. Extends the
 * `CardGameException` class. Should be used when the type of a variable does not 
 * match the expected type.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		TypeException
 * @name		TypeException
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var TypeException = Class({ extends : CardGameException },
{
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------
	
	/**
	 * The type of data that the throwing function was expecting.
	 *
	 * @private
	 * @type		String
	 * @memberOf	TypeException
	 * @since		0.2
	 * @default		null
	 */
	type : null,

	/**
	 * Returns the `type` property.
	 * 
	 * @public
	 * @memberOf	TypeException
	 * @since		0.2
	 *
	 * @return		mixed			type			Returns the type.
	 */
	getType : function()
	{
		return this.type;
	},
	
	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Constructor. Sets the instance variables to the passed in values.
	 *
	 * @public
	 * @memberOf	TypeException
	 * @since		0.2
	 *
	 * @param		String				expectedType		The message or data object used to describe the exception. Required.
	 * @param		String				callingMethod		The name of the method triggering the exception. Required.
	 */
	__construct : function(expectedType, callingMethod) 
	{
		if (typeof expectedType !== "string") {
			throw "TypeException.__construct() - The `expectedType` parameter must be a string.";
		}

		var message = "Type mismatch: expected type is `" + expectedType + "`."; 

		// Call the parent class's constructor...
		this.super('__construct', message, callingMethod);

		// Set the `type` property.
		this.type = expectedType;
	}

	/** Private Functions **/

	/** Public Functions **/
});
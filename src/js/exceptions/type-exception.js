/**
 * A custom Exception class for use on Card Game and its Variations. Extends the
 * `CardGameException` class. Should be used when the type of a variable does not 
 * match the expected type.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		TypeException
 * @name		TypeException
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var TypeException = Class({ extends : CardGameException },
{
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------
	
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
	 * @since		
	 *
	 * @param		String				expectedType		The message or data object used to describe the exception. Required.
	 * @param		String				callingMethod		The name of the method triggering the exception. Required.
	 */
	__construct : function(expectedType, callingMethod) 
	{
		if (typeof expectedType !== "string") {
			throw "The `expectedType` parameter must be a string.";
		}

		var message = "Type mismatch: expected type is `" + expectedType + "`."; 

		// Call the parent class's constructor...
		this.super('__construct', message, callingMethod);
	}

	/** Private Functions **/

	/** Public Functions **/
});
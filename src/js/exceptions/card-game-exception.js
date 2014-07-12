/**
 * A custom Exception class for use on Card Game and its Variations. Extends the
 * `CardGameDebugMessage` class.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardGameException
 * @name		CardGameException
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var CardGameException = Class({ extends : CardGameDebugMessage },
{
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------
	
	/**
	 * The severity of the exception.
	 *
	 * @private
	 * @type		CardGameExceptionSeverity
	 * @memberOf	CardGameException
	 * @since		
	 * @default		CardGameException.ERROR
	 */
	severity : CardGameExceptionSeverity.ERROR,

	/**
	 * Returns the `severity` property.
	 * 
	 * @public
	 * @memberOf	CardGameException
	 * @since		
	 *
	 * @return		mixed			message			Returns the severity.
	 */
	getSeverity : function()
	{
		return this.severity;
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
	 * @memberOf	CardGameException
	 * @since		
	 *
	 * @param		mixed				message				The message or data object used to describe the exception. Required.
	 * @param		String				callingMethod		The name of the method triggering the exception. Required.
	 * @param		Object				severity			The severity of the exception. Optional. Default `CardGameExceptionSeverity.ERROR`.
	 */
	__construct : function(message, callingMethod, severity) 
	{
		// Call the CardGameDebugMessage constructor...
		this.super('__construct', message, callingMethod);
		
		if (severity !== undefined && typeof severity === "object") {
			this.severity = severity;
		}
	},

	/** Private Functions **/

	/** Public Functions **/

	/**
	 * Constructs a string based on the values of the class instance,
	 * to be used for logging or alerting a user in a debugging context.
	 *
	 * Can override if absolutely necessary. Overrides the parent method.
	 *
	 * @public
	 * @memberOf	CardGameException
	 * @since		
	 *
	 * @returns		String				string_val			Constructed message including prefix, calling method, and exception message.
	 */
	toString : function()
	{

		var prefix = (this.getSeverity().prefix !== undefined ? this.getSeverity().prefix : "Error: ");
		var stringVal = prefix + this.getCallingMethod() + "() - " + this.getMessage();
	
		return stringVal;
	}
});
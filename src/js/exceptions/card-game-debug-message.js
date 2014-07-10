/**
 * A custom debug message class for use on the Card Game and its Variations. For use
 * when you want to send a debug message that isn't considered an exception or error
 * to the console, in a consistent way.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardGameDebugMessage
 * @name		CardGameDebugMessage
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var CardGameDebugMessage = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The message or data object used to describe the debug situation.
	 *
	 * @private
	 * @type		String|Object|Array
	 * @memberOf	CardGameDebugMessage
	 * @since		
	 * @default		null
	 */
	message : null,

	/**
	 * Returns the `message` property.
	 * 
	 * @public
	 * @memberOf	CardGameDebugMessage
	 * @since		
	 *
	 * @return		mixed			message			Returns the message.
	 */
	getMessage : function()
	{
		return this.message;
	},

	/**
	 * The name of the method triggering the debug message. Should be
	 * namespaced where possible.
	 *
	 * @private
	 * @type		String
	 * @memberOf	CardGameDebugMessage
	 * @since		
	 * @default		null
	 */
	callingMethod : null,

	/**
	 * Returns the `callingMethod` property.
	 * 
	 * @public
	 * @memberOf	CardGameDebugMessage
	 * @since		
	 *
	 * @return		mixed			message			Returns the calling method.
	 */
	getCallingMethod : function()
	{
		return this.callingMethod;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Sets the instance variables to the passed in values.
	 *
	 * @constructor
	 * @public
	 * @memberOf	CardGameDebugMessage
	 * @since		
	 *
	 * @param		mixed				message				The message or data object used to describe the exception. Required.
	 * @param		String				callingMethod		The name of the method triggering the exception. Required.
	 */
	__construct : function(message, callingMethod)
	{
		if (message === null ||
			(typeof message !== "string" &&
			 typeof message !== "object")) {
			throw "CardGameDebugMessage.__construct() - The required `message` parameter must be string, array, or object.";
		}
		
		if (callingMethod === null ||
			typeof callingMethod !== "string") {
			throw "CardGameDebugMessage.__construct() - The required `callingMethod` parameter must be a string.";
		}

		// Both the message and calling method parameters are valid, so set the properties to the passed in vars.
		this.message = message;
		this.callingMethod = callingMethod;
	},

	/** Private Functions **/

	/** Public Functions **/

	/**
	 * Constructs a string based on the values of the class instance,
	 * to be used for logging or alerting a user in a debugging context.
	 *
	 * Can override if absolutely necessary.
	 *
	 * @public
	 * @memberOf	CardGameDebugMessage
	 * @since		
	 *
	 * @returns		String				string_val			Constructed message including prefix, calling method, and exception message.
	 */
	toString : function()
	{
		var string_val = "Debug: " + this.getCallingMethod() + "() - " + this.getMessage();
		
		return string_val;
	},

	/**
	 * Depending on the type of message, returns either the stringified version
	 * of the `CardGameDebugMessage` object, or the `CardGameDebugMessage` object
	 * itself.
	 *
	 * Can override if absolutely necessary.
	 *
	 * @see			CardGameDebugMessage.toString()
	 *
	 * @public
	 * @memberOf	CardGameDebugMessage
	 * @since		
	 *
	 * @returns		mixed				tbr					The most console-friendly version of this instance of the CardGameDebugMessage class.
	 */
	toConsole : function()
	{
		var tbr = this;
		
		switch (typeof this.getMessage()) {
			case "null":
			case "object":
				tbr = this;
				break;
			case "string":
				tbr = this.toString();
				break;
		}
		
		return tbr;
	}
});
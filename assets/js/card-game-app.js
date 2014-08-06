/**
 * A custom debug message class for use on the Card Game and its Variations. For use
 * when you want to send a debug message that isn't considered an exception or error
 * to the console, in a consistent way.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardGameDebugMessage
 * @name		CardGameDebugMessage
 * @version		0.2
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
	 * @since		0.2
	 * @default		null
	 */
	message : null,

	/**
	 * Returns the `message` property.
	 * 
	 * @public
	 * @memberOf	CardGameDebugMessage
	 * @since		0.2
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
	 * @since		0.2
	 * @default		null
	 */
	callingMethod : null,

	/**
	 * Returns the `callingMethod` property.
	 * 
	 * @public
	 * @memberOf	CardGameDebugMessage
	 * @since		0.2
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
	 * @since		0.2
	 *
	 * @param		mixed				message				The message or data object used to describe the exception. Required.
	 * @param		String				callingMethod		The name of the method triggering the exception. Required.
	 */
	__construct : function(message, callingMethod)
	{
		if (message === undefined ||
			(typeof message !== "string" &&
			 typeof message !== "object")) {
			throw "CardGameDebugMessage.__construct() - The required `message` parameter must be string, array, or object.";
		}
		
		if (callingMethod === undefined ||
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
	 * @since		0.2
	 *
	 * @returns		String				string_val			Constructed message including prefix, calling method, and exception message.
	 */
	toString : function()
	{
		var stringVal = "Debug: " + this.getCallingMethod() + "() - " + this.getMessage();
		
		return stringVal;
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
	 * @since		0.2
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
});;
/**
 * Contains severity information for `CardGameException` objects. Each defined
 * severity level needs to contain a unique `code` value, and a `prefix`.
 *
 * Prefixes are used for constructing log message strings.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardGameExceptionSeverity
 * @name		CardGameExceptionSeverity
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var CardGameExceptionSeverity = {
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Info severity. To be used when the user needs to know something happened,
	 * but it's not a problem.
	 *
	 * Code 0.
	 *
	 * @public
	 * @type		Object
	 * @memberOf	CardGameExceptionSeverity
	 * @since		0.2
	 */
	INFO : {
		code: 0,
		prefix : "Info: "
	},
	
	/**
	 * Warning severity. To be used when there is a slight problem and the user
	 * needs to know that it happened, but recovery is possible.
	 *
	 * Code 1.
	 *
	 * @public
	 * @type		Object
	 * @memberOf	CardGameExceptionSeverity
	 * @since		0.2
	 */
	WARNING : {
		code: 1,
		prefix : "Warning: "
	},
	
	/**
	 * Error severity. To be used when there is a serious problem, the user needs
	 * to know it happened, and recovery is not possible.
	 *
	 * Code 2.
	 *
	 * @public
	 * @type		Object
	 * @memberOf	CardGameExceptionSeverity
	 * @since		0.2
	 */
	ERROR : {
		code: 2,
		prefix : "Error: "
	},
	
	/**
	 * Speed severity. To be used when methods take too long to complete (compared to
	 * some predefined method speed).
	 *
	 * Code 3.
	 *
	 * @public
	 * @type		Object
	 * @memberOf	CardGameExceptionSeverity
	 * @since		0.2
	 */
	SPEED : {
		code : 3,
		prefix : "Speed: "
	}
	
	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------
};;
/**
 * A custom Exception class for use on Card Game and its Variations. Extends the
 * `CardGameDebugMessage` class.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardGameException
 * @name		CardGameException
 * @version		0.2
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
	 * @since		0.2
	 * @default		CardGameException.ERROR
	 */
	severity : CardGameExceptionSeverity.ERROR,

	/**
	 * Returns the `severity` property.
	 * 
	 * @public
	 * @memberOf	CardGameException
	 * @since		0.2
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
	 * @since		0.2
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
	 * @since		0.2
	 *
	 * @returns		String				string_val			Constructed message including prefix, calling method, and exception message.
	 */
	toString : function()
	{

		var prefix = (this.getSeverity().prefix !== undefined ? this.getSeverity().prefix : "Error: ");
		var stringVal = prefix + this.getCallingMethod() + "() - " + this.getMessage();
	
		return stringVal;
	}
});;
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
});;
/**
 * Interface for implementing the Stack model for the layout of a card game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		IModelRules
 * @name		IModelRules
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var IModelRules = Interface({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The number of full Decks of Cards that the game will require to be played.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"number"
	 */
	_numDecksInGame : "number",

	/**
	 * Flag indicating whether aces are highher than kings (true) or lower than twos (false).
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"boolean"
	 */
	_acesHigh : "boolean",

	/**
	 * Flag indicating whether the game requires Joker cards.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"boolean"
	 */
	_includeJokers : "boolean",

	/**
	 * The list of Stack objects that make up the play area.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"array"
	 */
	_stackkModel : "array",

	/**
	 * Describes the visual layout of the Stacks on the game board. A 2D array of arrays containing
	 * StackTypes, based on the Grid and Row layout options in Bootstrap 3. Cell entries can also be
	 * "empty" indicating that we want to separate cells by empty space.
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"array"
	 */
	_layout : "array",

	/**
	 * Flag indicating whether to use a timer in this game (true) or not (false).
	 *
	 * @private
	 * @type		string
	 * @memberOf	IModelRules
	 * @since		
	 * @default		"boolean"
	 */
	_useTimer : "boolean"

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------
});;
/**
 * Represents a CardNumber in a deck of cards. A CardNumber contains a card value
 * of 1 - 13 if aces are low, or 2 - 14 if aces are high.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardNumber
 * @name		CardNumber
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var CardNumber = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------
	
	/**
	 * The numeric value of a Card.
	 *
	 * @private
	 * @type		String
	 * @memberOf	CardNumber
	 * @since		0.2
	 * @default		null
	 */
	_cardValue : null,

	/**
	 * Sets the `_cardValue` property to the value of `cv`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardNumber
	 * @since		0.2
	 * @param		Integer			cv			The numeric value of the CardNumber. Required.
	 */
	__setCardValue : function(cv)
	{
		var parsed = null;
		if (typeof cv !== "number" || isNaN(parsed = parseInt(cv))) {
			throw new TypeException("Integer", "CardNumber.__setCardValue");
		}
		this._cardValue = cv;
	},

	/**
	 * Returns the `_cardValue` property.
	 * 
	 * @public
	 * @memberOf	CardNumber
	 * @since		0.2
	 *
	 * @return		Integer			_cardValue			Returns the `_cardValue` property.
	 */
	getCardValue : function()
	{
		return this._cardValue;
	},

	/**
	 * The name of the Card Number.
	 *
	 * @private
	 * @type		String
	 * @memberOf	CardNumber
	 * @since		0.2
	 * @default		null
	 */
	_cardNumberName : null,

	/**
	 * Sets the `_cardNumberName` property to the value of `na`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardNumber
	 * @since		0.2
	 * @param		String			na			The color of the CardNumber. Required.
	 */
	__setCardNumberName : function(na)
	{
		if (typeof na !== "string") {
			throw new TypeException("string", 'CardNumber.__setCardNumberName');
		}
		this._cardNumberName = na;
	},

	/**
	 * Returns the `_cardNumberName` property.
	 * 
	 * @public
	 * @memberOf	CardNumber
	 * @since		0.2
	 *
	 * @return		String			_cardNumberName			Returns the `_cardNumberName` property.
	 */
	getCardNumberName : function()
	{
		return this._cardNumberName;
	},
	
	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Creates a new CardNumber object and returns the public methods as an object.
	 *
	 * @constructor
	 * @public
	 * @memberOf	CardNumber
	 * @since		0.2
	 *
	 * @param		Integer				cardValue			The value of the CardNumber. Required.
	 * @param		String				cardNumberName		The name of the CardNumber. Required.
	 */
	__construct : function(cardValue, cardNumberName)
	{
		if (cardValue === undefined) {
			throw new CardGameException('CardNumber value is required.', 'CardNumber.__construct');
		}

		if (cardNumberName === undefined) {
			throw new CardGameException('CardNumber name is required.', 'CardNumber.__construct');
		}

		// We have a valid name and color, so set those properties.
		this.__setCardValue(cardValue);
		this.__setCardNumberName(cardNumberName);
	}

	/** Private Functions **/

	/** Public Functions **/
});;
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
});;
/**
 * Abstract base class for implementing the Stack model for the layout of a card game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		GameRules
 * @name		GameRules
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var GameRules = Class({ implements : IModelRules }, {
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The number of full Decks of Cards that the game will require to be played.
	 *
	 * @private
	 * @type		Integer
	 * @memberOf	GameRules
	 * @since		0.2
	 * @default		null
	 */
	_numDecksInGame : null,
	
	/**
	 * Sets the `_numDecksInGame` property to the value of `n`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		0.2
	 * 
	 * @param		Integer			n			The number of decks of cards in the game. Required.
	 */
	__setNumDecksInGame : function(n)
	{
		var parsed = null;
		if (typeof n !== "number" || isNaN(parsed = parseInt(n))) {
			throw new TypeException("Integer", "GameRules.__setNumDecksInGame");
		}
		this._numDecksInGame = parsed;
	},
	
	/**
	 * Returns the `_numDecksInGame` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @return		Integer			_numDecksInGame				Returns the `_numDecksInGame` property.
	 */
	getNumDecksInGame : function()
	{
		return this._numDecksInGame;
	},

	/**
	 * Flag indicating whether the game requires Joker cards.
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	GameRules
	 * @since		0.2
	 * @default		null
	 */
	_includeJokers : null,
	
	/**
	 * Sets the `_includeJokers` property to the value of `ij`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		0.2
	 * 
	 * @param		Boolean			ij			The flag indicating whether to include Jokers. Required.
	 */
	__setIncludeJokers : function(ij)
	{
		if (typeof ij !== "boolean") {
			throw new TypeException("Boolean", "GameRules.__setIncludeJokers");
		}
		this._includeJokers = ij;
	},
	
	/**
	 * Returns the `_includeJokers` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @return		Boolean			_includeJokers		Returns the `_includeJokers` property.
	 */
	getIncludeJokers : function()
	{
		return this._includeJokers;
	},

	/**
	 * Flag indicating whether aces are highher than kings (true) or lower than twos (false).
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	GameRules
	 * @since		0.2
	 * @default		false
	 */
	_acesHigh : null,
	
	/**
	 * Sets the `_acesHigh` property to the value of `ah`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		0.2
	 * 
	 * @param		Boolean			ah			The flag indicating whether Aces are high. Required.
	 */
	__setAcesHigh : function(ah)
	{
		if (typeof ah !== "boolean") {
			throw new TypeException("Boolean", "GameRules.__setAcesHigh");
		}
		this._acesHigh = ah;
	},
	
	/**
	 * Returns the `_acesHigh` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @return		Boolean			_acesHigh		Returns the `_acesHigh` property.
	 */
	getAcesHigh : function()
	{
		return this._acesHigh;
	},

	/**
	 * The list of Stack objects that make up the play area.
	 *
	 * @private
	 * @type		Array
	 * @memberOf	GameRules
	 * @since		0.2
	 * @default		null
	 */
	_stackModel : null,
	
	/**
	 * Sets the `_stacks` property to the value of `st`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		0.2
	 * 
	 * @param		Array			st			The set of Stack objects making up the play area. Required.
	 */
	__setStackModel : function(st)
	{
		if ($.type(st) !== "array") {
			throw new TypeException("Array", "GameRules.__setStackModel");
		}
		this._stackModel = st;
	},
	
	/**
	 * Returns the `_stackModel` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @return		Array			_stackModel			Returns the `_stackModel` property.
	 */
	getStackModel : function()
	{
		return this._stackModel;
	},

	/**
	 * Describes the visual layout of the Stacks on the game board. A 2D array of arrays containing
	 * StackTypes, based on the Grid and Row layout options in Bootstrap 3. Cell entries can also be
	 * "empty" indicating that we want to separate cells by empty space.
	 *
	 * @private
	 * @type		Array
	 * @memberOf	GameRules
	 * @since		0.2
	 * @default		null
	 */
	_layout : null,
	
	/**
	 * Sets the `_layout` property to the value of `ly`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		0.2
	 * 
	 * @param		Array			ly			The description of the game layout based on StackTypes. Required.
	 */
	__setLayout : function(ly)
	{
		if ($.type(ly) !== "array") {
			throw new TypeException("Array", "GameRules.__setLayout");
		}
		this._layout = ly;
	},
	
	/**
	 * Returns the `_layout` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @return		Array			_layout		Returns the `_layout` property.
	 */
	getLayout : function()
	{
		return this._layout;
	},

	/**
	 * Flag indicating whether to use a timer in this game (true) or not (false).
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	GameRules
	 * @since		0.2
	 * @default		null
	 */
	_useTimer : null,
	
	/**
	 * Sets the `_useTimer` property to the value of `timer`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameRules
	 * @since		0.2
	 * 
	 * @param		Boolean			timer			The flag indicating whether or not to use a timer. Required.
	 */
	__setUseTimer : function(timer)
	{
		if (typeof timer !== "boolean") {
			throw new TypeException("Boolean", "GameRules.__setUseTimer");
		}
		this._useTimer = timer;
	},
	
	/**
	 * Returns the `_useTimer` property.
	 * 
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @return		Boolean			_useTimer		Returns the `_useTimer` property.
	 */
	getUseTimer : function()
	{
		return this._useTimer;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/** This is an abstract class and should never be instantiated as is. **/

	/**
	 * Initialize the object and create the stacks based on the model defined
	 * by the extended child class. This constructor should run AFTER the sub-class
	 * constructor generates and sets its layout
	 *
	 * @constructor
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 */
	__construct : function()
	{
		if (this.getLayout() !== null) {
			// actually create all the stacks and set to `stacks` property
			this.__setStackModel(this.__createStackModel());
		}
	},

	/** Private Functions **/

	/**
	 * Generates an object containing sets of Stacks. It will contain any number of each StackType
	 * as defined in the `_layout` property. Returns the generated object.
	 *
	 * @private
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @return		Array				stacks				Ordered sets of Stack objects in rows as defined by the layout
	 */
	__createStackModel : function()
	{
		var layout = this.getLayout();

		var stacks = null;

		if (layout !== null && layout.length > 0) {
            var stackTypes = new StackTypes();
            var fanningDirections = new FanningDirectionSet();
			stacks = [];

			for (var i = 0; i < layout.length; i++) {
				var row = layout[i];
				var stackRow = [];

				for (var j = 0; j < row.length; j++) {
					var layoutStackInfo = row[j];
					var st = null;
					if (layoutStackInfo !== null) {
						// Create the new Stack object...
						st = new Stack(
							stackTypes[layoutStackInfo.stackType.getStackTypeName()],
							fanningDirections[layoutStackInfo.fanningDirection.getFanningDirectionName()],
							layoutStackInfo.numCardsFacingDown,
							layoutStackInfo.numCardsFacingUp
						);	
					}

					// ...and add it to the set of Stacks in the current row.
					stackRow.push(st);
				}

				stacks.push(stackRow);
			}
		}

		return stacks;
	},

	/** Public Functions **/

	/**
	 * Find the Stack object in the `_stackModel` arrays which corresponds
	 * to the Stack that the Dealer uses to Deal cards.
	 *
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @return		Stack			dealerStack			The Stack element with StackType equal to 'dealer'. Returns null when no Dealer Stack is available.
	 */
	getDealerStack : function()
	{
		var stackTypes = new StackTypes();
		var dealerStack = this.getStacksByType(stackTypes.dealer)[0];

		return dealerStack;
	},

	/**
	 * Find all the Stack objects in the `_stackModel` arrays which correspond
	 * to the StackType passed in.
	 *
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @return		Array			stacksTBR			The Stack elements with the matched StackType. Returns an empty array if none are found.
	 */
	getStacksByType : function(stackType)
	{
		var stacksTBR = [];
		var stacks = this.getStackModel();

		if (stacks !== null && stacks.length > 0) {
			for (var i = 0; i < stacks.length; i++) {
				var stackRow = stacks[i];
				for (var j = 0; j < stackRow.length; j++) {
					var stack = stackRow[j];
					if (
						stack !== null &&
						stack.getStackType().getStackTypeName() === stackType.getStackTypeName()
					) {
						stacksTBR.push(stack);
					}
				}
			}
		}

		return stacksTBR;
	},
	
	/**
	 * Takes in a context and a method definition (or anonymous function)
	 * and runs it for all the Stack objects in the generated Stack model
	 * object. Safest way to ensure it hits all the Stacks.
	 *
	 * Also passes along the row index and cell (stack) index to the method
	 * so it can use it.
	 *
	 * @public
	 * @memberOf	GameRules
	 * @since		0.2
	 *
	 * @param		Object			context				The object/function which will become the value of `this` in the called method's scope.
	 * @param		Function		methodToRun			The method to run on each Stack object in the model.
	 */
	runForEachStackObject : function(context, methodToRun)
	{
		var allStacks = this.getStackModel();
		for (var i = 0, smlen = allStacks.length; i < smlen; i++) {
			for (var j = 0, rowlen = allStacks[i].length; j < rowlen; j++) {
				var curStack = allStacks[i][j];
				methodToRun.call(context, curStack, i, j);
			}
		}
	}

});;
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
});;
/**
 * Model class representing a single Stack of cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		Stack
 * @name		Stack
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var Stack = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * Indicates the classification type of this Stack.
	 *
	 * @private		
	 * @type		StackType
	 * @memberOf	Stack
	 * @since		0.2
	 * @default		null
	 */
	_stackType : null,
	
	/**
	 * Sets the `_stackType` property to the value of `st`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Stack
	 * @since		0.2
	 * 
	 * @param		StackType			st			The StackType classification for this Stack. Required.
	 */
	__setStackType : function(st)
	{
		if (! st.hasOwnProperty('instanceOf') || ! st.instanceOf(StackType)) {
			throw new TypeException("StackType", "Stack.__setStackType");
		}
		this._stackType = st;
	},
	
	/**
	 * Returns the `_stackType` property.
	 * 
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 *
	 * @return		StackType			_stackType		Returns the `_stackType` property.
	 */
	getStackType : function()
	{
		return this._stackType;
	},

	/**
	 * Indicates the FanningDirection this Stack will use in the display
	 *
	 * @private		
	 * @type		FanningDirection
	 * @memberOf	Stack
	 * @since		0.2
	 * @default		null
	 */
	_fanningDirection : null,
	
	/**
	 * Sets the `_fanningDirection` property to the value of `fd`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Stack
	 * @since		0.2
	 * 
	 * @param		FanningDirection			fd			The FanningDirection this Stack will use in the display. Required.
	 */
	__setFanningDirection : function(fd)
	{
		if (! fd.hasOwnProperty('instanceOf') || ! fd.instanceOf(FanningDirection)) {
			throw new TypeException("FanningDirection", "Stack.__setFanningDirection");
		}
		this._fanningDirection = fd;
	},
	
	/**
	 * Returns the `_fanningDirection` property.
	 * 
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 *
	 * @return		FanningDirection			_fanningDirection		Returns the `_fanningDirection` property.
	 */
	getFanningDirection : function()
	{
		return this._fanningDirection;
	},

	/**
	 * The number of cards to display face down at the start of the game.
	 *
	 * @private		
	 * @type		Integer
	 * @memberOf	Stack
	 * @since		0.2
	 * @default		0
	 */
	_numCardsFacingDown : 0,
	
	/**
	 * Sets the `_numCardsFacingDown` property to the value of `ncfd`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Stack
	 * @since		0.2
	 * 
	 * @param		Integer			ncfd			The number of cards to display face down at the start of the game. Required.
	 */
	__setNumCardsFacingDown : function(ncfd)
	{
		var parsed = null;
		if (typeof ncfd !== "number" || isNaN(parsed = parseInt(ncfd))) {
			throw new TypeException("Integer", "Stack.__setNumCardsFacingDown");
		}
		this._numCardsFacingDown = parsed;
	},
	
	/**
	 * Returns the `_numCardsFacingDown` property.
	 * 
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 *
	 * @return		Integer			_numCardsFacingDown		Returns the `_numCardsFacingDown` property.
	 */
	getNumCardsFacingDown : function()
	{
		return this._numCardsFacingDown;
	},

	/**
	 * The number of cards to display face up at the start of the game.
	 *
	 * @private		
	 * @type		Integer
	 * @memberOf	Stack
	 * @since		0.2
	 * @default		0
	 */
	_numCardsFacingUp : 0,
	
	/**
	 * Sets the `_numCardsFacingUp` property to the value of `ncfu`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Stack
	 * @since		0.2
	 * 
	 * @param		Integer			ncfu			The number of cards to display face up at the start of the game. Required.
	 */
	__setNumCardsFacingUp : function(ncfu)
	{
		var parsed = null;
		if (typeof ncfu !== "number" || isNaN(parsed = parseInt(ncfu))) {
			throw new TypeException("Integer", "Stack.__setNumCardsFacingUp");
		}
		this._numCardsFacingUp = parsed;
	},
	
	/**
	 * Returns the `_numCardsFacingUp` property.
	 * 
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 *
	 * @return		Integer			_numCardsFacingUp		Returns the `_numCardsFacingUp` property.
	 */
	getNumCardsFacingUp : function()
	{
		return this._numCardsFacingUp;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Initialize the Stack object with supplied parameters
	 *
	 * @constructor
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 */
	__construct : function(stackType, fanningDirection, numCardsFacingDown, numCardsFacingUp)
	{
		var callStackCurrent = "Stack.__construct";
		if (stackType === undefined) {
			throw new CardGameException('Stack Type param is required.', callStackCurrent);
		}
		this.__setStackType(stackType);

		// Set optional parameters
		var fanningDirections = new FanningDirectionSet();

		if (fanningDirection === undefined) {
			fanningDirection = fanningDirections.none;
		}
		this.__setFanningDirection(fanningDirection);

		if (numCardsFacingDown !== undefined) {
			this.__setNumCardsFacingDown(numCardsFacingDown);
		}
		if (numCardsFacingUp !== undefined) {
			this.__setNumCardsFacingUp(numCardsFacingUp);
		}
	}

	/** Private Functions **/

	/** Public Functions **/

});;
/**
 * Represents a Suit in a deck of cards. A Suit consists of 13 individual cards;
 * the numbers 2 - 10, a Jack, Queen, King, and an Ace.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		Suit
 * @name		Suit
 * @version		0.2
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
	 * @since		0.2
	 * @default		null
	 */
	suitName : null,

	/**
	 * Sets the `suitName` property to the value of `n`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Suit
	 * @since		0.2
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
	 * @since		0.2
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
	 * @since		0.2
	 * @default		null
	 */
	color : null,

	/**
	 * Sets the `color` property to the value of `c`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Suit
	 * @since		0.2
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
	 * @since		0.2
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
	 * @since		0.2
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
});;
/**
 * Interface for implmenting specific events in a game that are required for
 * the user to be able to play the game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		IViewRules
 * @name		IViewRules
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var IViewRules = Interface({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * This name of the Variation.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
	 * @default		"string"
	 */
	_variationName : "string",

	/**
	 * The array of cards needed for this specific Variation.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
	 * @default		"array"
	 */
	_cards : "array",

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * This method will be run when a user triggers a `mousedown` or `touchstart` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
	 * @default		"function"
	 */
	mouseDownTouchStartEventHandler : "function",

	/**
	 * This method will be run when a user triggers a `mouseup` or `touchend` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
	 * @default		"function"
	 */
	mouseUpTouchEndEventHandler : "function",

	/**
	 * This method will be run when a user triggers a `click` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
	 * @default		"function"
	 */
	mouseClickEventHandler : "function",

	/**
	 * This method will be run when a user triggers a `mousemove` or `touchmove` event.
	 *
	 * @public
	 * @type		string
	 * @memberOf	IViewRules
	 * @since		0.2
	 * @default		"function"
	 */
	mouseMoveTouchMoveEventHandler : "function"
});;
/**
 * Application view class for handling the overall DOM.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		AppView
 * @name		AppView
 * @version		0.3
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var AppView = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * jQuery extended HTML element that contains all game elements, menus,
	 * buttons, etc..
	 *
	 * @private		
	 * @type		jQuery
	 * @memberOf	AppView
	 * @since		0.2
	 * @default		null
	 */
	_container : null,
	
	/**
	 * Sets the `_container` property to the value of `$con`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	AppView
	 * @since		0.2
	 * 
	 * @param		jQuery			$con			The container element which contains all game elements. Required.
	 */
	__setContainer : function($con)
	{
		if (typeof $con !== "object" || $con.jquery === undefined) {
			throw new TypeException("jQuery", "AppView.__setContainer");
		}
		this._container = $con;
	},
	
	/**
	 * Returns the `_container` property.
	 * 
	 * @public
	 * @memberOf	AppView
	 * @since		0.2
	 *
	 * @return		jQuery			_container		Returns the `_container` property.
	 */
	getContainer : function()
	{
		return this._container;
	},

	/**
	 * jQuery extended HTML button elements that the Player will use to interact 
	 * with the Game system.
	 *
	 * @private		
	 * @type		jQuery
	 * @memberOf	AppView
	 * @since		0.2
	 * @default		null
	 */
	_buttons : null,
	
	/**
	 * Sets the `_buttons` property to the value of `$btns`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	AppView
	 * @since		0.2
	 * 
	 * @param		jQuery			$btns			The set of Buttons that the user will use to interact with the game. Required.
	 */
	__setButtons : function($btns)
	{
		// Make sure the param is null or a jQuery object instance
		if ($btns !== null &&
			(typeof $btns !== "object" || $btns.jquery === undefined)) {
			throw new TypeException("jQuery", "AppView.__setButtons");
		}
		if (this._buttons !== null) {
			// Always remove an existing set of Buttons first
			this.getContainer()
				.find('div')
				.filter('[data-card-game-view-element="button-container"]')
					.remove();
		}

		if ($btns !== null) {
			// Create the button container, add the buttons to it,
			// and add the button container to the DOM.
			var $buttonContainer = $('<div></div>')
				.attr('data-card-game-view-element', 'button-container')
				.append($btns);

			this.getContainer().prepend($buttonContainer);
		}

		// Set the object property to the supplied param either way
		this._buttons = $btns;
	},
	
	/**
	 * Returns the `_buttons` property.
	 * 
	 * @public
	 * @memberOf	AppView
	 * @since		0.2
	 *
	 * @return		jQuery			_buttons		Returns the `_buttons` property.
	 */
	getButtons : function()
	{
		return this._buttons;
	},

	/**
	 * jQuery extended HTML element which acts as a Twitter Bootstrap Modal.
	 * Used to let the user choose from a list of registered Games to load.
	 *
	 * @private		
	 * @type		jQuery
	 * @memberOf	AppView
	 * @since		0.2
	 * @default		null
	 */
	_gameChoiceModal : null,
	
	/**
	 * Sets the `_gameChoiceModal` property to the value of `$gcm` and
	 * adds it to the DOM. Will first remove any existing game choice modal
	 * elements.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	AppView
	 * @since		0.2
	 * 
	 * @param		jQuery			$gcm			The Modal element giving the Player a choice of games to load. Required.
	 */
	__setGameChoiceModal : function($gcm)
	{
		// Make sure the param is null or a jQuery object instance
		if ($gcm !== null &&
			(typeof $gcm !== "object" || $gcm.jquery === undefined)) {
			throw new TypeException("jQuery", "AppView.__setGameChoiceModal");
		}
		if (this._gameChoiceModal !== null) {
			// Always remove an existing game choice modal first
			this.getContainer()
				.find('div')
					.filter('[data-card-game-view-element="game-choice-modal"]')
					.remove();
		}

		if ($gcm !== null) {
			// If the supplied element doesn't already have the correct value
			// for the `data-card-game-view-element` attribute, set it.
			if ($gcm.attr('data-card-game-view-element') === null ||
				$gcm.attr('data-card-game-view-element') !== 'game-choice-modal') {
				$gcm.attr('data-card-game-view-element', 'game-choice-modal');
			}
			
			// Add the modal element to the DOM.
			this.getContainer().append($gcm);
		}

		// Set the object property to the supplied param either way
		this._gameChoiceModal = $gcm;
	},
	
	/**
	 * Returns the `_gameChoiceModal` property.
	 * 
	 * @public
	 * @memberOf	AppView
	 * @since		0.2
	 *
	 * @return		jQuery			_gameChoiceModal		Returns the `_gameChoiceModal` property.
	 */
	getGameChoiceModal : function()
	{
		return this._gameChoiceModal;
	},

	/**
	 * jQuery extended HTML element which displays the amount of time that's
	 * elapsed since the current game was started.
	 *
	 * @private		
	 * @type		jQuery
	 * @memberOf	AppView
	 * @since		0.2
	 * @default		null
	 */
	_timerContainer : null,
	
	/**
	 * Sets the `_timerContainer` property to the value of `$tc` and
	 * adds it to the DOM. Will first remove any existing game choice modal
	 * elements.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	AppView
	 * @since		0.2
	 * 
	 * @param		jQuery			$tc			The element that shows the elapsed time in the current game. Required.
	 */
	__setTimerContainer : function($tc)
	{
		// Make sure the param is null or a jQuery object instance
		if ($tc !== null &&
			(typeof $tc !== "object" || $tc.jquery === undefined)) {
			throw new TypeException("jQuery", "AppView.__setTimerContainer");
		}
		if (this._timerContainer !== null) {
			// Always remove an existing game choice modal first
			this.getContainer()
				.find('div')
					.filter('[data-card-game-view-element="timer"]')
					.remove();
		}

		if ($tc !== null) {
			// If the supplied element doesn't already have the correct value
			// for the `data-card-game-view-element` attribute, set it.
			if ($tc.attr('data-card-game-view-element') === null ||
				$tc.attr('data-card-game-view-element') !== 'timer') {
				$tc.attr('data-card-game-view-element', 'timer');
			}
			
			// Add the modal element to the DOM.
			this.getContainer().append($tc);
		}

		// Set the object property to the supplied param either way
		this._timerContainer = $tc;
	},
	
	/**
	 * Returns the `_timerContainer` property.
	 * 
	 * @public
	 * @memberOf	AppView
	 * @since		0.2
	 *
	 * @return		jQuery			_timerContainer			Returns the `_timerContainer` property.
	 */
	getTimerContainer : function()
	{
		return this._timerContainer;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Initializes the layout of the application view. Creates and adds the set of
	 * buttons to start a new game and restart a current game. Creates and adds the
	 * Modal Bootstrap DOM element used for choosing a game/variation to play.
	 *
	 * @constructor
	 * @public
	 * @memberOf	AppView
	 * @since		0.2
	 * @updated		0.3
	 *
	 * @param		jQuery				$container			The jQuery extended HTML element that will contain the entire view area. Required.
	 */
	__construct : function($container)
	{
		// This, and the methods it calls internally, should only be called once per
		// card game container element.
		if ($container === undefined) {
			throw new CardGameException('View `$container` param is required.', 'AppView.__construct');
		}

		// Set the app container DOM elements...
		this.__setContainer($container);

		// Create the set of buttons...
		var $buttons = this.__createButtons();
		// ...and add them to the DOM...
		this.__setButtons($buttons);

		// ...create the game choice Modal...
		var $modal = this.__createGameChoiceModal();
		// ...and add it to the DOM...
		this.__setGameChoiceModal($modal);

		// ...create the Timer element...
		var $timerContainer = this.__createTimerContainer();
		// ...and lastly, add it to the DOM and position it.
		this.__setTimerContainer($timerContainer);
		this.__scrollToGameViewContainer();
	},

	/** Private Functions **/

	/**
	 * Scroll the document to the top position of the container element.
	 *
	 * @private
	 * @memberOf	AppView
	 * @since		0.3
	 */
	__scrollToGameViewContainer : function()
	{
		$(document).scrollTop(this.getContainer().position().top);
	},

	/**
	 * Creates and returns a set of jQuery extended Button elements which will
	 * give the Player the ability to:
	 *	1. to start a new game
	 * 	2. to restart a current game
	 *
	 * @private
	 * @memberOf	AppView
	 * @since		0.2
	 * @updated		0.3
	 *
	 * @return		jQuery				$buttons			A jQuery object containing two jQuery extended Button elements. Required.
	 */
	__createButtons : function()
	{
		// Create the set of buttons...
		var $buttons = this.__createButtonAddEventHandler(
				'startNewGame', 
				"Start New Game"
			)
			.add(
				this.__createButtonAddEventHandler(
					'restartCurrentGame',
					"Restart Current Game"
				)
			).addClass('btn btn-primary');

		// ...and return it.
		return $buttons;
	},

	/**
	 * Generic function to create a button that the view will add to the DOM somewhere.
	 * 
	 * Optionally specify a `click` (or `tap`) event handler on the button.
	 *
	 * @private
	 * @memberOf	AppView
	 * @since		0.2
	 *
	 * @param		String				dataCardGameButton			The value of the new button's 'data-card-game-button' attribute. Required.
	 * @param		String				buttonText					The text that the button will display. Required.
	 * @param		Function			clickEventHandler			Reference to an object method to handle the `click` or `tap` event. Optional.
	 *
	 * @return		jQuery				$btn						The created jQuery extended button with the proper 'data-card-game-button' attr., text, and optionally click/tap event handler.
	 */
	__createButtonAddEventHandler : function(dataCardGameButton, buttonText, clickEventHandler)
	{
		if (dataCardGameButton === undefined) {
			throw new CardGameException('The `dataCardGameButton` param is required.', 'AppView.__createButtonAddEventHandler');
		}
		if (buttonText === undefined) {
			throw new CardGameException('The `buttonText` param is required.', 'AppView.__createButtonAddEventHandler');
		}

		if (typeof dataCardGameButton !== "string") {
			throw new TypeException("string", "AppView.__createButtonAddEventHandler");
		}
		if (typeof buttonText !== "string") {
			throw new TypeException("string", "AppView.__createButtonAddEventHandler");
		}

		var $btn = $('<button></button>')
			.attr(
				'data-card-game-button', 
				dataCardGameButton
			)
			.text(
				buttonText
			);

		if (clickEventHandler !== undefined && (typeof clickEventHandler === "function")) {
			$btn.on('click', clickEventHandler);
		}

		return $btn;
	},

	/**
	 * Creates and returns the jQuery extended Modal Bootstrap DOM element used
	 * for choosing a game/variation to play when the user asks to start a new game.
	 *
	 * @private
	 * @memberOf	AppView
	 * @since		0.2
	 *
	 * @return		jQuery			$modal			A jQuery object containing a `div` element. Required.
	 */
	__createGameChoiceModal : function()
	{
		// Create the modal and its children elements...
		var $modal = $('<div></div>')
			.attr('data-card-game-view-element', 'game-choice-modal');

		return $modal;
	},

	/**
	 * Creates and returns the jQuery extended DOM element used for displaying
	 * the elapsed time since the current game started.
	 *
	 * @private
	 * @memberOf	AppView
	 * @since		0.2
	 *
	 * @return		jQuery			$timerContainer			A jQuery object containing a `div` element. Required.
	 */
	__createTimerContainer : function()
	{
		var $timerContainer = $('<div></div>')
			.attr('data-card-game-view-element', 'timer');

		return $timerContainer;
	},

	/** Public Functions **/

	/**
	 * Sets the `$gameContainer` object and adds it to the DOM.
	 * 
	 * @public
	 * @memberOf	AppView
	 * @since		0.2
	 *
	 * @param		jQuery			$gameContainer		The DOM element that contains all the elements of the actual Game being played. Required.
	 */
	initGameView : function($gameContainer)
	{
		if ($gameContainer === undefined) {
			throw new CardGameException('The `$gameContainer` param is required.', 'AppView.initGameView');
		}
		else if	(typeof $gameContainer !== "object" || $gameContainer.jquery === undefined) {
			throw new TypeException("jQuery", "AppView.initGameView");
		}

		// If the supplied element doesn't already have the correct value
		// for the `data-card-game-view-element` attribute, set it.
		if ($gameContainer.attr('data-card-game-view-element') === null ||
			$gameContainer.attr('data-card-game-view-element') !== 'canvas-container') {
			$gameContainer.attr('data-card-game-view-element', 'canvas-container');
		}

		// Always remove an existing game canvas first, if it exists.
		var $currentGameContainer = this
			.getContainer()
			.find('div')
				.filter('[data-card-game-view-element="canvas-container"]');
		if ($currentGameContainer.length > 0) {
            $currentGameContainer.remove();
        }

        // Add the supplied game container to the DOM before the Game Choice Modal.
        this.getGameChoiceModal().before($gameContainer);
	},

	/**
	 * Sets the `gameView` object and adds it to the DOM.
	 * 
	 * @public
	 * @memberOf	AppView
	 * @since		0.2
	 */
	resetGameView : function()
	{
		// Removes the current GameView from the DOM.
		this.__setGameViewCanvas(null);
		this.updateTimer('');
	},

	/**
	 * Update the HTML of the Timer container with the string passed in.
	 * 
	 * @public
	 * @memberOf	AppView
	 * @since		0.2
	 *
	 * @param		String			timeStr				String indicating the number of elapsed minutes and seconds. Required.
	 */
	updateTimer : function(timeStr)
	{
		this.getTimerContainer().html(timeStr);
	}

	/** Event Handlers **/

});;
/**
 * Represents a Card in the View.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		Card
 * @name		Card
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var Card = new Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The object describing the Suit to which this card belongs.
	 *
	 * @public
	 * @type		Suit
	 * @memberOf	Card
	 * @since		
	 * @default		null
	 */
	_suit : null,

	/**
	 * Sets the `_suit` property to the value of `st`.
	 * 
	 * @public
	 * @memberOf	Card
	 * @since		
	 *
	 * @param		Suit			st			The object describing the Suit to which this card belongs.
	 */
	__setSuit : function(st)
	{
		if (! st.hasOwnProperty('instanceOf') || ! st.instanceOf(Suit)) {
			throw new TypeException('Suit', 'Card.__setSuit');
		}
		this._suit = st;
	},

	/**
	 * Returns the `_suit` property
	 * 
	 * @public
	 * @memberOf	Card
	 * @since		
	 *
	 * @return		Suit			_suit			The object describing the Suit to which this card belongs.
	 */
	getSuit : function()
	{
		return this._suit;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * 
	 *
	 * @constructor
	 * @public
	 * @memberOf	Card
	 * @since		
	 *
	 * @return		
	 */
	__construct : function(suit, cardNumber)
	{
		
	},

	/** Private Functions **/

	/** Public Functions **/

	/**
	 * 
	 * 
	 * @public
	 * @memberOf	Card
	 * @since		
	 *
	 * @return		OBJTYPE			RETURNOBJVAR			DESCRIPTION
	 */
	someFunction : function()
	{
		//return this.;
	}
});;
/**
 * Base class for implementing specific games' views.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		GameView
 * @name		GameView
 * @version		0.3
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var GameView = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * jQuery object that contains the elements that are added to the DOM, which represent
	 * the visual state of the game, and with which the user directly interacts to play the game.
	 *
	 * @private		
	 * @type		jQuery
	 * @memberOf	GameView
	 * @since		0.2
	 * @default		null
	 */
	_gameContainer : null,
	
	/**
	 * Sets the `_gameContainer` property to the value of `$gc`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$gc			The set of DOM elements that make up the plugin view canvas. Required.
	 */
	__setGameContainer : function($gc)
	{
		if (typeof $gc !== "object" || $gc.jquery === undefined) {
			throw new TypeException("jQuery", "GameView.__setGameContainer");
		}
		this._gameContainer = $gc;
	},
	
	/**
	 * Returns the `_gameContainer` property.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 *
	 * @return		jQuery			_gameContainer		Returns the `_gameContainer` property.
	 */
	getGameContainer : function()
	{
		return this._gameContainer;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/** This is an abstract class and should never be instantiated as is. **/

	/**
	 * Construct the GameView object and initialize the game view's canvas area
	 * to display the elements of the game.
	 * 
	 * @constructor
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 *
	 * @param		Array			stackModel			The set of Stacks that define the layout. Required.
	 */
	__construct : function(stackModel)
	{
		if (stackModel === undefined) {
			throw new CardGameException('The `stackModel` array param is required.', 'GameView.__construct');
		}
		if ($.type(stackModel) !== "array") {
			throw new TypeException('Array', 'GameView.__construct');
		}
		if (stackModel.length < 1) {
			throw new CardGameException('Expected `stackModel` param to have at least one row of stacks.', 'GameView.__construct');	
		}

		// Set the screen with Stacks that do not yet have cards in them.
		var $gameViewContainer = this.__createLayoutFromSpecs(stackModel);
		this.__setGameContainer($gameViewContainer);
	},

	/** Private Functions **/

	/**
	 * Generate the layout of empty stacks based on the model. Assumes that the
	 * `stackModel` is an array that has at least one row of Stacks.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		0.2
	 * @updated		0.3
	 * 
	 * @param		Array			stackModel				The set of Stacks that define the layout. Required.
	 *
	 * @return		jQuery			$gameViewContainer		Returns the created set of DOM elements starting with the container.
	 */
	__createLayoutFromSpecs : function(stackModel)
	{
		var $gameViewContainer = $('<div></div>').attr('data-card-game-view-element', 'canvas-container');
		
		var $domRows = $('');

		for (var i = 0; i < stackModel.length; i++) {
			var stackRow = stackModel[i];
			var rowGridSize = stackRow.length;

			var $domRow = $('<div></div>')
				.attr('data-card-game-view-element', 'canvas-row')
				.addClass('row stacks-' + rowGridSize);
				
			for (var j = 0; j < stackRow.length; j++) {
				var stack = stackRow[j];
				var fanClass = 'fan-' + (stack !== null ? 
					stack.getFanningDirection().getFanningDirectionName() :
					"none"
				);
				
				var $stackDOMElement = $('<div></div>')
					.attr('data-card-game-view-element', 'stack')
					.addClass(fanClass)
					.data({
						'stack' : (stack !== null ? stack : "empty")
					})
					.append(
						 $('<div></div>').attr('data-card-game-view-element', 'card-container')
					);

				// Add this cell to the DOM row
				$domRow.append($stackDOMElement);
			}

			// Add this domRow to the list to be returned
			$gameViewContainer.append($domRow);
		}

		return $gameViewContainer;
	},

	/**
	 * Checks whether a jQuery element is a valid Card image. Assumes the `$card` param
	 * is a valid jQuery object.
	 *
	 * @private
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$card			The DOM element to check. Required.
	 *
	 * @return		Boolean			tbr				True if the element is a valid Card image, false otherwise.
	 */
	__isCard : function($card)
	{
		var tbr = true;

		var isJquery = (typeof $card === "object" && $card.jquery !== undefined);

		if (! isJquery ||
			$card.prop('tagName').toLowerCase() !== "img" ||
			$card.attr('data-card-game-view-element') === undefined ||
			$card.attr('data-card-game-view-element') !== "card" ||
			$card.attr('data-card-face-showing') === undefined ||
			$card.attr('data-card-front-source') === undefined ||
			$card.attr('data-card-back-source') === undefined ||
			$card.attr('data-card-deck-num') === undefined ||
			$card.data('suit') === undefined ||
			$card.data('card-number') === undefined) {
			tbr = false;
		}

		return tbr;
	},

	/**
	 * Generate a single Card jQuery element and returns it.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		0.2
	 *
	 * @param		Integer			deckNum					The current deck number for this deck of cards. Required.
	 * @param		Suit			suitObj					The current deck number for this deck of cards. Required.
	 * @param		CardNumber		cardNumberObject		The current deck number for this deck of cards. Required.
	 *
	 * @return		jQuery			$card					Returns the created Card element.
	 */
	__createCard : function(deckNum, suitObj, cardNumberObject)
	{
		var cardImageSrcName = cardNumberObject.getCardNumberName().toLowerCase() + 
			"_of_" + 
			suitObj.getSuitName().toLowerCase() + 
			".png";
		var $card = $('<img />')
			.attr({
				src : "../img/cards/" + cardImageSrcName,
				'data-card-game-view-element' : 'card',
				'data-card-face-showing' : 'front',
				'data-card-front-source' : "../img/cards/" + cardImageSrcName,
				'data-card-back-source' : "../img/cards/card_back.png",
				'data-card-deck-num' : deckNum
			})
			.data({
				'suit' : suitObj,
				'card-number' : cardNumberObject
			});

		return $card;
	},

	/**
	 * Generate a deck of Card objects and return it.
	 * 
	 * @private
	 * @memberOf	GameView
	 * @since		0.2
	 * @TODO		implement Jokers
	 *
	 * @param		Integer			deckNum			The current deck number for this deck of cards. Required.
	 *
	 * @return		jQuery			$deck			Returns the created set of Card elements.
	 */
	__createDeck : function(deckNum, acesHigh, includeJokers)
	{
		var $deck = $();
		var ss = new SuitSet();
		var cns = new CardNumberSet();

		if (acesHigh) {
			cns.ace.__setCardValue(cns.king.getCardValue() + 1);
		}

		// the jQuery `each()` method reassigns the `this` var, so set a local reference to it here.
		var that = this;

		$.each(ss, function(suitName, suitObj) {
			$.each(cns, function(cardNumberName, cardNumberObject) {
				$deck = $deck.add(that.__createCard(deckNum, suitObj, cardNumberObject));
			});
		});

		return $deck;
	},

	/** Public Functions **/

	/**
	 * Generate the number of Decks of Card objects that the game rules specify and return it.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 *
	 * @param		Integer			numDecks		The number of decks of cards to generate.
	 *
	 * @return		jQuery			$cards			Returns the created set of Card elements.
	 */
	createCards : function(numDecks, acesHigh, includeJokers)
	{
		// Check for valid params...
		if (numDecks === undefined) {
			throw new CardGameException('The `numDecks` param is required.', 'GameView.createCards');
		}
		var parsed = null;
		if (typeof numDecks !== "number" || isNaN(parsed = parseInt(numDecks))) {
			throw new TypeException("Integer", "GameView.createCards");
		}

		if (acesHigh === undefined) {
			throw new CardGameException('The `acesHigh` param is required.', 'GameView.createCards');
		}
		if (typeof acesHigh !== "boolean") {
			throw new TypeException("Boolean", "GameView.createCards");
		}

		if (includeJokers === undefined) {
			throw new CardGameException('The `includeJokers` param is required.', 'GameView.createCards');
		}
		if (typeof includeJokers !== "boolean") {
			throw new TypeException("Boolean", "GameView.createCards");
		}

		// ...got valid params, so lets go!
		var $cards = $();

		for (var i = 0; i < numDecks; i++) {
			$cards = $cards.add(this.__createDeck(numDecks, acesHigh, includeJokers));
		}

		return $cards;
	},

	/**
	 * Flip a Card in the DOM. If the front is currently showing, show the back,
	 * or vice-versa.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$card			The Card DOM element to visually flip. Required.
	 */
	flipCard : function($card)
	{
		if ($card === undefined) {
			throw new CardGameException('The `$card` param is required.', 'GameView.flipCard');
		}
		else if (! this.__isCard($card)) {
			throw new CardGameException('The `$card` param is not a valid Card.', 'GameView.flipCard');
		}

		// @TODO: make this a cool animation
		if ($card.attr('data-card-face-showing') === "front") {
			$card = this.showCardBack($card);
		}
		else if ($card.attr('data-card-face-showing') === "back") {
			$card = this.showCardFront($card);
		}

		return $card;
	},

	/**
	 * Specifically show the back of a Card in the DOM.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$card			The Card DOM element of which to show the back. Required.
	 */
	showCardBack : function($card)
	{
		if ($card === undefined) {
			throw new CardGameException('The `$card` param is required.', 'GameView.showCardBack');
		}
		else if (! this.__isCard($card)) {
			throw new CardGameException('The `$card` param is not a valid Card.', 'GameView.showCardBack');
		}

		$card.attr({
			'src' : $card.attr('data-card-back-source'),
			'data-card-face-showing' : "back"
		});

		return $card;
	},

	/**
	 * Specifically show the front of a Card in the DOM
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		jQuery			$card			The Card DOM element of which to show the front. Required.
	 */
	showCardFront : function($card)
	{
		if ($card === undefined) {
			throw new CardGameException('The `$card` param is required.', 'GameView.showCardFront');
		}
		else if (! this.__isCard($card)) {
			throw new CardGameException('The `$card` param is not a valid Card.', 'GameView.showCardFront');
		}

		$card.attr({
			'src' : $card.attr('data-card-front-source'),
			'data-card-face-showing' : "front"
		});

		return $card;
	},

	/**
	 * Retrieve the DOM element representing a Stack element in the View.
	 *
	 * @throws		CardGameException				If the DOM element for the supplied Stack can't be found
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * 
	 * @param		Stack			stack			The Stack whose DOM element we want to find. Required.
	 *
	 * @return		jQuery			$matchedView	The jQuery extended DOM element that represents the supplied Stack element in the View.
	 */
	getStackView : function(stack)
	{
		var $allStackDOMElements = this.getGameContainer()
			.find('div')
				.filter('[data-card-game-view-element="stack"]');
		var $matchedView = $allStackDOMElements
			.filter(function() {
				return (
					$(this).data('stack') !== null &&
					$(this).data('stack') === stack
				);
			});

		if ($matchedView.length === 0) {
			throw new CardGameException(
				'No Stack View could be found for the supplied Stack object', 
				'GameView.getStackView'
			);
		}

		return $matchedView;
	},

	/**
	 * Empty the DOM element representing a Stack element in the View. If the
	 * Stack is null or isn't an instance of the Stack class, do nothing.
	 *
	 * In either case, the elements removed should keep their data in case
	 * they get re-added to the DOM later.
	 *
	 * @public
	 * @memberOf	GameView
	 * @since		0.2
	 * @updated		0.3
	 * 
	 * @param		Stack			stack			The Stack whose DOM element we want to empty. Required.
	 */
	emptyStackView : function(stack)
	{
		if (stack !== null && 
			stack.hasOwnProperty('instanceOf') &&
			stack.instanceOf(Stack) === true) {
			var $stackDOMElement = this.getStackView(stack);
			$stackDOMElement
				.children('div')
				.filter('[data-card-game-view-element="card-container"]')
					.children('img')
					.filter('[data-card-game-view-element="card"]')
						.detach();
		}
	}

	/** Event Handlers **/
});;
/**
 * Static object that represents all available CardNumbers in a Suit of cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardNumberSet
 * @name		CardNumberSet
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var CardNumberSet = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The CardNumber object representing `two`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	two : null,

	/**
	 * Returns the `two` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.two		The `two` CardNumber object.
	 */
	getTwo : function()
	{
		return this.two;
	},

	/**
	 * The CardNumber object representing `three`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	three : null,

	/**
	 * Returns the `three` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.three		The `three` CardNumber object.
	 */
	getThree : function()
	{
		return this.three;
	},

	/**
	 * The CardNumber object representing `four`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	four : null,

	/**
	 * Returns the `four` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.four		The `four` CardNumber object.
	 */
	getFour : function()
	{
		return this.four;
	},

	/**
	 * The CardNumber object representing `five`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	five : null,

	/**
	 * Returns the `five` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.five		The `five` CardNumber object.
	 */
	getFive : function()
	{
		return this.five;
	},

	/**
	 * The CardNumber object representing `six`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	six : null,

	/**
	 * Returns the `six` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.six		The `six` CardNumber object.
	 */
	getSix : function()
	{
		return this.six;
	},

	/**
	 * The CardNumber object representing `seven`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	seven : null,

	/**
	 * Returns the `seven` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.seven		The `seven` CardNumber object.
	 */
	getSeven : function()
	{
		return this.seven;
	},

	/**
	 * The CardNumber object representing `eight`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	eight : null,

	/**
	 * Returns the `eight` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.eight		The `eight` CardNumber object.
	 */
	getEight : function()
	{
		return this.eight;
	},

	/**
	 * The CardNumber object representing `nine`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	nine : null,

	/**
	 * Returns the `nine` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.nine		The `nine` CardNumber object.
	 */
	getNine : function()
	{
		return this.nine;
	},

	/**
	 * The CardNumber object representing `ten`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	ten : null,

	/**
	 * Returns the `ten` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.ten		The `ten` CardNumber object.
	 */
	getTen : function()
	{
		return this.ten;
	},

	/**
	 * The CardNumber object representing `jack`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	jack : null,

	/**
	 * Returns the `jack` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.jack		The `jack` CardNumber object.
	 */
	getJack : function()
	{
		return this.jack;
	},

	/**
	 * The CardNumber object representing `queen`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	queen : null,

	/**
	 * Returns the `queen` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.queen		The `queen` CardNumber object.
	 */
	getQueen : function()
	{
		return this.queen;
	},

	/**
	 * The CardNumber object representing `king`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	king : null,

	/**
	 * Returns the `king` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.king		The `king` CardNumber object.
	 */
	getKing : function()
	{
		return this.king;
	},

	/**
	 * The CardNumber object representing `ace`.
	 *
	 * @private
	 * @type		CardNumber
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 * @default		null
	 */
	ace : null,

	/**
	 * Returns the `ace` property.
	 * 
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		CardNumber		this.ace		The `ace` CardNumber object.
	 */
	getAce : function()
	{
		return this.ace;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Creates a new CardNumberSet object and returns the statically created object.
	 *
	 * @constructor
	 * @public
	 * @memberOf	CardNumberSet
	 * @since		0.2
	 *
	 * @return		Object									The public API for the CardNumberSet static object.
	 */
	__construct : function()
	{
		// Assign the cardnumber objects to each property
		this.ace = new CardNumber(1, 'ace');
		this.two = new CardNumber(2, 'two');
		this.three = new CardNumber(3, 'three');
		this.four = new CardNumber(4, 'four');
		this.five = new CardNumber(5, 'five');
		this.six = new CardNumber(6, 'six');
		this.seven = new CardNumber(7, 'seven');
		this.eight = new CardNumber(8, 'eight');
		this.nine = new CardNumber(9, 'nine');
		this.ten = new CardNumber(10, 'ten');
		this.jack = new CardNumber(11, 'jack');
		this.queen = new CardNumber(12, 'queen');
		this.king = new CardNumber(13, 'king');

		// Return the static object.
		return {
			ace : this.getAce(),
			two : this.getTwo(),
			three : this.getThree(),
			four : this.getFour(),
			five : this.getFive(),
			six : this.getSix(),
			seven : this.getSeven(),
			eight : this.getEight(),
			nine : this.getNine(),
			ten : this.getTen(),
			jack : this.getJack(),
			queen : this.getQueen(),
			king : this.getKing()
		};
	}

	/** Public Functions **/
});;
/**
 * Static object that represents all available FanningDirections in games of Cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		FanningDirectionSet
 * @name		FanningDirectionSet
 * @version		0.2
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
	 * @since		0.2
	 * @default		null
	 */
	up : null,

	/**
	 * Returns the `up` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		0.2
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
	 * @since		0.2
	 * @default		null
	 */
	down : null,

	/**
	 * Returns the `down` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		0.2
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
	 * @since		0.2
	 * @default		null
	 */
	left : null,

	/**
	 * Returns the `left` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		0.2
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
	 * @since		0.2
	 * @default		null
	 */
	right : null,

	/**
	 * Returns the `right` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		0.2
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
	 * @since		0.2
	 * @default		null
	 */
	none : null,

	/**
	 * Returns the `none` property.
	 * 
	 * @public
	 * @memberOf	FanningDirectionSet
	 * @since		0.2
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
	 * @since		0.2
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
});;
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
});;
/**
 * Static object that represents all available Suits in a deck of cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		SuitSet
 * @name		SuitSet
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var SuitSet = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The Suit object representing Hearts.
	 *
	 * @private
	 * @type		Suit
	 * @memberOf	SuitSet
	 * @since		0.2
	 * @default		null
	 */
	hearts : null,

	/**
	 * Returns the `hearts` property
	 * 
	 * @public
	 * @memberOf	SuitSet
	 * @since		0.2
	 *
	 * @return		Suit		this.hearts		The Hearts suit object.
	 */
	getHearts : function()
	{
		return this.hearts;
	},
	
	/**
	 * The Suit object representing Diamonds.
	 *
	 * @private
	 * @type		Suit
	 * @memberOf	SuitSet
	 * @since		0.2
	 * @default		null
	 */
	diamonds : null,

	/**
	 * Returns the `diamonds` property
	 * 
	 * @public
	 * @memberOf	SuitSet
	 * @since		0.2
	 *
	 * @return		Suit		this.diamonds		The Diamonds suit object.
	 */
	getDiamonds : function()
	{
		return this.diamonds;
	},
	
	/**
	 * The Suit object representing Spades.
	 *
	 * @private
	 * @type		Suit
	 * @memberOf	SuitSet
	 * @since		0.2
	 * @default		null
	 */
	spades : null,

	/**
	 * Returns the `spades` property
	 * 
	 * @public
	 * @memberOf	SuitSet
	 * @since		0.2
	 *
	 * @return		Suit		this.spades		The Spades suit object.
	 */
	getSpades : function()
	{
		return this.spades;
	},
	
	/**
	 * The Suit object representing Clubs.
	 *
	 * @private
	 * @type		Suit
	 * @memberOf	SuitSet
	 * @since		0.2
	 * @default		null
	 */
	clubs : null,

	/**
	 * Returns the `clubs` property
	 * 
	 * @public
	 * @memberOf	SuitSet
	 * @since		0.2
	 *
	 * @return		Suit		this.clubs		The Clubs suit object.
	 */
	getClubs : function()
	{
		return this.clubs;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Creates a new SuitSet object and returns the statically created object.
	 *
	 * @constructor
	 * @public
	 * @memberOf	SuitSet
	 * @since		0.2
	 *
	 * @return		Object									The public API for the SuitSet static object.
	 */
	__construct : function()
	{
		// Assign the suits to each property
		this.hearts = new Suit('hearts', new Color('#FF0000'));
		this.diamonds = new Suit('diamonds', new Color('#FF0000'));
		this.spades = new Suit('spades', new Color('#000000'));
		this.clubs = new Suit('clubs', new Color('#000000'));

		// Return the static object.
		return {
			hearts : this.getHearts(),
			diamonds : this.getDiamonds(),
			spades : this.getSpades(),
			clubs : this.getClubs()
		};
	}

	/** Public Functions **/
});;
var srAllSt = new StackTypes();
var srAllFd = new FanningDirectionSet();

/**
 * Implements the rules and stack layout specific to the game Solitaire.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		SolitaireRules
 * @name		SolitaireRules
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var SolitaireRules = Class({ extends : GameRules }, {
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * Solitaire uses only 1 deck of cards.
	 *
	 * @private
	 * @type		Integer
	 * @memberOf	SolitaireRules
	 * @since		
	 * @default		1
	 */
	_numDecksInGame : 1,

	/**
	 * Solitaire does not use Joker cards.
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	SolitaireRules
	 * @since		
	 * @default		false
	 */
	_includeJokers : false,

	/**
	 * Solitaire has aces low.
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	SolitaireRules
	 * @since		
	 * @default		false
	 */
	_acesHigh : false,

	/**
	 * Solitaire has 1 dealer deck at the top left, 4 foundation stacks at the
	 * top right, and 7 inPlay stacks on the bottom row.
	 *
	 * @private
	 * @type		Array
	 * @memberOf	SolitaireRules
	 * @since		
	 */
	_layout : [
		[ 
			{
				stackType : srAllSt.dealer,
				fanningDirection : srAllFd.none,
				numCardsFacingDown : 52,
				numCardsFacingUp : 0
			}, 
			null, 
			null, 
			{
				stackType : srAllSt.foundation,
				fanningDirection : srAllFd.none,
				numCardsFacingDown : 0,
				numCardsFacingUp : 13
			}, 
			{
				stackType : srAllSt.foundation,
				fanningDirection : srAllFd.none,
				numCardsFacingDown : 0,
				numCardsFacingUp : 13
			}, 
			{
				stackType : srAllSt.foundation,
				fanningDirection : srAllFd.none,
				numCardsFacingDown : 0,
				numCardsFacingUp : 13
			}, 
			{
				stackType : srAllSt.foundation,
				fanningDirection : srAllFd.none,
				numCardsFacingDown : 0,
				numCardsFacingUp : 13
			}
		],
		[
			{
				stackType : srAllSt.inPlay,
				fanningDirection : srAllFd.down,
				numCardsFacingDown : 0,
				numCardsFacingUp : 1
			},
			{
				stackType : srAllSt.inPlay,
				fanningDirection : srAllFd.down,
				numCardsFacingDown : 1,
				numCardsFacingUp : 1
			},
			{
				stackType : srAllSt.inPlay,
				fanningDirection : srAllFd.down,
				numCardsFacingDown : 2,
				numCardsFacingUp : 1
			},
			{
				stackType : srAllSt.inPlay,
				fanningDirection : srAllFd.down,
				numCardsFacingDown : 3,
				numCardsFacingUp : 1
			},
			{
				stackType : srAllSt.inPlay,
				fanningDirection : srAllFd.down,
				numCardsFacingDown : 4,
				numCardsFacingUp : 1
			},
			{
				stackType : srAllSt.inPlay,
				fanningDirection : srAllFd.down,
				numCardsFacingDown : 5,
				numCardsFacingUp : 1
			},
			{
				stackType : srAllSt.inPlay,
				fanningDirection : srAllFd.down,
				numCardsFacingDown : 6,
				numCardsFacingUp : 1
			}
		]
	],

	/**
	 * Solitaire uses a timer.
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	SolitaireRules
	 * @since		
	 * @default		true
	 */
	_useTimer : true,

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Init the game rules for Solitaire.
	 *
	 * @constructor
	 * @public
	 * @memberOf	SolitaireRules
	 * @since		
	 */
	__construct : function()
	{
		this.super('__construct');
	}

	/** Private Functions **/

	/** Public Functions **/
});;
/**
 * Implements the view functionality specific to the game Solitaire.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		SolitaireView
 * @name		SolitaireView
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var SolitaireView = Class({ extends : GameView }, {
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
	 * Pretty much just calls the parent class constructor at this point in time.
	 *
	 * @constructor
	 * @public
	 * @memberOf	SolitaireView
	 * @since		
	 *
	 * @param		Array			stackModel			The set of Stacks that define the layout. Required.
	 */
	__construct : function(stackModel)
	{
		this.super('__construct', stackModel);
	}

	/** Private Functions **/

	/** Public Functions **/
});;
/**
 * Controls the interaction between the sub-classed GameRules and GameView classes
 * in order to allow the user to play the game.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		GameController
 * @name		GameController
 * @version		0.3
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var GameController = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * The name of the game. Prefix for the extended GameRules and GameView classes;
	 * ie `{_gameName}Rules` and `{_gameName}View`.
	 *
	 * @private
	 * @type		String
	 * @memberOf	GameController
	 * @since		0.2
	 * @default		null
	 */
	_gameName : null,
	
	/**
	 * Sets the `_gameName` property to the value of `gn`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		0.2
	 * 
	 * @param		String			gn			The name of the game. Required.
	 */
	__setGameName : function(gn)
	{
		if (typeof gn !== "string") {
			throw new TypeException("String", "GameController.__setGameName");
		}
		this._gameName = gn;
	},
	
	/**
	 * Returns the `_gameName` property.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		0.2
	 *
	 * @return		String			_gameName		Returns the `_gameName` property.
	 */
	getGameName : function()
	{
		return this._gameName;
	},

	/**
	 * Contains the rules and layout for the current game. Should be an instance
	 * of a sub-class of GameRules, ie `{_gameName}Rules`.
	 *
	 * @private
	 * @type		GameRules
	 * @memberOf	GameController
	 * @since		0.2
	 * @default		null
	 */
	_gameRules : null,
	
	/**
	 * Sets the `_gameRules` property to the value of `gv`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		0.2
	 * 
	 * @param		GameRules			gr			The rules and layout of the game. Required.
	 */
	__setGameRules : function(gr)
	{
		if (! gr.hasOwnProperty('instanceOf') || ! gr.instanceOf(GameRules)) {
			throw new TypeException("GameRules", "GameController.__setGameRules");
		}
		this._gameRules = gr;
	},
	
	/**
	 * Returns the `_gameRules` property.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		0.2
	 *
	 * @return		GameRules			_gameRules		Returns the `_gameRules` property.
	 */
	getGameRules : function()
	{
		return this._gameRules;
	},

	/**
	 * Contains the view elements and event/move logic for the current game. Should
	 * be an instance of a sub-class of GameView, ie `{_gameName}View`.
	 *
	 * @private
	 * @type		GameView
	 * @memberOf	GameController
	 * @since		0.2
	 * @default		null
	 */
	_gameView : null,
	
	/**
	 * Sets the `_gameView` property to the value of `gv`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		0.2
	 * 
	 * @param		GameView			gv			The rules and layout of the game. Required.
	 */
	__setGameView : function(gv)
	{
		if (! gv.hasOwnProperty('instanceOf') || ! gv.instanceOf(GameView)) {
			throw new TypeException("GameView", "GameController.__setGameView");
		}
		this._gameView = gv;
	},
	
	/**
	 * Returns the `_gameView` property.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		0.2
	 *
	 * @return		GameView			_gameView		Returns the `_gameView` property.
	 */
	getGameView : function()
	{
		return this._gameView;
	},

	/**
	 * Contains the set of jQuery extended `div` elements which make up the set of cards
	 * used to play the current game.
	 *
	 * @private
	 * @type		jQuery
	 * @memberOf	GameController
	 * @since		0.2
	 * @default		null
	 */
	_cards : null,
	
	/**
	 * Sets the `_cards` property to the value of `$cards`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		0.2
	 * 
	 * @param		jQuery			$cards			The set of jQuery extended card elements. Required.
	 */
	__setCards : function($cards)
	{
		if (typeof $cards !== "object" || $cards.jquery === undefined) {
			throw new TypeException("jQuery", "GameController.__setCards");
		}
		this._cards = $cards;
	},
	
	/**
	 * Returns the `_cards` property.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		0.2
	 *
	 * @return		jQuery			_cards		Returns the `_cards` property.
	 */
	getCards : function()
	{
		return this._cards;
	},

	/**
	 * Contains a copy of the shuffled set of cards prior to being dealt to any Stacks.
	 *
	 * @private
	 * @type		jQuery
	 * @memberOf	GameController
	 * @since		0.2
	 * @default		null
	 */
	_cardsResetCopy : null,
	
	/**
	 * Sets the `_cardsResetCopy` property to the value of `$cards`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameController
	 * @since		0.2
	 * 
	 * @param		jQuery			$cardsCopy			The copy of the set of jQuery extended card elements. Required.
	 */
	__setCardsResetCopy : function($cardsCopy)
	{
		if (typeof $cardsCopy !== "object" || $cardsCopy.jquery === undefined) {
			throw new TypeException("jQuery", "GameController.__setCardsResetCopy");
		}
		this._cardsResetCopy = $cardsCopy;
	},
	
	/**
	 * Returns the `_cardsResetCopy` property.
	 * 
	 * @public
	 * @memberOf	GameController
	 * @since		0.2
	 *
	 * @return		jQuery			_cardsResetCopy		Returns the `_cardsResetCopy` property.
	 */
	getCardsResetCopy : function()
	{
		return this._cardsResetCopy;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Initialize the object, setting the name of the game to be loaded. Then
	 * load up the game's rules, its view elements, and finally a set of jQuery
	 * extended card elements to store for later use.
	 *
	 * @constructor
	 * @public
	 * @memberOf	GameController
	 * @since		0.2
	 *
	 * @param		String			gameName			The name of the game. Prefix for the extended GameRules and GameView classes. Required.
	 */
	__construct : function(gameName)
	{
		if (gameName === undefined) {
			throw new CardGameException('The `gameName` param is required.', 'GameController.__construct');
		}
		this.__setGameName(gameName);

		// Load the game rules
		this.__loadGameRules();

		// Load the game view
		this.__loadGameView();

		// Generate the set of cards needed for this game and store them for future use.
		var $cards = this.getGameView().createCards(
			this.getGameRules().getNumDecksInGame(), 
			this.getGameRules().getAcesHigh(), 
			this.getGameRules().getIncludeJokers()
		);
		this.__setCards($cards);
	},

	/** Private Functions **/

	/**
	 * Generates a new instance of a subclass of GameRules, based on the name of 
	 * the current game. Stores the generated instance in `_gameRules`.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		0.2
	 */
	__loadGameRules : function()
	{
		var grClassName = this.getGameName() + 'Rules';
		try {
			var gameRules = new window[grClassName]();
			this.__setGameRules(gameRules);
		}
		catch (e) {
			if (e.message.match(/'undefined' is not a constructor \(evaluating 'new window\[grClassName\]\(\)'\)/) !== null) {
				throw new CardGameException('The expected game class "' + grClassName + '" does not exist.', 'GameController.__loadGameRules');
			}
			else { throw e; }
		}
	},

	/**
	 * Generates a new instance of a subclass of GameView, based on the name of 
	 * the current game. Stores the generated instance in `_gameView`. Assumes that
	 * `__loadGameRules()` has been run successfully prior to this method being called.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		0.2
	 */
	__loadGameView : function()
	{
		var gvClassName = this.getGameName() + 'View';
		try {
			var gameView = new window[gvClassName](this.getGameRules().getStackModel());
			this.__setGameView(gameView);
		}
		catch (e) {
			if (e.message.match(/'undefined' is not a constructor \(evaluating 'new window\[gvClassName\]\(this\.getGameRules\(\)\.getStackModel\(\)\)'\)/) !== null) {
				throw new CardGameException('The expected game class "' + gvClassName + '" does not exist.', 'GameController.__loadGameView');
			}
			else { throw e; }
		}
	},

	/**
	 * Helper function to sort an array the way a human would shuffle
	 * a deck of cards: split it in half, and alternate adding a small
	 * random number of cards from the left deck then from the right deck
	 * to the shuffled set.
	 *
	 * Recursive function that can shuffle an array any number of times in order
	 * to get a more reasonable distribution.
	 *
	 * This should be relatively fast since we're not resizing arrays constantly.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		0.2
	 * @TODO		Speed test this algorithm with increasing cardArr length and numTimes
	 *
	 * @param		Array		cardArr				The array of card elements to shuffle. Required.
	 * @param		Integer		numTimes			The number of times to recursively run this method. Optional.
	 *
	 * @return		Array		shuffledCardsArr	The shuffled array of cards.
	 */
	__shuffleCardArray : function(cardArr, numTimes)
	{
		cardArr.reverse();
		var numCards = cardArr.length;
		var middle = Math.floor(numCards/2);
		var shuffledCardsArr = [];
		shuffledCardsArr.length = numCards;

		var cardLeftStart = 0;
		var cardRightStart = middle;
		var merged = false;
		var i = 0;
		while (! merged) {
			// Choose the lower number between the number of cards
			// remaining from the left pile, and a random # between 1 and 4,
			// to add from the left pile first.
			var cardsLeftRemaining = middle - cardLeftStart;
			var randFromLeft = Math.min(
				Math.ceil(Math.random() * 4),
				cardsLeftRemaining
			);
			for (var j = 0; j < randFromLeft; j++) {
				shuffledCardsArr[i++] = cardArr[cardLeftStart++];
			}
			
			// Choose the lower number between the number of cards
			// remaining from the right pile, and a random # between 1 and 4,
			// to add from the right pile.
			var cardsRightRemaining = numCards - cardRightStart;
			var randFromRight = Math.min(
				Math.ceil(Math.random() * 4),
				cardsRightRemaining
			);
			for (var k = 0; k < randFromRight; k++) {
				shuffledCardsArr[i++] = cardArr[cardRightStart++];
			}

			// The left and right hand splits of the cards have been merged
			// when there are no more cards left to shuffle.
			merged = (cardLeftStart == middle && cardRightStart == numCards);
		}

		var parsedNumTimes = null;
		if (numTimes !== undefined && 
			! isNaN(parsedNumTimes = parseInt(numTimes)) && 
			parsedNumTimes > 0) {
			return this.__shuffleCardArray(shuffledCardsArr, parsedNumTimes - 1);
		}
		
		return shuffledCardsArr;
	},

	/**
	 * Shuffle the set of cards a given number of times and re-stores it in `_cards`.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		0.2
	 *
	 * @param		Integer			numTimes		The number of times to shuffle the cards. Optional.
	 */
	__shuffleCards : function(numTimes)
	{
		// Shuffle the cards...
		var cardsArr = this.getCards().toArray();
		var shuffledCardsArr = this.__shuffleCardArray(cardsArr, numTimes);

		var $shuffledCards = $(shuffledCardsArr);
		this.__setCards($shuffledCards);
	},

	/**
	 * Takes a clone of the set of Cards and stores them for later re-use.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		0.2
	 */
	__storeCopyOfCards : function()
	{
		this.__setCardsResetCopy(this.getCards().clone(true, false));
	},

	/**
	 * Empty all the DOM elements representing all the Stacks in the model, 
	 * then Find the DOM element representing a specific Stack object 
	 * and append all the Card DOM elements to it.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		0.2
	 * @updated		0.3
	 *
	 * @param		Stack			stack			The Stack object whose view will receive all Card view DOM objects as children. Required.
	 */
	__stackCollectAllCards : function(stack)
	{
		// First, empty all the stacks.
		this.getGameRules().runForEachStackObject(
			this.getGameView(),
			this.getGameView().emptyStackView
		);

		// Next, add all the cards to the specified stack.
		var $stackDOMElement = this.getGameView().getStackView(stack);
		var $cardContainer = $stackDOMElement.children('div[data-card-game-view-element="card-container"]');
		var that = this;
		this.getCards().each(function(index, card) {
			var $card = $(card);
			var cardIndexOne = index + 1;
			if (cardIndexOne <= stack.getNumCardsFacingDown()) {
				// Make sure the first cards up to stack.getNumCardsFacingDown() are face down
				$card = that.getGameView().showCardBack($card);
			}
			else {
				// and the rest are face up.
				$card = that.getGameView().showCardFront($card);
			}
		})
		.appendTo($cardContainer);
	},

	/**
	 * Figure out how many cards need to be dealt to all the 'inPlay' stacks.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		0.2
	 *
	 * @return		Integer			numCardsToDeal			The number of cards the app will deal to InPlay stacks.
	 */
	__getNumCardsToDeal : function() 
	{
		var numCardsToDeal = 0;
		var st = new StackTypes();
		this.getGameRules().runForEachStackObject(
			this,
			function(stack) {
				if (stack !== null && 
					stack.hasOwnProperty('instanceOf') &&
					stack.instanceOf(Stack) === true &&
					stack.getStackType().getStackTypeName() === st.inPlay.getStackTypeName()) {
					numCardsToDeal += stack.getNumCardsFacingDown() + stack.getNumCardsFacingUp();
				}
			}
		);

		return numCardsToDeal;
	},

	/**
	 * Deal all the Cards from the dealer Stack to all the inPlay Stacks, going 
	 * one Card per Stack at a time, up to the calculated total number of Cards 
	 * to deal.
	 *
	 * @private
	 * @memberOf	GameController
	 * @since		0.2
	 * @updated		0.3
	 */
	__dealCards : function()
	{
		var numCardsToDeal = this.__getNumCardsToDeal();
		var st = new StackTypes();
		var fd = new FanningDirectionSet();

		var inPlayStacks = this.getGameRules().getStacksByType(st.inPlay);

		var curCardIndex = 0;
		var curStackIndex = 0;
		var cardsNotDealt = true;
		do {
			var curStack = inPlayStacks[curStackIndex];
			var totalCardsInStackNeeded = curStack.getNumCardsFacingDown() + curStack.getNumCardsFacingUp();

			// Grab the Stack view...
			var $stackDOMElement = this.getGameView().getStackView(curStack);
			var $cardContainer = $stackDOMElement.children('div[data-card-game-view-element="card-container"]');
			var $cardsInStack = $cardContainer.children('img[data-card-game-view-element="card"]');
			var curNumCardsInStack = $cardsInStack.length;
			
			// increment this now
			curStackIndex = (curStackIndex + 1) % inPlayStacks.length;
			if (curNumCardsInStack === totalCardsInStackNeeded) {
				// This stack has all the cards it needs, so bounce now.
				continue;
			}

			// This stack needs to add another card, so do it.
			var $card = this.getCards().eq(curCardIndex);
			if (curNumCardsInStack < curStack.getNumCardsFacingDown()) {
				// Make sure the first cards up to curStack.getNumCardsFacingDown() are face down
				$card = this.getGameView().showCardBack($card);
			}
			else {
				// and the rest are face up.
				$card = this.getGameView().showCardFront($card);
			}

			$card.appendTo($cardContainer);
			curCardIndex++;

			cardsNotDealt = (curCardIndex < numCardsToDeal);
		} while (cardsNotDealt);
	},

	/** Public Functions **/

	/**
	 * Begins a new round of the current game.
	 * 
	 * @throws		CardGameException				If the Dealer stack can't be found.
	 * @public
	 * @memberOf	GameController
	 * @since		0.2
	 * @updated		0.3
	 *
	 * @param		Boolean			shuffleAndCopy		Flag indicating whether (true) or not (false) to shuffle and copy the deck as a first step. Optional. Default true.
	 *
	 * @return		Boolean			success				Flag indicating that everything succeeded (true) or not (false).
	 */
	beginGamePlay : function(shuffleAndCopy)
	{
		var success = false;

		if (shuffleAndCopy === undefined || typeof shuffleAndCopy !== "boolean" || shuffleAndCopy === true) {
			// Shuffle the cards a random number of times between 3 and 10
			var numTimes = 0;
			while (numTimes < 3) { numTimes = Math.floor(Math.random() * 10) + 1; }
			this.__shuffleCards(numTimes);

			// Store a copy of the cards in their currently shuffled state for later re-use.
			this.__storeCopyOfCards();
		}

		// Get the Dealer stack and send all the Cards to its view.
		var dealerStack = this.getGameRules().getDealerStack();
		if (dealerStack === null) {
			throw new CardGameException('No Dealer stack exists in the layout.', 'GameController.beginGamePlay');
		}
		else if (
			! dealerStack.hasOwnProperty('instanceOf') ||
			dealerStack.instanceOf(Stack) !== true
		) {
			throw new CardGameException('The found Dealer stack is not a Stack object.', 'GameController.beginGamePlay');
		}
		this.__stackCollectAllCards(dealerStack);

		// Do an animation of dealing the cards from the Dealer stack to
		// the individual InPlay stacks (according to the rules of the game)
		this.__dealCards();

		success = true;

		return success;
	}
});;
/**
 * A Card game backbone application. Allows you to start a new game, or restart a current game.
 *
 * By implementing your own sub-classes of GameView and GameRules, you can create your own
 * game and let this system handle most of the work for you.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardGameApp
 * @name		CardGameApp
 * @version		0.3
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var CardGameApp = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * Application view element for handling the overall DOM construction and interaction.
	 *
	 * @private		
	 * @type		AppView
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	_appView : null,
	
	/**
	 * Sets the `_appView` property to the value of `appView`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		AppView			appView			The overall application view. Required.
	 */
	__setAppView : function(appView)
	{
		if (appView !== null &&
			(! appView.hasOwnProperty('instanceOf') || ! appView.instanceOf(AppView))) {
			throw new TypeException("AppView", "CardGameApp.__setAppView");
		}
		
		this._appView = appView;
	},
	
	/**
	 * Returns the `_appView` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		AppView			_appView		Returns the `_appView` property.
	 */
	getAppView : function()
	{
		return this._appView;
	},

	/**
	 * The game controller responsible for handling the loaded game's logic and view loading.
	 *
	 * @private		
	 * @type		GameController
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	_gameController : null,
	
	/**
	 * Sets the `_gameController` property to the value of `GameController`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		GameController			gameController			The game controller. Required.
	 */
	__setGameController : function(gameController)
	{
		if (gameController !== null &&
			(! gameController.hasOwnProperty('instanceOf') || ! gameController.instanceOf(GameController))) {
			throw new TypeException("GameController", "CardGameApp.__setGameController");
		}
		
		this._gameController = gameController;
	},
	
	/**
	 * Returns the `_gameController` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		GameController			_gameController		Returns the `_gameController` property.
	 */
	getGameController : function()
	{
		return this._gameController;
	},

	/**
	 * The set of games that this app has registered as implemented and play-able.
	 *
	 * @private		
	 * @type		Array
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	_registeredGames : null,
	
	/**
	 * Sets the `_registeredGames` property to the value of `rg`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		Array			rg			The set of games to register in the app. Required.
	 */
	__setRegisteredGames : function(rg)
	{
		if ($.type(rg) !== "array") {
			throw new TypeException("Array", "CardGameApp.__setRegisteredGames");
		}
		this._registeredGames = rg;
	},
	
	/**
	 * Returns the `_registeredGames` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		Array			_registeredGames		Returns the `_registeredGames` property.
	 */
	getRegisteredGames : function()
	{
		return this._registeredGames;
	},

	/**
	 * The name of the current game being played.
	 *
	 * @private		
	 * @type		String
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	_loadedGame : null,

	/**
	 * Sets the `_loadedGame` property to the value of `lgName`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		String			lgName			The name of the game. Required.
	 */
	__setLoadedGame : function(lgName)
	{
		if ($.type(lgName) !== "string") {
			throw new TypeException("String", "CardGameApp.__setLoadedGame");
		}
		this._loadedGame = lgName;
	},

	/**
	 * Returns the `_loadedGame` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		String			_loadedGame		Returns the `_loadedGame` property.
	 */
	getLoadedGame : function()
	{
		return this._loadedGame;
	},

	/**
	 * Flag indicating whether to log debug messages and exceptions.
	 *
	 * @private		
	 * @type		Boolean
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		false
	 */
	_debug : false,

	/**
	 * Sets the `_debug` property to the value of `debug`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		Boolean			debug			Flag indicating whether to allow debug or not. Required.
	 */
	__setDebug : function(debug)
	{
		if ($.type(debug) !== "boolean") {
			throw new TypeException("Boolean", "CardGameApp.__setDebug");
		}
		this._debug = debug;
	},

	/**
	 * Returns the `_debug` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		Boolean			_debug		Returns the `_debug` property.
	 */
	getDebug : function()
	{
		return this._debug;
	},

	/**
	 * Contains the current interval that runs once per second to update
	 * the HTML showing the amount of time elapsed.
	 *
	 * @private
	 * @type		number
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	__timer : null,

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Initialize the backbone app. Registers available games, then loads up the overall backbone view
	 * before beginning the specified default game.
	 *
	 * @constructor
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @param		jQuery			$containerElement				The jQuery extended DOM element that will contain the entire application and game views. Required.
	 * @param		Array			games							The set of names of games which the user will be able to play. Required.
	 * @param		Boolean			debug							Flag to turn on debugging for development or testing. Optional.
	 */
	__construct : function($containerElement, games, debug)
	{
		var callStackCurrent = "CardGameApp.__construct";

		try {
			// Check for required parameters
			if ($.type($containerElement) === "undefined") {
				throw new CardGameException("Container element is required.", callStackCurrent);
			}
			else if (
				$.type($containerElement) !== "object" ||
			 	$.type($containerElement.jquery) === "undefined"
			) {
				throw new TypeException("jQuery", callStackCurrent);
			}
			else if ($containerElement.length === 0) {
				throw new CardGameException("Specified element could not be found.", callStackCurrent);
			}
			// `$containerElement` is valid.
			
			if ($.type(games) === "undefined") {
				throw new CardGameException("List of games is required.", callStackCurrent);
			}
			else if ($.type(games) !== "array") {
				throw new TypeException("Array", callStackCurrent);
			}
			else if (games.length === 0) {
				throw new CardGameException("List of games cannot be empty.", callStackCurrent);
			}
			// `games` is valid.

			// Proceed with checking and setting the optional `debug` property.
			if ($.type(debug) !== "undefined") {
				this.__setDebug(debug);
			}

			// First, make sure we have at least one game available, and register them.
			this.__registerGames(games);

			// Initialize the application view.
			this.__initApplication($containerElement);

			// Set the application view's event handlers.
			this.__setApplicationEvents();

			// Load the default Game's controller, rules, and view.
			this.__setLoadedGame(this.__loadDefaultGame());
		}
		catch (e) {
			// Set debug to true so the user can see the problem.
			this.__setDebug(true);
			this.logConsoleDebugMessage(e);
			return this;
        }

		// Log the success in the console.
		this.logConsoleDebugMessage(
			new CardGameDebugMessage(
				"Successfully loaded the game " + this.getLoadedGame(),
				callStackCurrent
			)
		);
	},

	/** Private Functions **/

	/**
	 * Make sure that for every game to be registered, that a sub-class of both the
	 * GameRules and GameView classes exist such that 'Game' is replaced by the name
	 * of the game to be registered. Sets the list of registered games when successful,
	 * throws a CardGameException when it fails.
	 * 
	 * @private
	 * @throws		CardGameException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		Array			games				The set of names of games to register as available. Required.
	 */
	__registerGames : function(games)
	{
		var callStackCurrent = "CardGameApp.__registerGames";
		var i = 0;
		var registeredGames = [];
		for (i = 0; i < games.length; i++) {
			try {
				var gameStr = games[i];
				var gameRulesClassStr = gameStr + 'Rules';
				var gameRulesClass = window[gameRulesClassStr];
				var gameViewClassStr = gameStr + 'View';
				var gameViewClass = window[gameViewClassStr];

				// Check that the Rules class exists.
				if ($.type(gameRulesClass) === "undefined") {
					throw new CardGameException(
						"Game class '" + gameRulesClassStr + "' does not exist.",
						callStackCurrent
					);
				}

				// Check that the View class exists.
				if ($.type(gameViewClass) === "undefined") {
					throw new CardGameException(
						"Game class '" + gameViewClassStr + "' does not exist.",
						callStackCurrent
					);
				}

				// The current game we're checking has all the right classes, so register it now.
				registeredGames.push({ 
					gameName : gameStr, 
					gameRulesClass : gameRulesClass,
					gameViewClass : gameViewClass
				});
			}
			catch (e) {
				this.logConsoleDebugMessage(e);
			}
		}

		if (registeredGames.length === 0) {
			// None of the games' classes exist, or are finished enough, to be registered.
			throw new CardGameException("None of the specified Games exist.", callStackCurrent);
		}

		// We have at least one game available, so register it/them.
		this.__setRegisteredGames(registeredGames);
	},

	/**
	 * Generates the AppView for the backbone, and sets the local reference.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		jQuery			$containerElement		The jQuery extended DOM element that will contain the entire application and game views. Required.
	 */
	__initApplication : function($containerElement)
	{
		// Set the overall view to the `$containerElement` param
		var appView = new AppView($containerElement);
		this.__setAppView(appView);
	},

	/**
	 * Register the event handlers for DOM elements in the AppView.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__setApplicationEvents : function()
	{
		// Register event handlers for the buttons that control the overall application.
		// Create the Modal that will give the Player the choice of available games to play.
		this
			.getAppView()
				.getButtons()
					.filter('[data-card-game-button="startNewGame"]')
						.on('click',
							$.proxy(this.__startNewGameBtnClickHandler, this))
				.end()
					.filter('[data-card-game-button="restartCurrentGame"]')
						.on('click', 
							$.proxy(this.__restartCurrentGameBtnClickHandler, this));
	},

	/**
	 * If the `data-card-game` is specified in the main AppView container, and exists
	 * in the list of registered games, load it by default. Otherwise, load the first
	 * game in the list of registered games.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		String						The name of the game that is successfully loaded by `__loadGame()`.
	 */
	__loadDefaultGame : function()
	{
		var domSpecified = this.getAppView().getContainer().attr('data-card-game');
		var registeredGames = this.getRegisteredGames();
		var defaultGameToLoadStr = registeredGames[0].gameName;

		if (domSpecified !== undefined) {
			for (var i = 0; i < registeredGames.length; i++) {
				if (registeredGames[i].gameName === domSpecified) {
					defaultGameToLoadStr = domSpecified;
					break;
				}
			}
		}

		return this.__loadGame(defaultGameToLoadStr);
	},

	/**
	 * Generates the GameController with the specified game name, adds the game's
	 * view to the application's view, and begins the new game.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @param		String			gameName				The name of the game to load. Required.
	 *
	 * @return		String			gameNameLoaded			The name of the game that successfully loaded. Null when there's a problem.
	 */
	__loadGame : function(gameName)
	{
		var gameNameLoaded = null;

		/*if (this.getAppView().getContainer() !== null) {
			this.__removeGameViewEventHandlers();
		}*/
		//this.getAppView().resetAppView();

		try {
			// Generate the GameController...
			var gameController = new GameController(gameName);

			// ...set the generated GameController...
			this.__setGameController(gameController);

			// ...and add the sub-classed GameView object DOM elements to the Application view
			this.__addGameViewToAppView();

			// Begin the game!
			this.getGameController().beginGamePlay();

			if (this.getGameController().getGameRules().getUseTimer()) {
				// Clear the current game timer, if one exists...
				clearInterval(this.__timer);

				// ...and start a new game timer.
				this.__startGameTimer();
			}

			// All the above operations succeeded without throwing an exception.
			gameNameLoaded = gameName;
		}
		catch (e) {
			this.logConsoleDebugMessage(e);
			//this.getAppView().resetAppView();
		}

		return gameNameLoaded;
	},

	/**
	 * Start up a new game timer, and create the interval that will
	 * auto-update the DOM every second.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__startGameTimer : function()
	{
		var dateObj = new Date();
		dateObj.setHours(0);
		dateObj.setMinutes(0);
		dateObj.setSeconds(0);

		this.getAppView().updateTimer(":00");
		var that = this;
		this.__timer = setInterval(function() {
			dateObj.setSeconds(dateObj.getSeconds() + 1);

			var timeStr = '';
			if (dateObj.getMinutes() > 0) {
				timeStr += dateObj.getMinutes();
			}
			timeStr += ':';
			if (dateObj.getSeconds() < 10) {
				timeStr += '0';
			}
			timeStr += dateObj.getSeconds();
			that.getAppView().updateTimer(timeStr);
		}, 1000);
	},

	/**
	 * Adds the game's view DOM container to the application's view DOM element.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__addGameViewToAppView : function()
	{
		var $gameContainer = this.getGameController().getGameView().getGameContainer();
		this.getAppView().initGameView($gameContainer);
	},

	/** Public Functions **/

	/**
	 * If debug is enabled and the console object exists, attempt to log
	 * the debug object.
	 *
	 * If the debug object is an instance of the `CardGameDebugMessage` or
	 * exception type `CardGameException` class (or one of its sub-classes), 
	 * uses its internal `toConsole()` method to construct the log message. 
	 * Otherwise, just uses the value of the debug object.
	 *
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @param		CardGameDebugMessage			debugObject			A `CardGameDebugMessage` instance, or a subclass
	 */
	logConsoleDebugMessage : function(debugObject) {
		if (this.getDebug() === true && console !== undefined) {
			var logString = "";
			if (debugObject.hasOwnProperty('instanceOf') && 
				debugObject.instanceOf(CardGameDebugMessage)) {
				logString = debugObject;
			}
			else if ($.type(debugObject) === "object" &&
				debugObject.toConsole !== undefined &&
				$.type(debugObject.toConsole) === "function") {
				// Handles CardGameDebugMessage, CardGameException, 
				// and any other exception object with a defined `toConsole` method.
				logString = debugObject.toConsole();
			}
			else {
				// Handles numbers, strings, straight-up objects,
				// and anything else supported by default.
				logString = debugObject;
			}

			// @TODO: switch console.error(), console.log(), etc. call based on debugObject.severity
			
			// Actually log the message.
			console.log(logString);
		}
	},

	/** Event Handler Functions **/

	/**
	 * 
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__startNewGameBtnClickHandler : function(event)
	{
		// Show the Game Choice Modal element
		this.getAppView().showGameChoiceModal();
	},

	/**
	 * 
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__startNewSelectedGameBtnClickHandler : function(event)
	{
		var gameStr = $(this).attr('data-card-game-game');
		if (gameStr === null) {
			throw new CardGameException(
				"Expected the game button to have a `data-card-game-game` attribute equal to '" + gameStr + "'.",
				'CardGameApp.__startNewSelectedGameBtnClickHandler'
			);
		}

		// @TODO: check registeredGames for the specified game, throw exception when its not found

		// Load the selected game.
		var success = this.__loadGame(gameStr);

		// Reset the game choice modal in the AppView
		this.getAppView().resetGameChoiceModal();

		return success;
	},

	/**
	 * 
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @updated		0.3
	 */
	__restartCurrentGameBtnClickHandler : function(event)
	{
		// Begin the game!
		this.getGameController().beginGamePlay(false);

		if (this.getGameController().getGameRules().getUseTimer()) {
			// Start a game timer.
			clearInterval(this.__timer);
			this.__startGameTimer();
		}
	}
});
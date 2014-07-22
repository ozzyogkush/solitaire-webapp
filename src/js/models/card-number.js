/**
 * Represents a CardNumber in a deck of cards. A CardNumber contains a card value
 * of 1 - 13 if aces are low, or 2 - 14 if aces are high.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardNumber
 * @name		CardNumber
 * @version		
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
	 * @since		
	 * @default		null
	 */
	_cardValue : null,

	/**
	 * Sets the `_cardValue` property to the value of `cv`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardNumber
	 * @since		
	 * @param		Integer			cv			The numeric value of the CardNumber. Required.
	 */
	__setCardValue : function(cv)
	{
		var parsed = null;
		if (typeof cv !== "number" || (parsed = parseInt(cv) === null)) {
			throw new TypeException("Integer", "CardNumber.__setCardValue");
		}
		this._cardValue = cv;
	},

	/**
	 * Returns the `_cardValue` property.
	 * 
	 * @public
	 * @memberOf	CardNumber
	 * @since		
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
	 * @since		
	 * @default		null
	 */
	_cardNumberName : null,

	/**
	 * Sets the `_cardNumberName` property to the value of `na`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardNumber
	 * @since		
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
	 * @since		
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
	 * @since		
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
});
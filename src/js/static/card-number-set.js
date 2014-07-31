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
});
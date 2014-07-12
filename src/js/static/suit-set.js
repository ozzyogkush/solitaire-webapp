/**
 * Static object that represents all available Suits in a deck of cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		SuitSet
 * @name		SuitSEt
 * @version		
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
	 * @since		
	 * @default		null
	 */
	hearts : null,

	/**
	 * Returns the `hearts` property
	 * 
	 * @public
	 * @memberOf	SuitSet
	 * @since		
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
	 * @since		
	 * @default		null
	 */
	diamonds : null,

	/**
	 * Returns the `diamonds` property
	 * 
	 * @public
	 * @memberOf	SuitSet
	 * @since		
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
	 * @since		
	 * @default		null
	 */
	spades : null,

	/**
	 * Returns the `spades` property
	 * 
	 * @public
	 * @memberOf	SuitSet
	 * @since		
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
	 * @since		
	 * @default		null
	 */
	clubs : null,

	/**
	 * Returns the `clubs` property
	 * 
	 * @public
	 * @memberOf	SuitSet
	 * @since		
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
	 * @since		
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
});
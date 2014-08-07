var srAllSt = new StackTypes();
var srAllFd = new FanningDirectionSet();

/**
 * Implements the rules and stack layout specific to the game Solitaire.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		SolitaireRules
 * @name		SolitaireRules
 * @version		0.3
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
	 * @since		0.3
	 * @default		1
	 */
	_numDecksInGame : 1,

	/**
	 * Solitaire does not use Joker cards.
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	SolitaireRules
	 * @since		0.3
	 * @default		false
	 */
	_includeJokers : false,

	/**
	 * Solitaire has aces low.
	 *
	 * @private
	 * @type		Boolean
	 * @memberOf	SolitaireRules
	 * @since		0.3
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
	 * @since		0.3
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
	 * @since		0.3
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
	 * @since		0.3
	 */
	__construct : function()
	{
		this.super('__construct');
	}

	/** Private Functions **/

	/** Public Functions **/
});
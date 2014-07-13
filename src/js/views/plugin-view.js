/**
 * Abstract base class for implmenting specific game variations' canvas DOM and manipulation.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		PluginView
 * @name		PluginView
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var PluginView = Class({ implements : IViewRules }, {
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

	/** This is an abstract class and should never be instantiated as is. **/

	__construct : function(stacks, layout)
	{
		
	},

	/** Private Functions **/

	/** Public Functions **/

	dealerCollectAllCards : function()
	{

	}

	/*shuffleStack : function(stack)
	{

	},*/
});/*

	/**
	 * This function will perform a check of specified logic conditions that, when 
	 * evaluated to `true`, indicates that the Player has won the current game.
	 *
	 * @public
	 * @memberOf	PluginView
	 * @since		
	 *
	 * @return		Boolean					Returns true when the condititions for winning the game have been met.
	 * /
	gameWon : function() {}

{
	// read layout file
	
	numDecksInGame : int,
	includeJokers : boolean,
	stacks : {
		'dealer' : Stack(StackType.dealer, numFacingDown.all, numFacingUp.zero)
		'inPlay' : [
			Stack(StackType.inPlay, numFacingDown, numFacingUp),
			Stack(StackType.inPlay, numFacingDown, numFacingUp),
			...
			Stack(StackType.inPlay, numFacingDown, numFacingUp)
		],
		draw : [
			Stack(StackType.draw, numFacingDown.zero, numFacingUp.zero)
		],
		'foundation' : [
			Stack(StackType.foundation, numFacingDown.zero, numFacingUp.zero),
		]
	},
	layout : [
		/* using Bootstrap's CSS row and grid system; each array represents a row
			that will be dynamically generated.
		 * /
		[ StackType, StackType, StackType, null, ... , StackType ]
		[ StackType, StackType, StackType, ... , StackType ]
		...
	],
	cardNumAbleToMoveFromInPlayStack : int
	* /
}*/
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
});
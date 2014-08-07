/**
 * Implements the view functionality specific to the game Solitaire.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		SolitaireView
 * @name		SolitaireView
 * @version		0.3
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
	 * @since		0.3
	 *
	 * @param		Array			stackModel			The set of Stacks that define the layout. Required.
	 * @param		String			imageDir			Location of the image directory from which to serve card images. Required.
	 */
	__construct : function(stackModel, imageDir)
	{
		this.super('__construct', stackModel, imageDir);
	}

	/** Private Functions **/

	/** Public Functions **/
});
/**
 * Application view class for handling the overall DOM.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		GameView
 * @name		GameView
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var GameView = Class({
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
	 * @memberOf	GameView
	 * @since		
	 * @default		null
	 */
	_container : null,
	
	/**
	 * Sets the `_container` property to the value of `con`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		jQuery			con			The container element which contains all game elements. Required.
	 */
	__setContainer : function(con)
	{
		if (typeof con !== "object" || con.jquery === undefined) {
			throw new TypeException("jQuery", "GameView.__setContainer");
		}
		this._container = con;
	},
	
	/**
	 * Returns the `_container` property.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		
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
	 * @memberOf	GameView
	 * @since		
	 * @default		null
	 */
	_buttons : null,
	
	/**
	 * Sets the `_buttons` property to the value of `btns`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		jQuery			btns			The set of Buttons that the user will use to interact with the game. Required.
	 */
	__setButtons : function(btns)
	{
		if (typeof btns !== "object" || btns.jquery === undefined) {
			throw new TypeException("jQuery", "GameView.__setButtons");
		}
		this._buttons = btns;
	},
	
	/**
	 * Returns the `_buttons` property.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		
	 *
	 * @return		jQuery			_buttons		Returns the `_buttons` property.
	 */
	getButtons : function()
	{
		return this._buttons;
	},

	/**
	 * PluginView that represents the actual game play area.
	 *
	 * @private		
	 * @type		PluginView
	 * @memberOf	GameView
	 * @since		
	 * @default		null
	 */
	_pluginCanvas : null,
	
	/**
	 * Sets the `_pluginCanvas` property to the value of `cvs`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	GameView
	 * @since		
	 * 
	 * @param		PluginView		cvs			The PluginView representing the main game canvas. Required.
	 */
	__setPluginCanvas : function(cvs)
	{
		if (! cvs.hasOwnProperty('instanceOf') || ! cvs.instanceOf(PluginView)) {
			throw new TypeException("PluginView", "GameView.__setPluginCanvas");
		}
		this._pluginCanvas = cvs;
	},
	
	/**
	 * Returns the `_pluginCanvas` property.
	 * 
	 * @public
	 * @memberOf	GameView
	 * @since		
	 *
	 * @return		PluginView			_pluginCanvas		Returns the `_pluginCanvas` property.
	 */
	getPluginCanvas : function()
	{
		return this._pluginCanvas;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/** This is an abstract class and should never be instantiated as is. **/

	__construct : function(container)
	{
		// This, and the methods it calls internally, should only be called once per
		// card game container element.
		this.__initLayout(container);
	},

	/** Private Functions **/

	__initLayout : function(container)
	{
		this.__setContainer(container);
		this.__createButtons();
	},

	__createButtons : function()
	{
		// Create the buttons and their container element...
		var buttonContainer = $('<div></div>').attr('data-card-game-view-element', 'button-container');
		buttonContainer.append(
			$('<button></button>')
				.attr(
					'data-card-game-button', 
					'startNewGame'
				)
				.text(
					"Start New Game"
				)
		);
		buttonContainer.append(
			$('<button></button>')
				.attr(
					'data-card-game-button',
					'restartCurrentGame'
				)
				.text(
					"Restart Current Game"
				)
		);

		var buttons = buttonContainer.children('button');

		// ...store references to them in this object...
		this.__setButtons(buttons);

		// ...add the buttons to their container...
		buttonContainer.append(this.getButtons());

		// ...and add them to the DOM.
		this.getContainer().prepend(buttonContainer);
	},

	/** Public Functions **/

	initPluginView : function(pluginView)
	{
		this.__setPluginCanvas(pluginView);
	}
});/*

	/**
	 * This function will perform a check of specified logic conditions that, when 
	 * evaluated to `true`, indicates that the Player has won the current game.
	 *
	 * @public
	 * @memberOf	GameView
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
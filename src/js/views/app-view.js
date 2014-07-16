/**
 * Application view class for handling the overall DOM.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		AppView
 * @name		AppView
 * @version		
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
	 * @since		
	 * @default		null
	 */
	_container : null,
	
	/**
	 * Sets the `_container` property to the value of `$con`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	AppView
	 * @since		
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
	 * @memberOf	AppView
	 * @since		
	 * @default		null
	 */
	_buttons : null,
	
	/**
	 * Sets the `_buttons` property to the value of `$btns`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	AppView
	 * @since		
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
				.find('div[data-card-game-view-element="button-container"]')
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
	 * @since		
	 *
	 * @return		jQuery			_buttons		Returns the `_buttons` property.
	 */
	getButtons : function()
	{
		return this._buttons;
	},

	_gameChoiceModal : null,
	
	/**
	 * Sets the `_gameChoiceModal` property to the value of `$gcm`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	
	 * @since		
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
				.find('div[data-card-game-view-element="game-choice-modal"]')
				.remove();
		}

		if ($gcm !== null) {
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
	 * @memberOf	
	 * @since		
	 *
	 * @return		jQuery			_gameChoiceModal		Returns the `_gameChoiceModal` property.
	 */
	getGameChoiceModal : function()
	{
		return this._gameChoiceModal;
	},

	/**
	 * GameView that represents the actual game play area.
	 *
	 * @private		
	 * @type		GameView
	 * @memberOf	AppView
	 * @since		
	 * @default		null
	 */
	_pluginCanvas : null,
	
	/**
	 * Sets the `_pluginCanvas` property to the value of `cvs`, and adds or removes it
	 * from the DOM (depending on whether this is setting it to `null` or to a valid
	 * GameView element).
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	AppView
	 * @since		
	 * 
	 * @param		GameView		cvs			The GameView representing the main game canvas. Required.
	 */
	__setPluginCanvas : function(cvs)
	{
		// Make sure the param is null or a GameView instance
		if (cvs !== null &&
			(! cvs.hasOwnProperty('instanceOf') || ! cvs.instanceOf(GameView))) {
			throw new TypeException("GameView", "AppView.__setPluginCanvas");
		}

		if (this._pluginCanvas !== null) {
			// Always remove an existing plugin canvas first
			this.getContainer()
				.find(this._pluginCanvas.getDOMElements())
				.remove();
		}

		// Add the new plugin canvas if it isn't null
		if (cvs !== null) {
			this.getGameChoiceModal().before(cvs.getDOMElements());
		}

		// Set the object property to the supplied param either way
		this._pluginCanvas = cvs;
	},
	
	/**
	 * Returns the `_pluginCanvas` property.
	 * 
	 * @public
	 * @memberOf	AppView
	 * @since		
	 *
	 * @return		GameView			_pluginCanvas		Returns the `_pluginCanvas` property.
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

	/**
	 * Initialize the basic layout of the game view.
	 *
	 * @constructor
	 * @public
	 * @memberOf	AppView
	 * @since		
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
		this.__initLayout($container);
	},

	/** Private Functions **/

	/**
	 * Initializes the layout of the application view. Creates and adds the set of
	 * buttons to start a new game and restart a current game. Creates and adds the
	 * Modal Bootstrap DOM element used for choosing a game/variation to play.
	 *
	 * @private
	 * @memberOf	AppView
	 * @since		
	 *
	 * @param		jQuery				$container			The jQuery extended HTML element that will contain the entire view area. Required.
	 */
	__initLayout : function($container)
	{
		this.__setContainer($container);
		var $buttons = this.__createButtons();
		this.__setButtons($buttons);
		var $modal = this.__createGameChoiceModal();
		this.__setGameChoiceModal($modal);
	},

	/**
	 * Creates and returns a set of jQuery extended Button elements which will
	 * give the Player the ability to:
	 *	1. to start a new game
	 * 	2. to restart a current game
	 *
	 * @private
	 * @memberOf	AppView
	 * @since		
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
			.add(this.__createButtonAddEventHandler(
				'restartCurrentGame',
				"Restart Current Game"
			));

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
	 * @since		
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
	 * @since		
	 *
	 * @return		jQuery				$modal			A jQuery object containing a `div` element. Required.
	 */
	__createGameChoiceModal : function()
	{
		// Create the modal and its children elements...
		var $modal = $('<div></div>')
			.attr('data-card-game-view-element', 'game-choice-modal');

		return $modal;
	},

	/** Public Functions **/

	/**
	 * 
	 * 
	 * @public
	 * @memberOf	AppView
	 * @since		
	 *
	 * @param		GameView			pluginView		The variation extended GameView object, already instantiated and initialized
	 */
	initGameView : function(pluginView)
	{
		// Adds the instantiated GameView to the DOM.
		this.__setPluginCanvas(pluginView);
	},

	resetGameView : function()
	{
		// Removes the current GameView from the DOM.
		this.__setPluginCanvas(null);
	},

	/** Event Handlers **/

});
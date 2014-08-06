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

});
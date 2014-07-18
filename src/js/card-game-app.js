var CardGameApp = Class({

	_view : null,
	
	/**
	 * Sets the `_view` property to the value of `view`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		
	 * 
	 * @param		GameView			view			The application GameView. Required.
	 */
	__setView : function(view)
	{
		if (view !== null &&
			(! view.hasOwnProperty('instanceOf') || ! view.instanceOf(GameView))) {
			throw new TypeException("PluginView", "CardGameApp.__setView");
		}
		
		this._view = view;
	},
	
	/**
	 * Returns the `_view` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		
	 *
	 * @return		GameView			_view		Returns the `_view` property.
	 */
	getView : function()
	{
		return this._view;
	},

	_registeredVariations : [],
	loadedVariation : false,
	debug : false,

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	__construct : function($containerElement, variations, debug)
	{
		var callStackCurrent = "CardGameApp.__construct";

		try {
			// Check for required parameters
			if ($.type($containerElement) === "undefined") {
				throw new CardGameException("No container element specified.", callStackCurrent);
			}
			else if (
				$.type($containerElement) !== "object" ||
			 	$.type($containerElement.jquery) === "undefined"
			) {
				throw new TypeException("jQuery", callStackCurrent);
			}
			else if ($containerElement.length === 0) {
				throw new CardGameException("Specified element could not be found.", callStackCurrent);
			}
			// `$containerElement` is valid.

			if ($.type(variations) !== "array") {
				throw new TypeException("array", callStackCurrent);
			}
			else if (variations.length === 0) {
				throw new CardGameException("Empty set of variations is not allowed.", callStackCurrent);
			}

			// `variations` is valid.
		}
		catch (e) {
			// Set debug to true so the user can see the problem.
			this.debug = true;
			this.logConsoleDebugMessage(e);
			return this;
		}

		// Proceed with checking and setting the optional `debug` property.
		if ($.type(debug) !== "undefined" && 
			$.type(debug) === "boolean") {
			this.debug = debug;
		}

		// Step 1: register all Variation plugins
		try {
			this.__registerVariations(variations);
		}
		catch (e) {
			// If it reaches this point, it means that no Variations could be registered,
			// so there's nothing more to do.
			this.logConsoleDebugMessage(e);
			return this;
		}

		this.__initApplication($containerElement);

		// Load the specified Variation
		this.loadedVariation = this.__loadDefaultVariation();
	},

	/** Private Functions **/

	__initApplication : function($containerElement)
	{
		// Set the overall view to the `$containerElement` param, and register event handlers
		// for the buttons that control the overall application. Create the Modal that will
		// give the Player the choice of available variations/plugins/games to play.
		this.__setView(new AppView($containerElement));
		this.getView()
			.getButtons()
				.filter('[data-card-game-button="startNewGame"]')
					.on('click', this.__startNewGameBtnClickHandler)
			.end()
				.filter('[data-card-game-button="restartCurrentGame"]') /*jshint asi:true */
					on('click', this.__restartCurrentGameBtnClickHandler);
	},

	__registerVariations : function(variations)
	{
		var callStackCurrent = "CardGameApp.__registerVariations";
		var i = 0;
		this._registeredVariations = [];
		for (i = 0; i < variations.length; i++) {
			try {
				var variationStr = variations[i];
				var variationClass = window[variationStr];
				if ($.type(variationClass) === "undefined") {
					throw new CardGameException(
						"Variation class '" + variationStr + "' does not exist.",
						callStackCurrent
					);
				}
				this._registeredVariations.push({ 
					variationName : variationStr, 
					variationClass : variationClass 
				});
			}
			catch (e) {
				this.logConsoleDebugMessage(e);
			}
		}

		if (this._registeredVariations.length === 0) {
			throw new CardGameException("None of the specified Variation classes exist.", callStackCurrent);
		}
	},

	__loadDefaultVariation : function()
	{
		var domSpecified = this.getView().getContainer().attr('data-card-game');
		var defaultVariationToLoadStr = this._registeredVariations[0].variationName;

		if (domSpecified !== null) {
			for (var i = 0; i < this._registeredVariations.length; i++) {
				if (this._registeredVariations[i].variationName === domSpecified) {
					defaultVariationToLoadStr = domSpecified;
					break;
				}
			}
		}

		return this.loadVariation(defaultVariationToLoadStr);
	},

	__loadVariation : function(variationName)
	{
		// Actually load the specified variation model and view.
		var successOrFail = false;

		if (this.getView().getGameViewCanvas() !== null) {
			this.__removeGameViewEventHandlers();
		}
		this.getView().resetPluginView();

		try {
			// Generate the model/rules specific to the variation plugin
			var model = this.__generateVariationModel(variationName);

			// Init the variation plugin's view and apply it to the main application view
			this.getView().initGameView(this.__generateVariationView(variationName, model));

			// We've successfully set the Model and View for this
			// game, so add the proper event handlers to the correct DOM elements.
			// Since the View has access to the Model, it can use that logic to
			// figure out what to do with the cards and stacks when the user interacts.
			this.__addGameViewEventHandlers();

			// All the above operations succeeded without throwing an exception.
			successOrFail = true;
		}
		catch (e) {
			this.logConsoleDebugMessage(e);
			this.getView().resetPluginView();
		}

		return successOrFail;
	},

	/*__generateVariation : function(variationName)
	{
		if (window[variationName] !== undefined) {
			throw new TypeException(variationName, "CardGameApp.__generateVariation");
		}

		return new window[variationName]();
	},*/

	__generateVariationModel : function(variationName)
	{
		var modelClassName = variationName + "Rules";
		if (window[modelClassName] !== undefined) {
			throw new TypeException(modelClassName, "CardGameApp.__generateVariationModel");
		}

		return new window[modelClassName]();
	},

	__generateVariationView : function(variationName, model)
	{
		var viewClassName = variationName + "View";
		if (window[viewClassName] !== undefined) {
			throw new TypeException(viewClassName, "CardGameApp.__generateVariationView");
		}

		return new window[viewClassName](model);
	},

	__removeGameViewEventHandlers : function()
	{
		var gameViewCanvas = this.getView().getGameViewCanvas();
		gameViewCanvas.getDOMElements()
			.filter('[data-card-game-view-element="canvas-container"]')
				.off('mousedown touchstart', gameViewCanvas.mouseDownTouchStartEventHandler)
				.off('mouseup touchend', gameViewCanvas.mouseUpTouchEndEventHandler)
				.off('mousemove touchmove', gameViewCanvas.mouseMoveTouchMoveEventHandler)
				.off('click', gameViewCanvas.mouseClickEventHandler);
	},

	__addGameViewEventHandlers : function()
	{
		var gameViewCanvas = this.getView().getGameViewCanvas();
		gameViewCanvas.getDOMElements()
			.filter('[data-card-game-view-element="canvas-container"]')
				.on('mousedown touchstart', gameViewCanvas.mouseDownTouchStartEventHandler)
				.on('mouseup touchend', gameViewCanvas.mouseUpTouchEndEventHandler)
				.on('mousemove touchmove', gameViewCanvas.mouseMoveTouchMoveEventHandler)
				.on('click', gameViewCanvas.mouseClickEventHandler);
	},

	/** Public Functions **/

	/** should the below go here, or in the view? **/
	dealerCollectAllCards : function()
	{

	},

	shuffleCards : function()
	{
		
	},
	/** should the above go here, or in the view? **/

	/** Event Handler Functions **/

	__startNewGameBtnClickHandler : function(event)
	{
		// Show the Game Choice Modal element
		//this.getView().getGameChoiceModal().
	},

	__startNewSelectedGameBtnClickHandler : function(event)
	{
		var variationStr = $(this).attr('data-card-game-variation');
		if (variationStr === null) {
			throw new CardGameException(
				"Expected the game button to have a `data-card-game-variation` attribute equal to '" + variationStr + "'.",
				'CardGameApp.__startNewSelectedGameBtnClickHandler'
			);
		}

		return this.__loadVariation(variationStr);
	},

	__restartCurrentGameBtnClickHandler : function(event)
	{

	},

	/**
	 * If debug is enabled and the console object exists, attempt to log
	 * the debug object.
	 *
	 * If the debug object is an instance of the `CardGameDebugMessage` or
	 * exception type `CardGameException` class (or one of its sub-classes), 
	 * uses its internal `toConsole()` method to construct the log message. 
	 * Otherwise, just uses the value of the debug object.
	 *
	 * @public
	 * @memberOf	CardGameApp
	 * @since		
	 *
	 * @param		CardGameDebugMessage			debugObject			A `CardGameDebugMessage` instance, or a subclass
	 */
	logConsoleDebugMessage : function(debugObject) {
		if (this.debug && console !== undefined) {
			var logString = "";
			if ($.type(debugObject) === "object" &&
				debugObject.toConsole !== undefined &&
				$.type(debugObject.toConsole) === "function") {
				// Handles CardGameDebugMessage, CardGameException, 
				// and any other exception object with a defined `toConsole` method.
				logString = debugObject.toConsole();
			}
			else {
				// Handles numbers, strings, straight-up objects,
				// and anything else supported by default.
				logString = debugObject;
			}

			// @TODO: switch console.error(), console.log(), etc. call based on debugObject.severity
			
			// Actually log the message.
			console.log(logString);
		}
	}
});
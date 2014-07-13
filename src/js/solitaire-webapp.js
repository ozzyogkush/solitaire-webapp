var CardGameApp = Class({

	_model : null,
	
	/**
	 * Sets the `_model` property to the value of `model`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		
	 * 
	 * @param		GameRules			model			The implemented variation GameRules model. Required.
	 */
	__setModel : function(model)
	{
		if (! model.hasOwnProperty('instanceOf') || ! model.instanceOf(GameRules)) {
			throw new TypeException("GameRules", "CardGameApp.__setModel");
		}

		this._model = model;
	},
	
	/**
	 * Returns the `_model` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		
	 *
	 * @return		GameRules			_model		Returns the `_model` property.
	 */
	getModel : function()
	{
		return this._model;
	},

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
		if (! view.hasOwnProperty('instanceOf') || ! view.instanceOf(GameView)) {
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

	_cards : null,

	_registeredVariations : [],
	loadedVariation : false,
	debug : false,

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	__construct : function(containerElement, variations, debug)
	{
		var callStackCurrent = "CardGameApp.__construct";

		try {
			// Check for required parameters
			if ($.type(containerElement) === "undefined") {
				throw new CardGameException("No container element specified.", callStackCurrent);
			}
			else if (
				$.type(containerElement) !== "object" ||
			 	$.type(containerElement.jquery) === "undefined"
			) {
				throw new TypeException("jQuery", callStackCurrent);
			}
			else if (containerElement.length === 0) {
				throw new CardGameException("Specified element could not be found.", callStackCurrent);
			}
			// `containerElement` is valid.

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

		// Set the overall view to the `containerElement` param, and register event handlers
		// for the buttons that control the overall application.
		this.__setView(new GameView(containerElement));
		var that = this;
		this.getView().getButtons().each(function() {
			var curBtn = $(this);
			if (curBtn.attr('data-card-game-button') === 'startNewGame') {
				curBtn.on('click', that.startNewGameHandler);
			}
			if (curBtn.attr('data-card-game-button') === 'restartCurrentGame') {
				curBtn.on('click', that.restartCurrentGameHandler);
			}
		});

		// Step 1: register all Variation plugins
		try {
			this.__registerVariations(variations);
		}
		catch (e) {
			this.logConsoleDebugMessage(e);
			return this;
		}

		// Load the specified Variation
		this.loadedVariation = this.__loadDefaultVariation();

		if (this.loadedVariation) {
			// 
		}

		//this.loadedVariation.get

		/*
		// Step : 

		// Step : 

		// Step : 

		// Step : 

		// Step : 
		*/
	},

	/** Private Functions **/

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
					throw new CardGameException("Variation class '" + variationStr + "' does not exist.", callStackCurrent);
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
		var domSpecified = this.view.getContainer().attr('data-card-game');
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

		this.__setModel(null);

		try {
			this.__setModel(this.__generateVariationModel(variationName));
			this.getView().initPluginView(this.__generateVariationView(variationName));

			successOrFail = true;
		}
		catch (e) {
			this.logConsoleDebugMessage(e);
		}

		return successOrFail;
	},

	__generateVariationModel : function()
	{
		var modelClassName = variationName + "Rules";
		if (window[modelClassName] !== undefined) {
			throw new TypeException(modelClassName, "CardGameApp.__generateVariationModel");
		}

		return new window[modelClassName]();
	},

	__generateVariationView : function()
	{
		var viewClassName = variationName + "View";
		if (window[viewClassName] !== undefined) {
			throw new TypeException(viewClassName, "CardGameApp.__generateVariationView");
		}

		return new window[viewClassName](this.getModel().getStacks(), this.getModel().getLayout());
	},

	/** Public Functions **/

	startNewGameHandler : function(event)
	{

	},

	restartCurrentGameHandler : function(event)
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

			// switch console.error(), console.log(), etc. call based on debugObject.severity
			
			// Actually log the message.
			console.log(logString);
		}
	}
});
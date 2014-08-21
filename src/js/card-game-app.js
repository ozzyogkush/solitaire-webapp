/**
 * A Card game backbone application. Allows you to start a new game, or restart a current game.
 *
 * By implementing your own sub-classes of GameView and GameRules, you can create your own
 * game and let this system handle most of the work for you.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardGameApp
 * @name		CardGameApp
 * @version		0.3
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var CardGameApp = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * Application view element for handling the overall DOM construction and interaction.
	 *
	 * @private		
	 * @type		AppView
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	_appView : null,
	
	/**
	 * Sets the `_appView` property to the value of `appView`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		AppView			appView			The overall application view. Required.
	 */
	__setAppView : function(appView)
	{
		if (appView !== null &&
			(! appView.hasOwnProperty('instanceOf') || ! appView.instanceOf(AppView))) {
			throw new TypeException("AppView", "CardGameApp.__setAppView");
		}
		
		this._appView = appView;
	},
	
	/**
	 * Returns the `_appView` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		AppView			_appView		Returns the `_appView` property.
	 */
	getAppView : function()
	{
		return this._appView;
	},

	/**
	 * The game controller responsible for handling the loaded game's logic and view loading.
	 *
	 * @private		
	 * @type		GameController
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	_gameController : null,
	
	/**
	 * Sets the `_gameController` property to the value of `GameController`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		GameController			gameController			The game controller. Required.
	 */
	__setGameController : function(gameController)
	{
		if (gameController !== null &&
			(! gameController.hasOwnProperty('instanceOf') || ! gameController.instanceOf(GameController))) {
			throw new TypeException("GameController", "CardGameApp.__setGameController");
		}
		
		this._gameController = gameController;
	},
	
	/**
	 * Returns the `_gameController` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		GameController			_gameController		Returns the `_gameController` property.
	 */
	getGameController : function()
	{
		return this._gameController;
	},

	/**
	 * The set of games that this app has registered as implemented and play-able.
	 *
	 * @private		
	 * @type		Array
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	_registeredGames : null,
	
	/**
	 * Sets the `_registeredGames` property to the value of `rg`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		Array			rg			The set of games to register in the app. Required.
	 */
	__setRegisteredGames : function(rg)
	{
		if ($.type(rg) !== "array") {
			throw new TypeException("Array", "CardGameApp.__setRegisteredGames");
		}
		this._registeredGames = rg;
	},
	
	/**
	 * Returns the `_registeredGames` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		Array			_registeredGames		Returns the `_registeredGames` property.
	 */
	getRegisteredGames : function()
	{
		return this._registeredGames;
	},

	/**
	 * The name of the current game being played.
	 *
	 * @private		
	 * @type		String
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	_loadedGame : null,

	/**
	 * Sets the `_loadedGame` property to the value of `lgName`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		String			lgName			The name of the game. Required.
	 */
	__setLoadedGame : function(lgName)
	{
		if ($.type(lgName) !== "string") {
			throw new TypeException("String", "CardGameApp.__setLoadedGame");
		}
		this._loadedGame = lgName;
	},

	/**
	 * Returns the `_loadedGame` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		String			_loadedGame		Returns the `_loadedGame` property.
	 */
	getLoadedGame : function()
	{
		return this._loadedGame;
	},

	/**
	 * Flag indicating whether to log debug messages and exceptions.
	 *
	 * @private		
	 * @type		Boolean
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		false
	 */
	_debug : false,

	/**
	 * Sets the `_debug` property to the value of `debug`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		Boolean			debug			Flag indicating whether to allow debug or not. Required.
	 */
	__setDebug : function(debug)
	{
		if ($.type(debug) !== "boolean") {
			throw new TypeException("Boolean", "CardGameApp.__setDebug");
		}
		this._debug = debug;
	},

	/**
	 * Returns the `_debug` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		Boolean			_debug		Returns the `_debug` property.
	 */
	getDebug : function()
	{
		return this._debug;
	},

	/**
	 * Contains the location of images where cards etc. reside. Will always contain 
	 * a trailing slash ("/").
	 *
	 * @private		
	 * @type		String
	 * @memberOf	CardGameApp
	 * @since		
	 * @default		null
	 */
	_imageDir : null,

	/**
	 * Sets the `_imageDir` property to the value of `dir`. Will append a trailing slash ("/")
	 * if one is not already there.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	CardGameApp
	 * @since		
	 * 
	 * @param		String			dir			The directory where images are stored.. Required.
	 */
	__setImageDir : function(dir)
	{
		if (typeof dir !== "string") {
			throw new TypeException("String", "CardGameApp.__setImageDir");
		}

		if (dir.lastIndexOf("/") < (dir.length - 1)) {
			dir += "/";			
		}
		this._imageDir = dir;
	},

	/**
	 * Returns the `_imageDir` property.
	 * 
	 * @public
	 * @memberOf	CardGameApp
	 * @since		
	 *
	 * @return		String			_imageDir		Returns the `_imageDir` property.
	 */
	getImageDir : function()
	{
		return this._imageDir;
	},

	/**
	 * Contains the current interval that runs once per second to update
	 * the HTML showing the amount of time elapsed.
	 *
	 * @private
	 * @type		number
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @default		null
	 */
	__timer : null,

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Initialize the backbone app. Registers available games, then loads up the overall backbone view
	 * before beginning the specified default game.
	 *
	 * @constructor
	 * @public
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @param		jQuery			$containerElement				The jQuery extended DOM element that will contain the entire application and game views. Required.
	 * @param		Array			games							The set of names of games which the user will be able to play. Required.
	 * @param		Boolean			debug							Flag to turn on debugging for development or testing. Optional.
	 */
	__construct : function(options)
	{
		var callStackCurrent = "CardGameApp.__construct";

		try {
			if ($.type(options) === "undefined") {
				throw new CardGameException("Options are required.", callStackCurrent);
			}
			else if (
				$.type(options) !== "object" ||
			 	$.type(options) === "undefined"
			) {
				throw new TypeException("Object", callStackCurrent);
			}

			// Check for required parameters
			if ($.type(options.containerElement) === "undefined") {
				throw new CardGameException("Container element option is required.", callStackCurrent);
			}
			else if (
				$.type(options.containerElement) !== "object" ||
			 	$.type(options.containerElement.jquery) === "undefined"
			) {
				throw new TypeException("jQuery", callStackCurrent);
			}
			else if (options.containerElement.length === 0) {
				throw new CardGameException("Specified element could not be found.", callStackCurrent);
			}
			// `options.containerElement` is valid.
			
			if ($.type(options.games) === "undefined") {
				throw new CardGameException("List of games is required.", callStackCurrent);
			}
			else if ($.type(options.games) !== "array") {
				throw new TypeException("Array", callStackCurrent);
			}
			else if (options.games.length === 0) {
				throw new CardGameException("List of games cannot be empty.", callStackCurrent);
			}
			// `options.games` is valid.

			if ($.type(options.imgdir) === "undefined") {
				throw new CardGameException("Image directory option is required.", callStackCurrent);
			}
			else if ($.type(options.imgdir) !== "string") {
				throw new TypeException("String", callStackCurrent);
			}
			else if (options.imgdir.length === 0) {
				throw new CardGameException("Image directory must not be empty.", callStackCurrent);
			}
			// `options.imgdir` is valid.
			this.__setImageDir(options.imgdir);

			// Proceed with checking and setting the optional `debug` property.
			if ($.type(options.debug) !== "undefined") {
				this.__setDebug(options.debug);
			}

			// First, make sure we have at least one game available, and register them.
			this.__registerGames(options.games);

			// Initialize the application view.
			this.__initApplication(options.containerElement);

			// Set the application view's event handlers.
			this.__setApplicationEvents();

			// Load the default Game's controller, rules, and view.
			this.__setLoadedGame(this.__loadDefaultGame());
		}
		catch (e) {
			// Set debug to true so the user can see the problem.
			this.__setDebug(true);
			this.logConsoleDebugMessage(e);
			return this;
        }

		// Log the success in the console.
		this.logConsoleDebugMessage(
			new CardGameDebugMessage(
				"Successfully loaded the game " + this.getLoadedGame(),
				callStackCurrent
			)
		);
	},

	/** Private Functions **/

	/**
	 * Make sure that for every game to be registered, that a sub-class of both the
	 * GameRules and GameView classes exist such that 'Game' is replaced by the name
	 * of the game to be registered. Sets the list of registered games when successful,
	 * throws a CardGameException when it fails.
	 * 
	 * @private
	 * @throws		CardGameException
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		Array			games				The set of names of games to register as available. Required.
	 */
	__registerGames : function(games)
	{
		var callStackCurrent = "CardGameApp.__registerGames";
		var i = 0;
		var registeredGames = [];
		for (i = 0; i < games.length; i++) {
			try {
				var gameStr = games[i];
				var gameRulesClassStr = gameStr + 'Rules';
				var gameRulesClass = window[gameRulesClassStr];
				var gameViewClassStr = gameStr + 'View';
				var gameViewClass = window[gameViewClassStr];

				// Check that the Rules class exists.
				if ($.type(gameRulesClass) === "undefined") {
					throw new CardGameException(
						"Game class '" + gameRulesClassStr + "' does not exist.",
						callStackCurrent
					);
				}

				// Check that the View class exists.
				if ($.type(gameViewClass) === "undefined") {
					throw new CardGameException(
						"Game class '" + gameViewClassStr + "' does not exist.",
						callStackCurrent
					);
				}

				// The current game we're checking has all the right classes, so register it now.
				registeredGames.push({ 
					gameName : gameStr, 
					gameRulesClass : gameRulesClass,
					gameViewClass : gameViewClass
				});
			}
			catch (e) {
				this.logConsoleDebugMessage(e);
			}
		}

		if (registeredGames.length === 0) {
			// None of the games' classes exist, or are finished enough, to be registered.
			throw new CardGameException("None of the specified Games exist.", callStackCurrent);
		}

		// We have at least one game available, so register it/them.
		this.__setRegisteredGames(registeredGames);
	},

	/**
	 * Generates the AppView for the backbone, and sets the local reference.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * 
	 * @param		jQuery			$containerElement		The jQuery extended DOM element that will contain the entire application and game views. Required.
	 */
	__initApplication : function($containerElement)
	{
		// Set the overall view to the `$containerElement` param
		var appView = new AppView($containerElement);
		this.__setAppView(appView);
	},

	/**
	 * Register the event handlers for DOM elements in the AppView.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__setApplicationEvents : function()
	{
		// Register event handlers for the buttons that control the overall application.
		// Create the Modal that will give the Player the choice of available games to play.
		this
			.getAppView()
				.getButtons()
					.filter('[data-card-game-button="startNewGame"]')
						.on('click',
							$.proxy(this.__startNewGameBtnClickHandler, this))
				.end()
					.filter('[data-card-game-button="restartCurrentGame"]')
						.on('click', 
							$.proxy(this.__restartCurrentGameBtnClickHandler, this));
	},

	/**
	 * If the `data-card-game` is specified in the main AppView container, and exists
	 * in the list of registered games, load it by default. Otherwise, load the first
	 * game in the list of registered games.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @return		String						The name of the game that is successfully loaded by `__loadGame()`.
	 */
	__loadDefaultGame : function()
	{
		var domSpecified = this.getAppView().getContainer().attr('data-card-game');
		var registeredGames = this.getRegisteredGames();
		var defaultGameToLoadStr = registeredGames[0].gameName;

		if (domSpecified !== undefined) {
			for (var i = 0; i < registeredGames.length; i++) {
				if (registeredGames[i].gameName === domSpecified) {
					defaultGameToLoadStr = domSpecified;
					break;
				}
			}
		}

		return this.__loadGame(defaultGameToLoadStr);
	},

	/**
	 * Generates the GameController with the specified game name, adds the game's
	 * view to the application's view, and begins the new game.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 *
	 * @param		String			gameName				The name of the game to load. Required.
	 *
	 * @return		String			gameNameLoaded			The name of the game that successfully loaded. Null when there's a problem.
	 */
	__loadGame : function(gameName)
	{
		var gameNameLoaded = null;

		if (this.getGameController() !== null) {
			// Remove the existing event handlers.
			this.getGameController().removeEventHandlers();
		}

		try {
			// Generate the GameController...
			var gameController = new GameController(gameName, this.getImageDir());

			// ...set the generated GameController...
			this.__setGameController(gameController);

			// ...and add the sub-classed GameView object DOM elements to the Application view
			this.__addGameViewToAppView();

			// Begin the game!
			this.getGameController().beginGamePlay();

			// Add the event handlers so the user can start playing.
			this.getGameController().addEventHandlers();

			if (this.getGameController().getGameRules().getUseTimer()) {
				// Clear the current game timer, if one exists...
				clearInterval(this.__timer);

				// ...and start a new game timer.
				this.__startGameTimer();
			}

			// All the above operations succeeded without throwing an exception.
			gameNameLoaded = gameName;
		}
		catch (e) {
			this.logConsoleDebugMessage(e);
			if (this.getGameController() !== null) {
				this.getGameController().removeEventHandlers();
			}
		}

		return gameNameLoaded;
	},

	/**
	 * Start up a new game timer, and create the interval that will
	 * auto-update the DOM every second.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__startGameTimer : function()
	{
		var dateObj = new Date();
		dateObj.setHours(0);
		dateObj.setMinutes(0);
		dateObj.setSeconds(0);

		this.getAppView().updateTimer(":00");
		var that = this;
		this.__timer = setInterval(function() {
			dateObj.setSeconds(dateObj.getSeconds() + 1);

			var timeStr = '';
			if (dateObj.getMinutes() > 0) {
				timeStr += dateObj.getMinutes();
			}
			timeStr += ':';
			if (dateObj.getSeconds() < 10) {
				timeStr += '0';
			}
			timeStr += dateObj.getSeconds();
			that.getAppView().updateTimer(timeStr);
		}, 1000);
	},

	/**
	 * Adds the game's view DOM container to the application's view DOM element.
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__addGameViewToAppView : function()
	{
		var $gameContainer = this.getGameController().getGameView().getGameContainer();
		this.getAppView().initGameView($gameContainer);
	},

	/** Public Functions **/

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
	 * @since		0.2
	 *
	 * @param		CardGameDebugMessage			debugObject			A `CardGameDebugMessage` instance, or a subclass
	 */
	logConsoleDebugMessage : function(debugObject) {
		if (this.getDebug() === true && console !== undefined) {
			var logString = "";
			if (debugObject.hasOwnProperty('instanceOf') && 
				debugObject.instanceOf(CardGameDebugMessage)) {
				logString = debugObject;
			}
			else if ($.type(debugObject) === "object" &&
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
	},

	/** Event Handler Functions **/

	/**
	 * 
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__startNewGameBtnClickHandler : function(event)
	{
		// Show the Game Choice Modal element
		this.getAppView().showGameChoiceModal();
	},

	/**
	 * 
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 */
	__startNewSelectedGameBtnClickHandler : function(event)
	{
		var gameStr = $(this).attr('data-card-game-game');
		if (gameStr === null) {
			throw new CardGameException(
				"Expected the game button to have a `data-card-game-game` attribute equal to '" + gameStr + "'.",
				'CardGameApp.__startNewSelectedGameBtnClickHandler'
			);
		}

		// @TODO: check registeredGames for the specified game, throw exception when its not found

		// Load the selected game.
		var success = this.__loadGame(gameStr);

		// Reset the game choice modal in the AppView
		this.getAppView().resetGameChoiceModal();

		return success;
	},

	/**
	 * 
	 * 
	 * @private
	 * @memberOf	CardGameApp
	 * @since		0.2
	 * @updated		0.3
	 */
	__restartCurrentGameBtnClickHandler : function(event)
	{
		// Begin the game!
		this.getGameController().beginGamePlay(false);

		if (this.getGameController().getGameRules().getUseTimer()) {
			// Start a game timer.
			clearInterval(this.__timer);
			this.__startGameTimer();
		}
	}
});
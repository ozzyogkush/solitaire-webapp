/**
 * Contains severity information for `CardGameException` objects. Each defined
 * severity level needs to contain a unique `code` value, and a `prefix`.
 *
 * Prefixes are used for constructing log message strings.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		CardGameExceptionSeverity
 * @name		CardGameExceptionSeverity
 * @version		
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var CardGameExceptionSeverity = {
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Info severity. To be used when the user needs to know something happened,
	 * but it's not a problem.
	 *
	 * Code 0.
	 *
	 * @public
	 * @type		Object
	 * @memberOf	CardGameExceptionSeverity
	 * @since		
	 */
	INFO : {
		code: 0,
		prefix : "Info: "
	},
	
	/**
	 * Warning severity. To be used when there is a slight problem and the user
	 * needs to know that it happened, but recovery is possible.
	 *
	 * Code 1.
	 *
	 * @public
	 * @type		Object
	 * @memberOf	CardGameExceptionSeverity
	 * @since		
	 */
	WARNING : {
		code: 1,
		prefix : "Warning: "
	},
	
	/**
	 * Error severity. To be used when there is a serious problem, the user needs
	 * to know it happened, and recovery is not possible.
	 *
	 * Code 2.
	 *
	 * @public
	 * @type		Object
	 * @memberOf	CardGameExceptionSeverity
	 * @since		
	 */
	ERROR : {
		code: 2,
		prefix : "Error: "
	},
	
	/**
	 * Speed severity. To be used when methods take too long to complete (compared to
	 * some predefined method speed).
	 *
	 * Code 3.
	 *
	 * @public
	 * @type		Object
	 * @memberOf	CardGameExceptionSeverity
	 * @since		
	 */
	SPEED : {
		code : 3,
		prefix : "Speed: "
	}
	
	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------
};
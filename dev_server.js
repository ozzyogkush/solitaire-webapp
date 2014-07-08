/**
 * Basic webserver that sets up two connections:
 *	1.) to the /bin directory, for feature development
 *	2.) to the /prototype directory, for testing out ideas separate of the current in-dev feature
 *
 * This allows you to specify a port as the first parameter after the name of the application.
 *
 * Default port is 8080 if none is specified.
 *
 * A special port is available for prototyping ideas outside of the repository branch source
 *
 * @TODO - allow the user to specify the directory they're prototyping from.
 */

var connect = require('connect');
var serveStatic = require('serve-static');

var portWasSpecified = (process.argv[2] != null);
var parsedPort = null;

// If specified, the port is only valid if it parses as a number.
var portValid = (! portWasSpecified || ! isNaN(parsedPort = parseInt(process.argv[2])));

// The port's valid, so determine if we're using a passed in value or the default.
var port = portValid && parsedPort ? parsedPort : 8080;

// Special port for prototyping ideas that shouldn't be done in the branch source 
// (ie throwaway implementations). This is the "/bin" port number + 1.
var prototypePort = port + 1;

// We serve the "/bin" directory out of the port we determined.
connect().use(serveStatic(__dirname + "/bin")).listen(port);

// Lastly we serve the "/prototype" directory out of the special port we determined.
connect().use(serveStatic(__dirname + "/prototype")).listen(prototypePort);
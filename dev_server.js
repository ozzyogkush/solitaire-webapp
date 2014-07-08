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

// The default port is 8080.
var port = 8080;

if (process.argv[2] != null) {
	// The user passed in a port argument...
	var parsedPort = parseInt(process.argv[2]);

	if (! isNaN(parsedPort)) { 
		// ...and the argument was a valid number, so set the port to that number.
		port = parsedPort; 
	}
}

// Special port for prototyping ideas that shouldn't be done in the branch source 
// (ie throwaway implementations). This is the "/bin" port number + 1.
var prototypePort = port + 1;

// We serve the "/bin" directory out of the port we determined.
connect().use(serveStatic(__dirname + "/bin")).listen(port);

// Lastly we serve the "/prototype" directory out of the special port we determined.
connect().use(serveStatic(__dirname + "/prototype")).listen(prototypePort);
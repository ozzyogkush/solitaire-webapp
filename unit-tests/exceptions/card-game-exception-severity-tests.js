// Unit tests for exceptions/card-game-exception-severity.js

QUnit.test( "property tests", function( assert ) {
	expect(16);

	/* CardGameExceptionSeverity.INFO */
	assert.ok(
		CardGameExceptionSeverity.INFO.hasOwnProperty('code'),
		"`CardGameExceptionSeverity.INFO` object does not contain expected property `code`."
	);

	assert.strictEqual(
		CardGameExceptionSeverity.INFO.code,
		0,
		"`CardGameExceptionSeverity.INFO` object property `code` does not match expected integer value of 0."
	);

	assert.ok(
		CardGameExceptionSeverity.INFO.hasOwnProperty('prefix'),
		"`CardGameExceptionSeverity.INFO` object does not contain expected property `prefix`."
	);

	assert.strictEqual(
		CardGameExceptionSeverity.INFO.prefix,
		'Info: ',
		"`CardGameExceptionSeverity.INFO` object property `prefix` does not match expected string value of 'Info: '."
	);


	/* CardGameExceptionSeverity.WARNING */
	assert.ok(
		CardGameExceptionSeverity.WARNING.hasOwnProperty('code'),
		"`CardGameExceptionSeverity.WARNING` object does not contain expected property `code`."
	);

	assert.strictEqual(
		CardGameExceptionSeverity.WARNING.code,
		1,
		"`CardGameExceptionSeverity.WARNING` object property `code` does not match expected integer value of 1."
	);

	assert.ok(
		CardGameExceptionSeverity.WARNING.hasOwnProperty('prefix'),
		"`CardGameExceptionSeverity.WARNING` object does not contain expected property `prefix`."
	);

	assert.strictEqual(
		CardGameExceptionSeverity.WARNING.prefix,
		'Warning: ',
		"`CardGameExceptionSeverity.WARNING` object property `prefix` does not match expected string value of 'Warning: '."
	);

	/* CardGameExceptionSeverity.ERROR */
	assert.ok(
		CardGameExceptionSeverity.ERROR.hasOwnProperty('code'),
		"`CardGameExceptionSeverity.ERROR` object does not contain expected property `code`."
	);

	assert.strictEqual(
		CardGameExceptionSeverity.ERROR.code,
		2,
		"`CardGameExceptionSeverity.ERROR` object property `code` does not match expected integer value of 2."
	);

	assert.ok(
		CardGameExceptionSeverity.ERROR.hasOwnProperty('prefix'),
		"`CardGameExceptionSeverity.ERROR` object does not contain expected property `prefix`."
	);

	assert.strictEqual(
		CardGameExceptionSeverity.ERROR.prefix,
		'Error: ',
		"`CardGameExceptionSeverity.ERROR` object property `prefix` does not match expected string value of 'Error: '."
	);

	/* CardGameExceptionSeverity.SPEED */
	assert.ok(
		CardGameExceptionSeverity.SPEED.hasOwnProperty('code'),
		"`CardGameExceptionSeverity.SPEED` object does not contain expected property `code`."
	);

	assert.strictEqual(
		CardGameExceptionSeverity.SPEED.code,
		3,
		"`CardGameExceptionSeverity.SPEED` object property `code` does not match expected integer value of 3."
	);

	assert.ok(
		CardGameExceptionSeverity.SPEED.hasOwnProperty('prefix'),
		"`CardGameExceptionSeverity.SPEED` object does not contain expected property `prefix`."
	);

	assert.strictEqual(
		CardGameExceptionSeverity.SPEED.prefix,
		'Speed: ',
		"`CardGameExceptionSeverity.SPEED` object property `prefix` does not match expected string value of 'Speed: '."
	);
});
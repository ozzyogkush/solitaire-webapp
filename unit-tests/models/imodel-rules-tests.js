// Unit tests for models/imodel-rules.js

QUnit.test( "property tests", function( assert ) {
	expect(5);

	// Property/attribute property tests

	assert.strictEqual(
		IModelRules._numDecksInGame,
		'number',
		'`IModelRules._numDecksInGame` must be a "number".'
	);

	assert.strictEqual(
		IModelRules._acesHigh,
		'boolean',
		'`IModelRules._acesHigh` must be a "boolean".'
	);

	assert.strictEqual(
		IModelRules._includeJokers,
		'boolean',
		'`IModelRules._includeJokers` must be a "boolean".'
	);

	assert.strictEqual(
		IModelRules._stackkModel,
		'array',
		'`IModelRules._stackkModel` must be an "array".'
	);

	assert.strictEqual(
		IModelRules._layout,
		'array',
		'`IModelRules._layout` must be an "array".'
	);

	// Function property tests
});
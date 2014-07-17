// Unit tests for models/imodel-rules.js

QUnit.test( "property tests", function( assert ) {
	expect(8);

	// Property/attribute property tests

	assert.strictEqual(
		IModelRules._variationName,
		'string',
		'`IModelRules._variationName` must be a "string".'
	);

	assert.strictEqual(
		IModelRules._cardNumAbleToMoveFromInPlayStack,
		'number',
		'`IModelRules._cardNumAbleToMoveFromInPlayStack` must be a "number".'
	);

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
		IModelRules._stacks,
		'array',
		'`IModelRules._stacks` must be an "array".'
	);

	assert.strictEqual(
		IModelRules._layout,
		'array',
		'`IModelRules._layout` must be an "array".'
	);

	// Function property tests

	assert.strictEqual(
		IModelRules.gameWon,
		'function',
		'`IModelRules.gameWon` must be a "function".'
	);
});
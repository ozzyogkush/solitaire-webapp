// Unit tests for models/imodel-rules.js

QUnit.test( "property tests", function( assert ) {
	expect(9);

	// Property/attribute property tests

	assert.strictEqual(
		IModelRules._cardNumAbleToMoveFromInPlayStack,
		'Integer',
		'`IModelRules._cardNumAbleToMoveFromInPlayStack` must be an "Integer".'
	);

	assert.strictEqual(
		IModelRules._numDecksInGame,
		'Integer',
		'`IModelRules._numDecksInGame` must be an "Integer".'
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

	assert.strictEqual(
		IModelRules._useTimer,
		'boolean',
		'`IModelRules._useTimer` must be an "boolean".'
	);

	assert.strictEqual(
		IModelRules.cardsCanDropIntoStack,
		'function',
		'`IModelRules.cardsCanDropIntoStack` must be a "function".'
	);

	assert.strictEqual(
		IModelRules.gameWon,
		'function',
		'`IModelRules.gameWon` must be a "function".'
	);

	// Function property tests
});
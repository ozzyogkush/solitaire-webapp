// Unit tests for models/imodel-rules.js

QUnit.test( "property tests", function( assert ) {
	expect(11);

	// Property/attribute property tests

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
		IModelRules._includeJokers,
		'boolean',
		'`IModelRules._includeJokers` must be a "boolean".'
	);

	assert.strictEqual(
		IModelRules._stacks,
		'object',
		'`IModelRules._stacks` must be an "object".'
	);

	assert.strictEqual(
		IModelRules._layout,
		'object',
		'`IModelRules._layout` must be an "object".'
	);

	// Function property tests

	assert.strictEqual(
		IModelRules.gameWon,
		'function',
		'`IModelRules.gameWon` must be a "function".'
	);

	assert.strictEqual(
		IModelRules.mouseOrTapDownCard,
		'function',
		'`IModelRules.mouseOrTapDownCard` must be a "function".'
	);

	assert.strictEqual(
		IModelRules.mouseOrTapUpCard,
		'function',
		'`IModelRules.mouseOrTapUpCard` must be a "function".'
	);

	assert.strictEqual(
		IModelRules.mouseOrTapDownStack,
		'function',
		'`IModelRules.mouseOrTapDownStack` must be a "function".'
	);

	assert.strictEqual(
		IModelRules.mouseOrTapUpStack,
		'function',
		'`IModelRules.mouseOrTapUpStack` must be a "function".'
	);

	assert.strictEqual(
		IModelRules.mouseMoveOrDrag,
		'function',
		'`IModelRules.mouseMoveOrDrag` must be a "function".'
	);
});
// Unit tests for models/imodel-rules.js

QUnit.test( "property tests", function( assert ) {
	expect(7);

	assert.strictEqual(
		IViewRules._variationName,
		'string',
		'`IViewRules._variationName` must be a "string".'
	);

	assert.strictEqual(
		IViewRules._cards,
		'array',
		'`IViewRules._cards` must be an "array".'
	);

	assert.strictEqual(
		IViewRules.mouseOrTapDownCard,
		'function',
		'`IViewRules.mouseOrTapDownCard` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseOrTapUpCard,
		'function',
		'`IViewRules.mouseOrTapUpCard` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseOrTapDownStack,
		'function',
		'`IViewRules.mouseOrTapDownStack` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseOrTapUpStack,
		'function',
		'`IViewRules.mouseOrTapUpStack` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseMoveOrDrag,
		'function',
		'`IViewRules.mouseMoveOrDrag` must be a "function".'
	);
});
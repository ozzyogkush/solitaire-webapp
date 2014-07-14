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
		IViewRules.mouseDownTouchStartCard,
		'function',
		'`IViewRules.mouseDownTouchStartCard` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseUpTouchEndCard,
		'function',
		'`IViewRules.mouseUpTouchEndCard` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseDownTouchStartStack,
		'function',
		'`IViewRules.mouseDownTouchStartStack` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseUpTouchEndStack,
		'function',
		'`IViewRules.mouseUpTouchEndStack` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseMoveTouchMove,
		'function',
		'`IViewRules.mouseMoveTouchMove` must be a "function".'
	);
});
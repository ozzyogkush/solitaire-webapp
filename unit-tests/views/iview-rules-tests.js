// Unit tests for models/imodel-rules.js

QUnit.test( "property tests", function( assert ) {
	expect(6);

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
		IViewRules.mouseDownTouchStartEventHandler,
		'function',
		'`IViewRules.mouseDownTouchStartEventHandler` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseUpTouchEndEventHandler,
		'function',
		'`IViewRules.mouseUpTouchEndEventHandler` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseClickEventHandler,
		'function',
		'`IViewRules.mouseClickEventHandler` must be a "function".'
	);

	assert.strictEqual(
		IViewRules.mouseMoveTouchMoveEventHandler,
		'function',
		'`IViewRules.mouseMoveTouchMoveEventHandler` must be a "function".'
	);
});
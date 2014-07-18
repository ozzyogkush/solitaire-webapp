// Unit tests for static/stack-types.js

var localSTS = [
    new StackType("dealer"),
    new StackType("draw"),
    new StackType("inPlay"),
    new StackType("foundation")
];

QUnit.test( "property tests", function( assert ) {
	expect(8);

	var sts = new StackTypes();
	for (var i = 0; i < localSTS.length; i++) {
		var nameToCheck = localSTS[i].getStackTypeName();
		assert.ok(
			sts[nameToCheck] !== undefined,
			"The `" + nameToCheck + "` StackType was not found in the StackTypes set!"
		);
		assert.propEqual(
			localSTS[i],
			sts[nameToCheck],
			'Expected a StackType object with `_stackTypeName` equal to ' + 
			nameToCheck + '`.'
		);
	}
});
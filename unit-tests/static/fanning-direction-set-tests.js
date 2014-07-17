// Unit tests for static/fanning-direction-set.js

var localFDS = [
    new FanningDirection("up"),
    new FanningDirection("down"),
    new FanningDirection("left"),
    new FanningDirection("right"),
    new FanningDirection("none")
];

QUnit.test( "property tests", function( assert ) {
	expect(10);

	var fds = new FanningDirectionSet();
	for (var i = 0; i < localFDS.length; i++) {
		var nameToCheck = localFDS[i].getFanningDirectionName();
		assert.ok(
			fds[nameToCheck] !== undefined,
			"The `" + nameToCheck + "` FanningDirection was not found in the FanningDirectionSet!"
		);
		assert.propEqual(
			localFDS[i],
			fds[nameToCheck],
			'Expected a FanningDirection object with `_fanningDirectionName` equal to ' + 
			nameToCheck + '`.'
		);
	}
});
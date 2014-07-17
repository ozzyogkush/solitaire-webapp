// Unit tests for static/fanning-direction-set.js

var localFDS = [
    new FanningDirection("up"),
    new FanningDirection("down"),
    new FanningDirection("left"),
    new FanningDirection("right"),
    new FanningDirection("none")
];

QUnit.test( "property tests", function( assert ) {
	expect(5);

	var fds = new FanningDirectionSet();
	var i = 0;
	for (var fanningDirection in fds) {
		assert.propEqual(
			localFDS[i],
			fds[fanningDirection],
			'Expected a FanningDirection object with `_fanningDirectionName` equal to ' + 
			localFDS[i].getFanningDirectionName() + '`.'
		);
		i++;
	}
});
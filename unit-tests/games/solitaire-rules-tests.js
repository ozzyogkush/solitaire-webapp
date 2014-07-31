// Unit tests for games/solitaire-rules.js

var goodNumDecksInGame = 1;
var goodIncludeJokers = false;
var goodAcesHigh = false;
var goodStackModel = [
	[
		new Stack(srAllSt.dealer, srAllFd.none, 52, 0),
		null,
		null,
		new Stack(srAllSt.foundation, srAllFd.none, 0, 13),
		new Stack(srAllSt.foundation, srAllFd.none, 0, 13),
		new Stack(srAllSt.foundation, srAllFd.none, 0, 13),
		new Stack(srAllSt.foundation, srAllFd.none, 0, 13),
	],
	[
		new Stack(srAllSt.inPlay, srAllFd.down, 0, 1),
		new Stack(srAllSt.inPlay, srAllFd.down, 1, 1),
		new Stack(srAllSt.inPlay, srAllFd.down, 2, 1),
		new Stack(srAllSt.inPlay, srAllFd.down, 3, 1),
		new Stack(srAllSt.inPlay, srAllFd.down, 4, 1),
		new Stack(srAllSt.inPlay, srAllFd.down, 5, 1),
		new Stack(srAllSt.inPlay, srAllFd.down, 6, 1)
	]
];
var goodTimer = true;

/** Constructor tests **/
QUnit.test( "constructor success tests", function( assert ) {
	expect(19);

	var good = new SolitaireRules();
	assert.ok(
		good.instanceOf(SolitaireRules) === true,
		"Expected that the instantiated object is a `SolitaireRules` class."
	);

	// _numDecksInGame
	assert.strictEqual(
		good._numDecksInGame,
		goodNumDecksInGame,
		'Expected the number of decks in Solitaire to be ' + goodNumDecksInGame + '.'
	);

	// _includeJokers
	assert.strictEqual(
		good._includeJokers,
		goodIncludeJokers,
		'Expected Solitaire to ' + (goodIncludeJokers ? 'not ' : '') + 'include jokers.'
	);

	// _acesHigh
	assert.strictEqual(
		good._acesHigh,
		goodAcesHigh,
		'Expected Aces to be ' + (goodAcesHigh ? 'high ' : 'low ') + ' in Solitaire.'
	);

	// Check for correct stackModel based on supplied Stack layout
	assert.propEqual(
		good.getStackModel()[0][0],
		goodStackModel[0][0],
		'Expected the stack to be at position [0][0] in the stackModel to be the dealer stack'
	);
	assert.propEqual(
		good.getStackModel()[0][1],
		goodStackModel[0][1],
		'Expected the stack in position [0][1] in the stackModel to be null'
	);
	assert.propEqual(
		good.getStackModel()[0][2],
		goodStackModel[0][2],
		'Expected the stack in position [0][2] in the stackModel to be null'
	);
	assert.propEqual(
		good.getStackModel()[0][3],
		goodStackModel[0][3],
		'Expected the stack to be at position [0][3] in the stackModel to be the first foundation stack'
	);
	assert.propEqual(
		good.getStackModel()[0][4],
		goodStackModel[0][4],
		'Expected the stack to be at position [0][4] in the stackModel to be the 2ns foundation stack'
	);
	assert.propEqual(
		good.getStackModel()[0][5],
		goodStackModel[0][5],
		'Expected the stack to be at position [0][5] in the stackModel to be the 3rd foundation stack'
	);
	assert.propEqual(
		good.getStackModel()[0][6],
		goodStackModel[0][6],
		'Expected the stack to be at position [0][6] in the stackModel to be the 4th foundation stack'
	);

	// row 2
	assert.propEqual(
		good.getStackModel()[1][0],
		goodStackModel[1][0],
		'Expected the stack to be at position [1][0] in the stackModel to be the first inPlay stack'
	);
	assert.propEqual(
		good.getStackModel()[1][1],
		goodStackModel[1][1],
		'Expected the stack to be at position [1][1] in the stackModel to be the 2nd inPlay stack'
	);
	assert.propEqual(
		good.getStackModel()[1][2],
		goodStackModel[1][2],
		'Expected the stack to be at position [1][2] in the stackModel to be the 3rd inPlay stack'
	);
	assert.propEqual(
		good.getStackModel()[1][3],
		goodStackModel[1][3],
		'Expected the stack to be at position [1][3] in the stackModel to be the 4th inPlay stack'
	);
	assert.propEqual(
		good.getStackModel()[1][4],
		goodStackModel[1][4],
		'Expected the stack to be at position [1][4] in the stackModel to be the 5th inPlay stack'
	);
	assert.propEqual(
		good.getStackModel()[1][5],
		goodStackModel[1][5],
		'Expected the stack to be at position [1][5] in the stackModel to be the 6th inPlay stack'
	);
	assert.propEqual(
		good.getStackModel()[1][6],
		goodStackModel[1][6],
		'Expected the stack to be at position [1][6] in the stackModel to be the 7th inPlay stack'
	);

	// _useTimer
	assert.strictEqual(
		good._useTimer,
		goodTimer,
		'Expected Solitaire to ' + (goodTimer ? '' : 'not ') + 'use a timer.'
	);
});
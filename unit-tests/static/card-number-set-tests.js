// Unit tests for static/card-number-set.js

var localCNS = [
    new CardNumber(1, 'ace'),
    new CardNumber(2, 'two'),
    new CardNumber(3, 'three'),
    new CardNumber(4, 'four'),
    new CardNumber(5, 'five'),
    new CardNumber(6, 'six'),
    new CardNumber(7, 'seven'),
    new CardNumber(8, 'eight'),
    new CardNumber(9, 'nine'),
    new CardNumber(10, 'ten'),
    new CardNumber(11, 'jack'),
    new CardNumber(12, 'queen'),
    new CardNumber(13, 'king')
];

QUnit.test( "property tests", function( assert ) {
	expect(13);

	var cns = new CardNumberSet();
	var i = 0;
	for (var cardname in cns) {
		assert.propEqual(
			localCNS[i],
			cns[cardname],
			'Expected a CardNumber object with `cardValue` equal to `' + 
			localCNS[i].getCardValue() + 
			'` and `cardNumberName` equal to `' + 
			localCNS[i].getCardNumberName() + '`.'
		);
		i++;
	}
});
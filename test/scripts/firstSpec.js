describe('Adder module', function() {
    // imports the adder module
    var adder = require('../../src/scripts/adder.js');

    it('adds two integers', function() {
        var sum = adder(2, 2);
        expect(sum).equals(4);
    });
});

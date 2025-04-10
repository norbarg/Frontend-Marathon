const expect = chai.expect;

describe('checkBrackets', function () {
    it('should return the correct number of missing brackets', function () {
        expect(checkBrackets('(()')).to.equal(1);
        expect(checkBrackets(')(')).to.equal(2);
        expect(checkBrackets('(())')).to.equal(0);
        expect(checkBrackets('()()')).to.equal(0);
        expect(checkBrackets('(())())')).to.equal(1);
        expect(checkBrackets('(()))(()')).to.equal(2);
        expect(checkBrackets('((()))')).to.equal(0);
        expect(checkBrackets('(((())))')).to.equal(0);
        expect(checkBrackets('(((((())))))')).to.equal(0);
        expect(checkBrackets('(()()(()))')).to.equal(0);
        expect(checkBrackets('((())(()))')).to.equal(0);
        expect(checkBrackets('()((()))()(')).to.equal(1);
    });

    it('should return -1 for invalid inputs', function () {
        expect(checkBrackets(null)).to.equal(-1);
        expect(checkBrackets(undefined)).to.equal(-1);
        expect(checkBrackets(123)).to.equal(-1);
        expect(checkBrackets([])).to.equal(-1);
        expect(checkBrackets({})).to.equal(-1);
    });
});

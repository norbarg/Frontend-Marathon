class StrFrequency {
    constructor(str) {
        this.str = str;
    }

    letterFrequencies() {
        const frequencies = {};
        const lettersOnly = this.str.toUpperCase().replace(/[^A-Z]/g, '');

        for (const char of lettersOnly) {
            frequencies[char] = (frequencies[char] || 0) + 1;
        }

        return frequencies;
    }

    wordFrequencies() {
        const frequencies = {};
        const words = this.str
            .toUpperCase()
            .replace(/[^A-Z0-9'\s]/gi, '')
            .match(/\b[A-Z']+\b/g);

        if (!words) return {};

        for (const word of words) {
            frequencies[word] = (frequencies[word] || 0) + 1;
        }

        return frequencies;
    }

    reverseString() {
        return this.str.split('').reverse().join('');
    }
}

module.exports = StrFrequency;

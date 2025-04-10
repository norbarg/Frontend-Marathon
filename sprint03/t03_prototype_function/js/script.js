String.prototype.removeDuplicates = function () {
    return this.split(/\s+/)
        .filter(
            (word, index, arr) => word !== '' && arr.indexOf(word) === index
        )
        .join(' ')
        .trim();
};

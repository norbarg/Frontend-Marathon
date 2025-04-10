function total(addCount, addPrice, currentTotal) {
    if (Number.isNaN(currentTotal) || currentTotal === undefined) {
        currentTotal = 0;
    }
    return currentTotal + addCount * addPrice;
}

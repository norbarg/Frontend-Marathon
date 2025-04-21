exports.firstUpper = (str) => {
    if (typeof str !== 'string') return '';
    str = str.trim();

    if (str === '') return '';

    return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

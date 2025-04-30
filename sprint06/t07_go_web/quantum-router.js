const calculateNormalTime = require('./normal-router');

module.exports = function calculateQuantumTime() {
    const normal = calculateNormalTime();
    const totalNormalMonths = normal.years * 12 + normal.months;
    const totalQuantumMonths = Math.floor(totalNormalMonths / 7);
    const quantumYears = Math.floor(totalQuantumMonths / 12);
    const quantumMonths = totalQuantumMonths % 12;

    return { years: quantumYears, months: quantumMonths, days: normal.days };
};

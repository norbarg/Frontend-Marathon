const normal = require('./normal');

function calculateTime() {
    const time = normal.calculateTime();

    const totalNormalMonths = time.years() * 12 + time.months();
    const totalQuantumMonths = Math.floor(totalNormalMonths / 7);
    const quantumDays = time.days();

    const quantumYears = Math.floor(totalQuantumMonths / 12);
    const quantumMonths = totalQuantumMonths % 12;

    return [quantumYears, quantumMonths, quantumDays];
}

module.exports = { calculateTime };

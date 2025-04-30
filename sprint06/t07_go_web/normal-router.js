module.exports = function calculateNormalTime() {
    const start = new Date('1939-01-01');
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (days < 0) {
        months--;
        const prevMonthDays = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
        ).getDate();
        days += prevMonthDays;
    }

    return { years, months, days };
};

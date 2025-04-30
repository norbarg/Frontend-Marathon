function calculateTime() {
    const start = new Date('1939-01-01');
    const now = new Date();

    const diff = now - start;
    const diffDate = new Date(diff);

    const years = now.getUTCFullYear() - start.getUTCFullYear();
    const months = now.getUTCMonth() - start.getUTCMonth();
    const days = now.getUTCDate() - start.getUTCDate();

    const adjustedMonths = months < 0 ? months + 12 : months;
    const adjustedYears = months < 0 ? years - 1 : years;

    const adjustedDays =
        days < 0
            ? new Date(now.getFullYear(), now.getMonth(), 0).getDate() + days
            : days;

    return {
        years: () => adjustedYears,
        months: () => adjustedMonths,
        days: () => adjustedDays,
    };
}

module.exports = { calculateTime };

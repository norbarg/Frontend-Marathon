function getFormattedDate(dateObject) {
    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    let days = dateObject.getDate();
    let months = dateObject.getMonth();
    let years = dateObject.getFullYear();
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();

    days = days < 10 ? '0' + days : days;
    months = months < 9 ? '0' + (months + 1) : months + 1;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const formattedDate = `${days}.${months}.${years} ${hours}:${minutes} ${
        weekdays[dateObject.getDay()]
    }`;
    return formattedDate;
}

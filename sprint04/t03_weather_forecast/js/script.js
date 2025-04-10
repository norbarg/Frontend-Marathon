const API_KEY = 'de21bb98bd2c400e96c162455252803';
const CITY = 'dombas-1762925';
const DAYS = 6;

// Function to fetch weather forecast data
async function fetchWeatherForecast() {
    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=${DAYS}&aqi=no&alerts=no`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('forecast-container').innerHTML =
            '<p>Unable to load weather data. Please try again later.</p>';
    }
}

function getWeatherImage(conditionText) {
    const condition = conditionText.toLowerCase();

    if (
        condition.includes('rain') ||
        condition.includes('shower') ||
        condition.includes('drizzle')
    ) {
        return 'assets/images/rain.jpg';
    } else if (
        condition.includes('sun') ||
        condition.includes('clear') ||
        condition.includes('sunny')
    ) {
        return 'assets/images/sun.jpg';
    } else if (condition.includes('snow') || condition.includes('sleet')) {
        return 'assets/images/snow.jpg';
    } else if (condition.includes('blizzard')) {
        return 'assets/images/blizzard.jpg';
    } else {
        return 'assets/images/sun.jpg';
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    const forecastDays = data.forecast.forecastday;

    forecastDays.forEach((day) => {
        const date = new Date(day.date);
        const dateString = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
        });
        const temp = Math.round(day.day.maxtemp_c);
        const weatherImage = getWeatherImage(day.day.condition.text);

        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';
        dayElement.innerHTML = `
            <p>${dateString}</p>
            <img src="${weatherImage}" alt="${day.day.condition.text}">
            <p class="temperature">+${temp}°</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

fetchWeatherForecast();

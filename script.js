const form = document.querySelector('form');
const submitBtn = document.querySelector('input[type="submit"]');
form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);
const error = document.querySelector('#error');

function handleSubmit(e) {
    e.preventDefault();
    fetchWeather();
};

// display Seattle's weather on page load
window.addEventListener("load", initialFetch);

async function initialFetch() {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Seattle?key=G37E26BFPYT9Z9EBFA7DD2QU9`,
            {
                mode: 'cors',
            }
        );
        error.style.display = 'none';
        const weatherData = await response.json();
        const newData = processData(weatherData);
        displayData(newData);
};

// get location from user:
function fetchWeather() {
    const input = document.querySelector('input[type="text"]');
    const userLocation = input.value;
    getWeatherData(userLocation);
};

// fetch weather data:
async function getWeatherData(location) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=G37E26BFPYT9Z9EBFA7DD2QU9`,
            {
                mode: 'cors',
            }
        );
        error.style.display = 'none';
        const weatherData = await response.json();
        const newData = processData(weatherData);
        displayData(newData);
        form.reset();
    } catch (error) {
        throwErrorMsg();
    }
};

// display error message:
function throwErrorMsg() {
    error.style.display = 'block';
    error.textContent = 'Location not found...';
    error.style.color = 'red';
};

// process weather data:
function processData(weatherData) {
    const data = {
        condition: weatherData.currentConditions.conditions,
        feelsLike: weatherData.currentConditions.feelslike,
        currentTemp: weatherData.currentConditions.temp,
        wind: Math.round(weatherData.currentConditions.windspeed),
        humidity: weatherData.currentConditions.humidity,
        location: weatherData.resolvedAddress.toUpperCase(),
    };

    return data;
};

// display weather data in DOM
function displayData(newData) {
    document.querySelector('.condition').textContent = newData.condition;
    document.querySelector('.location').textContent = `${newData.location}`;
    document.querySelector('.current-temp').textContent = `${newData.currentTemp}°`;
    document.querySelector('.feels-like').textContent = `FEELS LIKE: ${newData.feelsLike}°`;
    document.querySelector('.wind').textContent = `WIND: ${newData.wind}`;
    document.querySelector('.humidity').textContent = `HUMIDITY: ${newData.humidity}`;
};
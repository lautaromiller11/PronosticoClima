const apiKey = "e7df2218e706408659b06fc7fecd81b9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".buscar input");
const searchBtn = document.querySelector(".buscar button");
const weatherIcon = document.querySelector(".icono-clima");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);

    if (data.cod === 200) {
        document.querySelector(".ciudad").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humedad").innerHTML = data.main.humidity + "%";
        document.querySelector(".viento").innerHTML = data.wind.speed + "km/h";

        const weatherCode = data.weather[0].icon;
        const weatherImage = getWeatherImage(weatherCode);
        weatherIcon.src = `img/icons/${weatherImage}.png`;
    } else {
        console.log(data.message);
    }
}

function getWeatherImage(weatherCode) {
    let weatherImage = "";

    switch (weatherCode) {
        case "01d":
        case "01n":
            weatherImage = "despejadoicon";
            break;
        case "02d":
        case "02n":
            weatherImage = "nubladoicon";
            break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
            weatherImage = "nubladoicon";
            break;
        case "09d":
        case "09n":
            weatherImage = "lluviaicon";
            break;
        case "10d":
        case "10n":
            weatherImage = "lloviznaicon";
            break;
        case "11d":
        case "11n":
            weatherImage = "lluviaicon";
            break;
        case "13d":
        case "13n":
            weatherImage = "nieveicon";
            break;
        case "50d":
        case "50n":
            weatherImage = "nieblaicon";
            break;
        default:
            weatherImage = "despejadoicon";
            break;
    }

    return weatherImage;
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
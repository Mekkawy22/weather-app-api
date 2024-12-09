// api connect
async function fetchWeather(city) {
    var apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=14b144d729064cef93c135137240812&q=${city}&days=3&aqi=no&alerts=no`;

    try {
        var response = await fetch(apiUrl);
        var data = await response.json();
        displayWeather(data);
        console.log(data);
    } catch (error) {
        alert(`Error fetching weather data: ${error.message}`);
    }
}

// display cards
function displayWeather(data) {
    var cartona = '';

    for (var i = 0; i < data.forecast.forecastday.length; i++) {
        var day = data.forecast.forecastday[i];
        cartona += `
            <div class="col-12 col-md-4">
                <div class="weather-card m-2 text-center bg-dark text-light p-3 shadow-lg">
                    <h2>${data.location.name}</h2>
                    <h4>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</h4>
                    <p>${formatDate(day.date)}</p>
                    <h3>${day.day.avgtemp_c}°C</h3>
                    <p>${day.day.condition.text}</p>
                    <i class="fas ${getIconClass(day.day.condition.text)} fa-3x"></i>
                    <p>Wind: ${day.day.maxwind_kph} km/h <i class="fas fa-wind fa-2x"></i></p>
                    p>Humidity: ${day.day.avghumidity}% <i class="fas fa-tint fa-2x"></i></p>
                </div>
            </div>
        `;
    }

    document.getElementById("weatherCards").innerHTML = cartona;
}

// date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
}

// icon
function getIconClass(conditionText) {
    conditionText = conditionText.toLowerCase().trim();
    if (conditionText.includes("sunny")) return "fa-sun text-warning";
    if (conditionText.includes("cloud")) return "fa-cloud text-light";
    if (conditionText.includes("rain")) return "fa-cloud-rain text-primary";
    if (conditionText.includes("thunder")) return "fa-bolt text-danger";
    return "fa-cloud-sun text-info";
}

// click event
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    var city = document.getElementById("search").value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city.");
    }
});

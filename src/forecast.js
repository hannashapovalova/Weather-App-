// Current Dates, Hours, Minutes, Day, Months

let now = new Date ();
let date = document.querySelector("#date");
let currentDate = now.getDate();
date.innerHTML = `${currentDate}`;

let housrs = document.querySelector("#hours");
let currentHours = now.getHours();
if (currentHours < 10) {
    currentHours = `0${currentHours}`;
} 
housrs.innerHTML = `${currentHours}`;

let minutes = document.querySelector("#minutes");
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
}
minutes.innerHTML = `${currentMinutes}`;

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
let currentMonth = months[now.getMonth()];
let month = document.querySelector("#month");
  month.innerHTML = `${currentMonth}`;

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let currentDayOfWeeek = days[now.getDay()];
let dayOfWeek = document.querySelector("#day");
dayOfWeek.innerHTML = `${currentDayOfWeeek}`;




// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat"
];
  return days[day];

}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  
  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML + `<div class="col forecast-block">
              <h4 class="forecast-day">
                ${formatDay(forecastDay.dt)}
              </h4>
              <img 
               src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
               alt="Weather icon"
               class="forecast-icon">
              <p class="forecast-temperature">
                ${Math.round(forecastDay.temp.max)}&deg; | ${Math.round(forecastDay.temp.min)}&deg;
              </p>
            </div>`;
    }
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


// API

function getApiWeather(city) {
    let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

// Search Form

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    getApiWeather(searchInput.value);
    let currentCity = document.querySelector("#city");
    if (searchInput.value) {
    currentCity.innerHTML = `${searchInput.value}`;
    } 
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function getForecast(coordinates) {
  let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);

}

function showTemperature(response) {
    temp = Math.round(response.data.main.temp);
    let showTemp = document.querySelector("#temperature");
    showTemp.innerHTML = `${temp}&deg;`;

    let wind = Math.round(response.data.wind.speed);
    let showWind = document.querySelector("#wind-speed");
    showWind.innerHTML = `${wind}`;
    
    let humidity = Math.round(response.data.main.humidity);
    let showHumidity = document.querySelector("#humidity");
    showHumidity.innerHTML = `${humidity}`;

    let descriction = response.data.weather[0].description;
    let showDescription = document.querySelector(".description");
    showDescription.innerHTML = `${descriction}`;

    let sunset = response.data.sys.sunset;
    let sunsetHours = new Date(sunset * 1000).getHours();
    if (sunsetHours < 10) {
      sunsetHours = `0${sunsetHours}`;
    }
    let sunsetMinutes = new Date(sunset * 1000).getMinutes();
    if (sunsetMinutes <10) {
      sunsetMinutes = `0${sunsetMinutes}`;
    }
    let showSunset = document.querySelector(".sunset-value");
    showSunset.innerHTML = `${sunsetHours}:${sunsetMinutes}`;

    let sunrise = response.data.sys.sunrise;
    let sunriseHours = new Date(sunrise * 1000).getHours()
    if (sunriseHours < 10) {
      sunriseHours = `0${sunriseHours}`;
    }
    let sunrisenMinutes = new Date(sunrise * 1000).getMinutes();
    if (sunrisenMinutes  < 10) {
      sunrisenMinutes  = `0${sunrisenMinutes}`;
    }
    let showSunrise = document.querySelector(".sunrise-value");
    showSunrise.innerHTML = `${sunriseHours}:${sunrisenMinutes}`;

    let iconElement = document.querySelector(".main-icon");
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

//Change temperature Celsius/Farenhait

function tempFarenhait(event) {
    event.preventDefault();
    let farenhaitTemperatureElement = document.querySelector("#temperature");
    let farenhaitTemperature = (temp * 9) / 5 + 32;
    farenhaitTemperatureElement.innerHTML = `${Math.round(farenhaitTemperature)}&deg;`;
}

function tempCelsius(event) {
    event.preventDefault();
    let celsiusTemperatureElement = document.querySelector("#temperature");
    celsiusTemperatureElement.innerHTML = `${temp}&deg;`
}


let temp = null;
let cutTemp = null;

let showTempF = document.querySelector("#farenheit");
showTempF.addEventListener("click", tempFarenhait);

let showTempC = document.querySelector("#celsius");
showTempC.addEventListener("click", tempCelsius);

// Get current city and temp by Geolocation

//function getPosition(position) {
  //let latitude = position.coords.latitude;
 // let longitude = position.coords.longitude;
  //let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
  //let units = "metric";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  //axios.get(apiUrl).then(showCurrentData);
//}

//function showCurrentData(response) {
  //let city = response.data.name;
  //getApiWeather(city);
  //let currentCity = document.querySelector("#city");
  //currentCity.innerHTML = `${city}`;
//}

//function findMeButton() {
  //navigator.geolocation.getCurrentPosition(getPosition);
//}

//let button = document.querySelector(".find-me-button");
//button.addEventListener("click", findMeButton);


getApiWeather("Kyiv");
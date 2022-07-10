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
  console.log(coordinates);
  let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);

}

function showTemperature(response) {
    temp = Math.round(response.data.main.temp);
    let showTemp = document.querySelector("#temperature");
    showTemp.innerHTML = `${temp}&deg; 
      <span>
        <sup class="unit">
          <a href="#" id="celsius" class="celsius-unit">
            C
          </a>
        </sup>
        <sup class="separator">
          |
        </sup>
        <sup class="unit">
          <a href="#" id="farenheit" class="farenheit-unit">F
          </a>
        </sup>
      </span>`;

    let wind = Math.round(response.data.wind.speed);
    let showWind = document.querySelector("#wind-speed");
    showWind.innerHTML = `${wind}`;
    
    let humidity = Math.round(response.data.main.humidity);
    let showHumidity = document.querySelector("#humidity");
    showHumidity.innerHTML = `${humidity}`;

    getForecast(response.data.coord);
}

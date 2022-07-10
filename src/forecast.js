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
// update h2 to be the current day and time
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = days[currentDate.getDay()];
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let today = document.querySelector("#today");
today.innerHTML = `${date} ${hours}:${minutes}`;

// show temperature and description of the city that has been searched
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let descriptionElement = document.querySelector("#description");

// show forecast for upcoming days
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index !== 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="row weekday">
        <div class="col-4"><p>${formatDay(forecastDay.dt)}</p></div>
        <div class="col-4">
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width="60px">
        </div>
        <div class="col-2"><p class="degrees">${Math.round(
          forecastDay.temp.max
        )}º</p></div>
        <div class="col-2 min-temp"><p class="degrees">${Math.round(
          forecastDay.temp.min
        )}º</p></div>
      </div>
  `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

// add api for real time date for the forecast
function getForecast(coordinates) {
  let apiKey = "7458bcff34170905446c53d8d18fc507";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celciusTemperature = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML =
    Math.round(celciusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let windSpeed = document.querySelector("#speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}

function searchInput(city) {
  let apiKey = "7458bcff34170905446c53d8d18fc507";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchInput(city);
}

searchInput("Toronto");

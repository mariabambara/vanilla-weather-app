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

// update h1 to be the city searched
let searchCity = document.querySelector("#search-city");
let heading = document.querySelector("h1");

searchCity.addEventListener("click", showCity);
function showCity() {
  heading.innerHTML = document.querySelector("#search-input").value;
}

// select unit as celcius or farenheit
let celciusLink = document.querySelector("#celcius-link");
let farenheitLink = document.querySelector("#farenheit-link");
let degrees = document.querySelector("#today-temp");

celciusLink.addEventListener("click", celcius);
function celcius(event) {
  degrees.innerHTML = "21ºC";
}

farenheitLink.addEventListener("click", farenheit);
function farenheit(event) {
  degrees.innerHTML = "69.8ºF";
}

// show temperature and description of the city that has been searched
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let descriptionElement = document.querySelector("#description");

function displayTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

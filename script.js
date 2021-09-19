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

// show temperature and description of the city that has been searched
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let descriptionElement = document.querySelector("#description");

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

// select unit as celcius or farenheit
let celciusTemperature = null;
let degrees = document.querySelector("#today-temp");

function farenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  degrees.innerHTML = Math.round(farenheitTemperature);
}

function celcius(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  degrees.innerHTML = Math.round(celciusTemperature);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", farenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", celcius);

searchInput("Toronto");

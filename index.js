function theTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${date.getHours()}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${date.getMinutes()}`;
  }
  let time = `${hours}:${minutes}`;
  let dayTime = document.querySelector("#day-time");
  return (dayTime.innerHTML = `${day} ${time}`);
}
theTime(new Date());

function weather(event) {
  event.preventDefault();
  let apiKey = "b19f4df02ac912fe1dad7424873d1b77";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDetails);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(cityCoords);
}
function cityCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b19f4df02ac912fe1dad7424873d1b77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDetails);
}
function onLoading(city) {
  let apiKey = "b19f4df02ac912fe1dad7424873d1b77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDetails);
}

function weatherDetails(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  celsiusTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = celsiusTemp;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let speed = document.querySelector("#speed");
  speed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let visibiity = document.querySelector("#visibiity");
  visibility.innerHTML = Math.round(response.data.visibility / 1000);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let weatherEmoji = document.querySelector("#weather-emoji");
  weatherEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherEmoji.setAttribute(
    "alt",
    `${response.data.weather[0].description} icon`
  );

  let daysApiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let daysApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${daysApiKey}&units=metric`;
  axios.get(daysApiUrl).then(showDaysForecast);
}
function showDaysForecast(response) {
  console.log(response.data.daily);
}

function fahrenheitTemperature(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
  celsius.classList.remove("colorChange");
  fahrenheit.classList.add("colorChange");
}

function celsiusTemperature(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  celsius.classList.add("colorChange");
  fahrenheit.classList.remove("colorChange");
}

let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusTemperature);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", weather);

let otherDays = document.querySelector("#days");
let forecast = "";
forecast = `<div id="days" class="row days">`;

let days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
days.forEach(function (day) {
  otherDays =
    forecast +
    `<div class="col-2">
      ${day}
      <div class="row">
        <div class="col-12 thurs">⛅</div>
        <div class="col-12">27℃</div>
        <div class="col">23℃</div>
      </div>
    </div>`;
});
otherDays.innerHTML = `otherDays + </div>`;

onLoading("Accra");
let day = new Date(Date.now());
console.log(day.getDay());

function weather() {
  let apiKey = "b19f4df02ac912fe1dad7424873d1b77";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDetails);
}

function weatherDetails(response) {
  console.log(response);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  let currentTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = currentTemp;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let speed = document.querySelector("#speed");
  speed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let visibiity = document.querySelector("#visibiity");
  visibility.innerHTML = Math.round(response.data.visibility / 1000);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", weather);

function onLoading(city) {
  let apiKey = "b19f4df02ac912fe1dad7424873d1b77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDetails);
}
onLoading("Accra");

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

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

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

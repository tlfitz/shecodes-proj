//SheCodes Plus - Final Project

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
    "December",
  ];

  let day = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  let currentDate = date.getDate();

  return `Today is ${day}, ${currentMonth} ${currentDate}, ${currentYear}  ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayCurrentForecast(response) {
  let currentForecast = response.data.daily;
  console.log(response);
  let currentForecastElement = document.querySelector("#currentForecast");

  let currentForecastHTML = `<div class="col">`;
  currentForecast.forEach(function (currentForecastDay, index) {
    if (index < 1) {
      currentForecastHTML =
        currentForecastHTML +
        `
      <div class="col-2">
      <div class="weather-forecast-description">${
        currentForecastDay.weather[0].description
      }</div>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-morn"> ${Math.round(
            currentForecastDay.temp.morn
          )}° </span>
          <span class="weather-forecast-temperature-eve"> ${Math.round(
            currentForecastDay.temp.eve
          )}° </span>
                    <span class="weather-forecast-temperature-night"> ${Math.round(
                      currentForecastDay.temp.night
                    )}° </span>
        </div>
      </div>
  `;
    }
  });

  currentForecastHTML = currentForecastHTML + `</div>`;
  currentForecastElement.innerHTML = currentForecastHTML;
}

function getCurrentForecast(coordinates) {
  let apiKey = "036cc1327e05f36a1530a226e833e5d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <div class="weather-forecast-description">${
          forecastDay.weather[0].description
        }</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="64"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "036cc1327e05f36a1530a226e833e5d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = ((fahrenheiTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function search(city) {
  let apiKey = "036cc1327e05f36a1530a226e833e5d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Los Angeles");

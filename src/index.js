//import "./styles.css";
let currTime = new Date();
let date = currTime.getDate();
let hour = currTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currTime.getMinutes();
if (hour < 10) {
  hour = `0${minutes}`;
}
let year = currTime.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currTime.getDay()];
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
let month = months[currTime.getMonth()];
let section = document.querySelector("#dateTime");
section.innerHTML = `<strong>${day}, ${month} ${date}, ${year} ${hour}:${minutes}</strong>`;
let apiKey = "35f7b0f4e5add0cd14dd97e4dcd53254";

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let div = document.querySelector("h2");

  let city = searchInput.value;
  if (searchInput.value) {
    div.innerHTML = `<strong>${searchInput.value}</strong>`;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

    function showTemperature(response) {
      let temperature = Math.round(response.data.main.temp);
      let feelsLike = Math.round(response.data.main.feels_like);
      let humidity = response.data.main.humidity;
      let h2 = document.querySelector("#temperature");
      h2.innerHTML = `${temperature}º C`;
      let h4 = document.querySelector("#temperature-description");
      h4.innerHTML = `Feels like: ${feelsLike}º C  -  Humidity: ${humidity}`;
    }

    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  } else {
    function showTemperature(response) {
      let temperature = Math.round(response.data.main.temp);
      let feelsLike = Math.round(response.data.main.feels_like);
      let humidity = response.data.main.humidity;
      let name = response.data.name;
      searchInput.innerHTML = "Request a City";
      let h2 = document.querySelector("#city");
      h2.innerHTML = `<strong>${name}</strong>`;
      let h3 = document.querySelector("#temperature");
      h3.innerHTML = `${temperature}º C`;
      let h4 = document.querySelector("#temperature-description");
      h4.innerHTML = `Feels like: ${feelsLike}º C  -  Humidity: ${humidity}`;
    }
    function retrievePosition(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

      axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
    }
    function getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(retrievePosition);
    }

    let button = document.querySelector("#current-location");
    button.addEventListener("click", getCurrentPosition);
  }
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let name = response.data.name;
  let h2 = document.querySelector("#city");
  h2.innerHTML = `<strong>${name}</strong>`;
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}º C`;
  let h4 = document.querySelector("#temperature-description");
  h4.innerHTML = `Feels like: ${feelsLike}º C  -  Humidity: ${humidity}`;
}
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

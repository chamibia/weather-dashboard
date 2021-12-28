// openWeather API  to get weather information
var APIKey = "479d025d088cdba7d7a53e604efa0c02";

//Global variables
var searchCity = document.querySelector("#search-bar");
var searchBtn = document.querySelector("#search-button");
var searchHistory = document.querySelector("#search-history");

//eventListener for search Button
searchBtn.addEventListener("click", getCity);

function getCity(event) {
  event.preventDefault();
  var currentCity = searchCity.value;
  getCurrentWeather(currentCity);
  saveToStorage(currentCity);
}

//Function for store search history of user

function saveToStorage(city) {
  var storage = JSON.parse(localStorage.getItem("weatherHistory"));
  if (storage === null) {
    storage = [];
  }
  storage.push(city);
  localStorage.setItem("weatherHistory", JSON.stringify(storage));
  getCurrentHistory();
}

function getCurrentHistory() {
  var currentStorage = JSON.parse(localStorage.getItem("weatherHistory"));
  if (currentStorage === null) {
    searchHistory.textContent = "Add current History";
  } else {
    searchHistory.textContent = "";
    for (var i = 0; i < currentStorage.length; i++) {
      var historyBtn = document.createElement("button");
      historyBtn.setAttribute("id", currentStorage[i]);
      historyBtn.textContent = currentStorage[i];
      searchHistory.append(historyBtn);
      $(historyBtn).addClass("button-history");

      //add eventLister for the history button
      historyBtn.addEventListener("click", function (event) {
        getCurrentWeather(event.target.id);
      });
    }
  }
}

//calling the function for the search history
getCurrentHistory();

//fetch the API from the weather site
function getCurrentWeather(cityName) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      APIKey +
      "&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //variables to define longitude and latitude

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      fiveDayForecast(lat, lon);

      console.log("current", data);

      document.querySelector("#city-name").textContent = data.name;
      document.querySelector("#temp").textContent =
        "Temp:" + data.main.temp + "°C";
      document.querySelector("#humidity").textContent =
        "Humidity:" + data.main.humidity;
      document.querySelector("#wind").textContent =
        "Wind Speed:" + data.wind.speed + "MPH";
    });
}

//five day forecast function

function fiveDayForecast(lat, lon) {
  //fetch the API for daily weather using lat and lon
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      APIKey +
      "&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("5 day", data);

      document.querySelector("#uv").textContent = "UV:" + data.current.uvi;
      $("#uv").addClass("uvIndex");
      var uviIndex = document.querySelector("uvIndex");

      //create for loop to show weather for 5 days
      document.querySelector(".five-days-forecast").textContent = "";
      for (var i = 0; i < 5; i++) {
        //create card to show weather through script.js and append all to div

        var card = document.createElement("div");
        card.setAttribute("class", "card-body col-lg-2");
        document.querySelector(".five-days-forecast").append(card);

        var date = document.createElement("h3");
        date.textContent = moment()
          .add(i + 1, "days")
          .format("MM Do YY");
        card.prepend(date);

        var fiveDayForecast = document.createElement("p");
        fiveDayForecast.textContent = "Temp:" + data.daily[i].temp.day;
        card.append(fiveDayForecast);

        var iconImage = document.createElement("img");
        var icon = data.daily[i].weather[0].icon;
        iconImage.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        );
        card.append(iconImage);
        card.append(iconImage);

        var windFiveDay = document.createElement("p");
        windFiveDay.textContent = "Wind:" + data.daily[i].wind_speed + "MPH";
        card.append(windFiveDay);

        var humidityFiveDay = document.createElement("p");
        humidityFiveDay.textContent =
          "Humidity:" + data.daily[i].humidity + "%";
        card.append(humidityFiveDay);
      }
    });
}

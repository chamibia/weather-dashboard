function loadWeather () {
    var cityEl =  document.getElementById("city-input"); 
    var searchCity = document.getElementById("search-btn"); 
    var clearSearch = document.getElementById("clear-btn");
    var nameEl = document.getElementById("city-name"); 
    var picEl = document.getElementById("current-pic"); 
    var tempEl = document.getElementById("temperature"); 
    var humidityEl = document.getElementById("humidity");
    var windEl = document.getElementById("wind");
    var UVEl = document.getElementById("UV-Index"); 
    var historyEl = document.getElementById("history");
    var fiveDayEl = document.getElementById("fiveday-chart"); 
    var weathertodayEl = document.getElementById("weather-today"); 
    var searchHistory = JSON.parse(localStorage.getItem ("search")) || [];

// // openWeather API 
var APIKey = "13ea394a45987d6b455b7b721f41dce7";

function openWeather(cityName) {
    //get request from open weather api 
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName  + "&appid=" + APIKey;
axios.get(queryURL)
.then(function(response) {

        weathertodayEl.classList.remove("d-none"); 
    
    //parse response to display current weather 
    var todaysDate = new Date(response.data.dt * 1000); 
    var day = todaysDate.getDate();
    var month = todaysDate.getMonth() + 1; 
    var year = todaysDate.getFullYear();
    nameEl.innerHTML = response.data.name + "(" + month + day + year + ")";
    var weatherImage = response.data.weather[0].icon;  
    picEl.setAttribute("src", 'http://openweathermap.org/img/wn/' + weatherImage + "@2x.png");
    picEl.setAttribute("alt", response.data.weather[0].description);
    humidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%"; 
    tempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + "&#176F"; 
    windEl.innerHTML = "Wind: " + response.data.wind.speed + "MPH"; 

    //UV Index 
    var lat = response.data.coord.lat; 
    var lon = response.data.coord.lon; 
    var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
    axios.get(UVQueryURL)
    .then(function (response) {
        var UVI = document.createElement("span"); 

        // green for good, ok for yell, red for bad 
        if(response.data[0].value < 4){
            UVI.setAttribute("class", "badge badge-success"); 
        }
        else if(response.data[0].value < 8) {
            UVI.setAttribute("class", "badge badge-warning"); 
        }
        else {
            UVI.setAttribute("class", "badge badge-danger");
        }

        console.log(response.data[0].value);
        UVI.innerHTML = response.data[0].value; 
        UVEl.innerHTML = "UV Index: "
        UVEl.append(UVI);

    });

//5 day forest for city 
var cityID = response.data.id; 
var weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?id" + cityID + "&appid=" + APIKey; 
axios.get(weatherQueryURL)
.then (function (response) {
    fiveDayEl.classList.remove("d-none"); 

//Response to show for the next 5 days
var forecastEl = document.querySelectorAll(".forecast"); 

for(i = 0; i < forecastEl.length; i++) {
    forecastEl[i].innerHTML = ""; 
    var weatherIndex = i * 8 + 4; 
    var weatherDate = new Date(response.data.forecast[weatherIndex].dt * 1000); 
    var weatherDay = weatherDate.getDate(); 
    var weatherMonth = weatherDate.getMonth() + 1; 
    var weatherYear = weatherDate.getFullYear(); 
    var weatherDateEl = document.createElement ("p"); 
    weatherDateEl.setAttribute("class", "mt-3 mb-0 weather-date"); 
    weatherDateEl.innerHTML = weatherDay + weatherMonth + weatherYear; 
    forecastEl[i].append(weatherDateEl); 

    //icons for current weather forecast
    var weatherForecastEl = document.createElement ("img"); 
    weatherForecastEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png"); 
    weatherForecastEl.setAttribute("alt", response.data.list[weatherIndex].weather[0].description);
    forecastEl[i].append(weatherForecastEl); 
    var weatherTempEl = document.createElement("p"); 
    weatherTempEl.innerHTML = "Temp: " + k2f(response.data.list[weatherIndex].main.temp) + "&#176F"; 
    forecastEl[i].append(weatherTempEl); 
    var weatherHumidEl = document.createElement("p"); 
    weatherHumidEl.innerHTML = "Humidity: " + response.data.list[weatherIndex].main.humidity + "%"; 
    forecastEl[i].append(weatherHumidEl); 
        }
    })
}); 

//history from local storage
searchCity.addEventListener("click", function () {
    var searchItem = cityEl.value;
    getWeather(searchItem);
    searchHistory.push(searchItem);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderHistory(); 
})

// clear History button 
clearSearch.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    renderHistory();
})

function getSearchHistory () {
    historyEl.innerHTML = ""; 
    for(var i = 0; i < searchHistory.length; i++) {
        var pastHistory = document.createElement("input"); 
        pastHistory.setAttribute("type", "text"); 
        pastHistory.setAttribute("readonly", true); 
        pastHistory.setAttribute("class", "form-control d-block bg-white");
        pastHistory.setAttribute("value", searchHistory[i]); 
        pastHistory.addEventListener("click", function () {
            getWeather(pastHistory.value);

        }) 
        historyEl.append(pastHistory);
    }
}

renderHistory(); 
    if(searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
}

loadWeather(); 
// openWeather API  to get weather information
var APIKey = "13ea394a45987d6b455b7b721f41dce7";

//Global variables
var searchCity = document.querySelector('#search-bar');
var searchBtn = document.querySelector('#search-button');
var searchHistory = document.querySelector('#search-history')


//eventListener for search Button 
searchBtn.addEventListener('click', getCity)

function getCity(event) {
    event.preventDefault()
    var currentCity = searchCity.value
    getCurrent(currentCity)
    saveToStorage(currentCity)
}

//Function for store search history of user 

function saveToStorage(city) {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        storage = []
    }
    storage.push(city)
    localStorage.setItem('weatherHistory', JSON.stringify(storage))
    getCurrentHistory()
}

function getCurrentHistory () {
var currentStorage = JSON.parse(localStorage.getItem('weatherHistory'))
if (currentStorage === null) {
    searchHistory.textContent = 'Cannot add current History'
} else {
    searchHistory.textContent = ''
    for (var i=0; i < currentStorage.length; i++) {
        var historyBtn = document.createElement('button')
        historyBtn.setAttribute('id', currentStorage[i])
        historyBtn.textContent = currentStorage[i]
        searchHistory.append(historyBtn)
        $(historyBtn).addClass('button-history')

        //add eventLister for the history button 
        historyBtn.addEventListener('click', function (event){
            getCurrent(event.target.id)
        })

    }
}
}

//calling the function for the search history 
getCurrentHistory()

//fetch the API from the weather site 
function getCurrentWeather (cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + APIKey + '&units=metric')
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
    
        //variables to define longitude and latitude 

        var lat = data.coord.lat
        var lon = data.coord.lon 
        fiveDayForecast(lat, lon)

        console.log('current', data)

        document.querySelector('#city-name').textContent = data.name
        document.querySelector('#temp').textContent = 'Temp:' + data.main.temp + '°C'
        document.querySelector('#humidity').textContent = 'Humidity:' + data.main.humidity
        document.querySelector('#wind').textContent = 'Wind Speed:' + data.wind.speed + 'MPH'

    })
}

//


    
    //parse response to display current weather 
    var todaysDate = new Date(data.list[0].dt); 
    var day = todaysDate.getDate();
    var month = todaysDate.getMonth() + 1; 
    var year = todaysDate.getFullYear();
    nameEl.innerHTML = data.name + "(" + month + day + year + ")";
    var weatherImage = data.weather[0].icon;  
    picEl.setAttribute("src", 'http://openweathermap.org/img/wn/' + weatherImage);
    picEl.setAttribute("alt", data.weather[0].description);
    humidityEl.innerHTML = "Humidity: " + data[0].humidity + "%"; 
    tempEl.innerHTML = "Temperature: " + data[0].temp + "&#176F"; 
    windEl.innerHTML = "Wind: " + data[0].wind.speed + "MPH"; 
  
    //UV Index 
    var lat = data[0].lat; 
    var lon = data[0].lon; 
    var UVQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" 
    + lat + "&lon=" 
    + lon + 
    "&units=metric" +
    "&appid=" + APIKey;

    
    fetch(UVQueryURL)
    .then(function(response){
        return response.json();
    }) 
    .then(function(UVResults){
        console.log(UVResults);

     //signaling end of function
        var UVI = document.createElement("span"); 

        // green for good, ok for yell, red for bad 
        if(UVResults[0].value < 4){
            UVI.setAttribute("class", "badge badge-success"); 
        }
        else if(UVResults[0].value < 8) {
            UVI.setAttribute("class", "badge badge-warning"); 
        }
        else {
            UVI.setAttribute("class", "badge badge-danger");
        }
   
        console.log(UVResults[0].value);
        UVI.innerHTML = UVResults[0].value; 
        UVEl.innerHTML = "UV Index: ";
        UVEl.append(UVI);

    
    }); 
}) 

//5 day forest for city 
var weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?id" + cityID + "&appid=" + APIKey; 
fetch(weatherQueryURL)
.then(function(response){
    return response.json();
})
.then(function(cityID){
    console.log(cityID);

})

//Response to show for the next 5 days
var forecastEl = document.querySelectorAll(".forecast"); 
for(i = 0; i < forecastEl.length; i++) {
    forecastEl[i].innerHTML = ""; 
    var weatherIndex = i * 8 + 4; 
    var weatherDate = new Date(cityID.forecast[weatherIndex].dt); 
    var weatherDay = weatherDate.getDate(); 
    var weatherMonth = weatherDate.getMonth() + 1; 
    var weatherYear = weatherDate.getFullYear(); 
    var weatherDateEl = document.createElement ("p"); 
    weatherDateEl.setAttribute("class", "mt-3 mb-0 weather-date"); 
    weatherDateEl.innerHTML = weatherDay + weatherMonth + weatherYear; 
    forecastEl[i].append(weatherDateEl); 

    //icons for current weather forecast
    var weatherForecastEl = document.createElement ("img"); 
    weatherForecastEl.setAttribute("src", "https://openweathermap.org/img/wn/" + list[forecastIndex].weather[0].icon + "@2x.png"); 
    weatherForecastEl.setAttribute("alt", list[weatherIndex].weather[0].description);
    forecastEl[i].append(weatherForecastEl); 
    var weatherTempEl = document.createElement("p"); 
    weatherTempEl.innerHTML = "Temp: " + k2f(list[weatherIndex].main.temp) + "&#176F"; 
    forecastEl[i].append(weatherTempEl); 
    var weatherHumidEl = document.createElement("p"); 
    weatherHumidEl.innerHTML = "Humidity: " + list[weatherIndex].main.humidity + "%"; 
    forecastEl[i].append(weatherHumidEl); 

    }
 
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

function getHistory () {
    var storage = json.parse(localStorage.getItem('weatherHistory'));
    if(storage === null) {
        searchHistory.textContent = "No History";
    } else {
        searchHistory.textContent = ''; 
    } 
    for(var i=0; i <storage.length; i++) {
        var historyBtn = document.createElement('button');
        historyBtn.setAttribute = storage[i]; 
        searchHistory.appendChild(historyBtn); 
    }
}

getHistory(); 
    if(searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
}


fetchButton.addEventListener('click', openWeather);

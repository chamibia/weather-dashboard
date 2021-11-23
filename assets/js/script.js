$(document).ready(function() {

// openWeather API 
var apiKey = "13ea394a45987d6b455b7b721f41dce7";

//selected  elements 
var currentCityEl = $('#city'); 
var currentDateEl = $('#date');
var weatherIconEl = $('#weather-icon');
var temperatureEl = $('#temperature');
var windEl = $('#wind');
var uvIndexEl = $('#uvIndex');
var humidityEl = $('#humidity');
var previousCityEl = $('.cityList'); 

//selector for city form element 
var cityInput = $('#cityInput');

//store past cities 
var pastCities= [];

//load events from local storage
function loadPastCities() {
    var oldCity = JSON.parse(localStorage.getItem('pastCities'));
    if (oldCity) {
       pastCities = oldCity; 
    }

}
//store in local storage 
function keepCities () {
    localStorage.setItem('pastCities', JSON.stringify(pastCities)); 
}

//build URL for openWeather API 
function createURL(city) { 
    if(city) {
        return 'http://api.openweathermap.org/data/2.5/forecast?q=" + &city + "&units=metric" + "&APPID=" + apiKey';
    }
}

//function to display past cities searches 
function showPastCities(pastCities) {
    currentCityEl.empty();
    pastCities.splice(5); 
    pastCities.sort(compare); 
    pastCities.forEach(function (location) {
        var addCity = $('<div>').addClass('col-12 city'); 
        var makeBtn = $('<button>').addClass('btn btn-success makeBtn').text(location.city);
        addCity.append(makeBtn);
        previousCityEl.append(addCity); 
    }); 
}













//function to display the last searched cities 


//click handler for search button 

//generate button to load that citys weather 


//load any cities in local storage 

//display weather for last searched city 













}); 
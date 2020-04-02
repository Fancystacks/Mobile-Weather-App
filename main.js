const api = {
    key: "5650ba04d76cc8ddc64d65a07cda4c4a",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchField = document.querySelector(".search-box");
searchField.addEventListener("keypress", setQuery);

// on keypress of the enter key, display the results
function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchField.value);
        searchField.value = "";
    }
}

// use the user input to thread through an API call and return as json
function getResults(query) {
    if (query) {
        fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
            .then(response => {
                return response.json();
            }).then(showResults);
    } else {
        alert("Please enter a city or state");
    }
}

function showResults(response) {

    console.log(response.weather[0]);
    // render results to display City, CO
    let searchCity = document.querySelector(".city");
    searchCity.innerHTML = `${response.name}, ${response.sys.country}`;
    // display and round primary large temperature number
    let currentTemp = document.querySelector(".temp");
    currentTemp.innerHTML = `${Math.round(response.main.temp)}°F`;
    // display the daily high and low temperatures
    let hiLow = document.querySelector(".high-low");
    hiLow.innerHTML = `${Math.round(response.main.temp_min)}°F  /  ${Math.round(response.main.temp_max)}°F`;
    let currentWeather = document.querySelector(".condition");
    currentWeather.innerHTML = response.weather[0].main;
    // append a new date with the function created below
    let now = new Date();
    let date = document.querySelector(".date");
    date.innerHTML = dateMaker(now);

}

function dateMaker(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // return wednesday, April 1st, 2020
    return `${day} ${month} ${date}, ${year}`;
}
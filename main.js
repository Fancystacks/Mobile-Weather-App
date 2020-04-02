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
    }
}

// use the user input to thread through an API call and return as json
function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(response => {
        return response.json();
    }).then(showResults);
}

function showResults(response) {
    console.log(response.main);
    // render results to display City, CO
    let searchCity = document.querySelector(".city");
    searchCity.innerHTML = `${response.name}, ${response.sys.country}`;
    // display and round primary large temperature number
    let currentTemp = document.querySelector(".temp");
    currentTemp.innerHTML = `${Math.round(response.main.temp)}°F`;
    // display the daily high and low temperatures
    let hiLow = document.querySelector(".high-low");
    hiLow.innerHTML = `${response.main.temp_min}°F / ${response.main.temp_max}°F`;
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

    return `${day} ${month} ${date}, ${year}`;
}
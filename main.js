const api = {
    key: "5650ba04d76cc8ddc64d65a07cda4c4a",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchField = document.querySelector(".search-box");
searchField.addEventListener("keypress", setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchField.value);
        console.log(searchField.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(response => {
        return response.json();
    }).then(showResults);
}

function showResults(response) {
    console.log(response.main);
}
import {ELEMENTS_UI, deleteCity} from './viewUI.js';
import {SERVER} from "./server.js";

document.querySelector('.tab-triggers').click();

ELEMENTS_UI.FORM.addEventListener('submit', getWeather);

function getWeather(e) {
    e.preventDefault();
    showInfo();
    deleteCity();
}

function getCity(input) {
    return input.value;
}

function getJSON() {
    const city = getCity(ELEMENTS_UI.INPUT);
    const url = `${SERVER.URL}?q=${city}&appid=${SERVER.API_KEY}`;
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err))
}

function showInfo() {
    const json = getJSON();
    json.then(response => ELEMENTS_UI.NOW_TEMP.textContent = Math.round(response.main.temp - 273.16) + '°');
    json.then(response => ELEMENTS_UI.CITY_NAME.forEach(city => city.textContent = response.name));
    json.catch(err => console.log(err));
}

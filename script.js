const API_KEY = "7bf4b503b88237abd8960e1eee9c0c26";
const client_id = "Jx_YwNliAUMNzBk_jiwPloYpWeP3PrVqwIKTBpVfrVA";
const unsplashBaseURL = "https://api.unsplash.com/search/photos?client_id=";
let city_name = "pune";

const weatherIcon = "http://openweathermap.org/img/w/";

let data, unsplashData;
async function getData() {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=`;
    const response = await fetch(`${baseUrl}${API_KEY}&units=metric`);
    data = await response.json();
    // console.log(data);
    // console.log(data.weather[0].icon);

    const unsplashAPI = `${unsplashBaseURL}${client_id}&query=${data.weather[0].description}`;
    const unsplashDataResponce = await fetch(`${unsplashAPI}`);
    unsplashData = await unsplashDataResponce.json();


    updateWeather();
}
getData();

let searchIcon = document.getElementById("searchIcon");
searchIcon.addEventListener("click", fetchCity);
let searchInput = document.getElementById("searchInp");
searchInput.addEventListener("keydown", fetchCityUsingEnter);
function fetchCityUsingEnter(e) {
    if (e.key == "Enter") {
        fetchCity();
    }
}

function fetchCity() {

    city_name = searchInput.value;
    getData();
}

fetchCity();
function updateWeather() {


    // icon 
    let wIcon = document.getElementById("weatherIcon");
    wIcon.src = `${weatherIcon}${data.weather[0].icon}.png`;

    document.getElementById("desc").innerHTML = `${data.weather[0].description}`;

    document.getElementById("city").innerHTML = `${data.name}`;

    const { temp, temp_max, temp_min, humidity } = data.main;

    document.getElementById("temp").innerHTML = `${Math.floor(temp)}&deg;`;

    //temp max
    document.getElementById("tempMax").innerHTML = `${temp_max} &#8451;`;

    // temp min 
    document.getElementById("tempMin").innerHTML = `${temp_min} &#8451;`;

    document.getElementById("cloudy").innerHTML = `${data.clouds.all} %`;

    // humidity 
    document.getElementById("humidity").innerHTML = `${humidity} %`;

    document.getElementById("windSpeed").innerHTML = `${data.wind.speed} Km/hr`;



    //  date and time
    const d = new Date();
    document.getElementById("date").innerHTML = `${d.toDateString()}`;

    console.log(unsplashData.results[0].urls.raw);
    // document.body.style.backgroundImage = `url('${unsplashData.results[0].urls.raw}')`;
    document.body.style.backgroundImage = `url('${unsplashData.results[0].urls.raw}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

}
const apikey = "348c6db1db6e77ec408e65d081af2c84";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.querySelector("button");
const searchbox = document.querySelector("#city");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {
    const response = await fetch(`${apiurl}${city}&appid=${apikey}`);

    if(response.ok){
    var data = await response.json();
    

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = Math.round(data.wind.speed) + " km/h";

    if(data.weather[0].main == "Clouds")    {
        weatherIcon.src = "images/cloud.png";
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/sun.png";
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }
    else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    }
    document.querySelector(".weather").style.display = "block";
}
else{
    alert("City not found, please try again.");
}       
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchbox.value);

})
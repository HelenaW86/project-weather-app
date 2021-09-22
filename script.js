const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";

const weatherContainer = document.getElementById("weather-container");
const currentWeather = document.getElementById("currentWeatherSunrise");
const cityName = document.getElementById("cityName");
const weatherForecast = document.getElementById("weatherForecast");

const fetchWeather = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const temperature = Math.round(data.main.temp * 10) / 10;
      //const sunrise = new Date(data.sys.sunrise * 1000).getHours().toLocaleString();
      const sunriseHours = new Date(data.sys.sunrise * 1000)
        .getHours()
        .toLocaleString();
      const sunriseMinutes = new Date(data.sys.sunrise * 1000)
        .getMinutes()
        .toLocaleString();
      const sunriseSeconds = new Date(data.sys.sunrise * 1000)
        .getSeconds()
        .toLocaleString();
      // console.log(sunrise)
      //const sunset = new Date(data.sys.sunset * 1000).toLocaleString();
      const sunsetHours = new Date(data.sys.sunset * 1000)
        .getHours()
        .toLocaleString();
      const sunsetMinutes = new Date(data.sys.sunset * 1000)
        .getMinutes()
        .toLocaleString();
      const sunsetSeconds = new Date(data.sys.sunset * 1000)
        .getSeconds()
        .toLocaleString();
      //console.log(data.sys.sunset )

      currentWeather.innerHTML += `<h3 class="current-statements">${data.weather[0].main} | ${temperature}°</h3>`;
      currentWeather.innerHTML += `<h3 class="current-statements">sunrise 0${sunriseHours}.${sunriseMinutes}</h3>`;
      currentWeather.innerHTML += `<h3 class="current-statements">sunset ${sunsetHours}.${sunsetMinutes}</h3>`;

      const changeRecomendation = () => {
        if (data.weather[0].main === "Clouds") {
          cityName.innerHTML += `
            <img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="Sunglasses icon">
            <h1>Get your sunnies on.</h1> 
            <h1>${data.name} is looking rather great today.</h1>
            `;
          document.body.style.backgroundColor = "#f7e9b9";
          document.body.style.color = "#2a5510";
        } else if (data.weather[0].main === "Rain") {
          cityName.innerHTML += `
            <img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="Rain icon"/>
            <h1>Don't forget your umbrella. </h1>
            <h1>It's wet in ${data.name} today.</h1>
            `;
          document.body.style.backgroundColor = "#A3DEF7";
          document.body.style.color = "#164A68";
        } else if (data.weather[0].main === "Clear") {
          cityName.innerHTML += `
            <img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="Clound icon"/>
            <h1>Light a fire and get cosy. </h1>
            <h1>${data.name} is looking grey today.</h1>
            `;
          document.body.style.backgroundColor = "#F4F7F8";
          document.body.style.color = "#F47775";
        } else {
          cityName.innerHTML += `
            <h1>Prepare for everything! </h1>
            <h1>${data.name} is unpredictable today.</h1>
            `;
          document.body.style.backgroundColor = "#BFE2E0";
          document.body.style.color = "#862C4D";
        }
      };
      changeRecomendation();
    });
};

fetchWeather();

const fetchWeatherForecast = () => {
  fetch(API_URL_FORECAST)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tempForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00")
      ); // array

      const tempForecastFiveDays = tempForecast.map((listItem) => {
        console.log(listItem.main.temp);
        const dateVariable = new Date(listItem.dt * 1000).getDay(); // gives us 2 as today is tuesday
        const arrayOfWeekdays = [
          "sun",
          "mon",
          "tue",
          "wed",
          "thu",
          "fri",
          "sat",
        ];
        const weekdayName = arrayOfWeekdays[dateVariable]; //arrayofWeekdays[2]
        console.log(weekdayName);
        console.log(dateVariable);
        return (weatherForecast.innerHTML += `<div class="week-wrap"><div class="week-day"><h1> ${weekdayName} </h1></div> 
        <div class="week-temp"><h1>${Math.round(
          listItem.main.temp
        )}°</h1></div></div>
        `);
      });
    });
};
fetchWeatherForecast();

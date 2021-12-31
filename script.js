const API_URL_STOCKHOLM =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_BERLIN =
  "https://api.openweathermap.org/data/2.5/weather?q=Berlin,Germany&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_COPENHAGEN =
  "https://api.openweathermap.org/data/2.5/weather?q=Copenhagen,Germany&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_FORECAST_STOCKHOLM =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_FORECAST_BERLIN =
  "https://api.openweathermap.org/data/2.5/forecast?q=Berlin,Germany&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_FORECAST_COPENHAGEN =
  "https://api.openweathermap.org/data/2.5/forecast?q=Copenhagen,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";

const body = document.getElementById("body");
const weatherContainer = document.getElementById("weather-container");
const currentWeather = document.getElementById("currentWeatherSunrise");
const cityName = document.getElementById("cityName");
const weatherForecast = document.getElementById("weatherForecast");
const buttonCity = document.getElementById("button");
const image = document.getElementById("imageButton");
const searchButton = document.getElementById("citySearchButton");
const chosenCity = document.getElementById("chosenCity");

const API_KEY = "7678391e67f390dcfc1cc2681209fd22";

let city = "Stockholm";

const getWeather = (data) => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60;
  const temperature = Math.round(data.main.temp * 10) / 10;
  const sunrise = data.sys.sunrise + data.timezone + timezoneOffset;
  const sunset = data.sys.sunset + data.timezone + timezoneOffset;
  let description = data.weather[0].description;

  description = description.charAt(0).toUpperCase() + description.slice(1);

  // Converter for sunrise & sunset time to wanted format
  const convert = (t) => {
    const dt = new Date(t * 1000);
    const hr = "0" + dt.getHours();
    const m = "0" + dt.getMinutes();
    return hr.substr(-2) + "." + m.substr(-2);
  };

  const sunriseTime = convert(sunrise);
  const sunsetTime = convert(sunset);

  currentWeather.innerHTML += /*html*/ `
        <h3 class="current-statements">
        ${description} | ${Math.round(data.main.temp)}°</h3>
        <h3 class="current-statements">sunrise ${sunriseTime}</h3>
        <h3 class="current-statements">sunset ${sunsetTime}</h3>
        <h3 class="current-statements">wind ${Math.round(
          data.wind.speed
        )} m/s</h3>
    `;

  const changeRecomendation = () => {
    body.classList.remove(...body.classList);

    if (data.weather[0].main === "Clear") {
      cityName.innerHTML += /*html*/ `
                <img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="Sunglasses icon">
                <h1>Get your sunnies on.
                <span class="place">${data.name}</span> is looking rather great today.</h1>
            `;
      body.classList.add("sunny");
      chosenCity.style.borderColor = "#2a5510";
      searchButton.style.backgroundColor = "#f7e9b9";
      searchButton.style.color = "#2a5510";
      searchButton.style.borderColor = "#2a5510";
      buttonCity.style.background =
        'url("/Designs/buttons_weatherapp/button_sunny.svg")';
    } else if (
      data.weather[0].main === "Rain" ||
      data.weather[0].main === "Drizzle"
    ) {
      cityName.innerHTML += /*html*/ `
                <img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="Rain icon"/>
                <h1>Don't forget your umbrella.
                It's wet in <span class="place">${data.name}</span> today.</h1>
            `;

      searchButton.style.backgroundColor = "#A3DEF7";
      searchButton.style.color = "#164A68";
      searchButton.style.borderColor = "#164A68";
      chosenCity.style.borderColor = "#164A68";
      body.classList.add("rainy");
      buttonCity.style.background =
        'url("/Designs/buttons_weatherapp/button_rain.svg")';
    } else if (data.weather[0].main === "Clouds") {
      cityName.innerHTML += /*html*/ `
                <img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="Clound icon"/>
                <h1>Light a fire and get cosy.
                <span class="place">${data.name}</span> is looking grey today.</h1>
            `;
      searchButton.style.backgroundColor = "#F4F7F8";
      searchButton.style.color = "#F47775";
      searchButton.style.borderColor = "#F47775";
      chosenCity.style.borderColor = "#F47775";
      body.classList.add("cloudy");
      buttonCity.style.background =
        'url("/Designs/buttons_weatherapp/button_clouds.svg")';
    } else if (data.weather[0].main === "Snow") {
      cityName.innerHTML += /*html*/ `
            <img src='assets/icons/icon-snowflake.svg' alt='Snowflake'/>
            <h1>Light a fire and get cozy. It's snowing in <span class="place">${data.name}</span> today.</h1>
        `;
      searchButton.style.backgroundColor = "#e9e0e7";
      searchButton.style.color = "#6c2e88";
      searchButton.style.borderColor = "#6c2e88";
      chosenCity.style.borderColor = "#6c2e88";
      body.classList.add("snow");
      buttonCity.style.background =
        'url("/Designs/buttons_weatherapp/button_snow.svg")';
    } else {
      cityName.innerHTML += /*html*/ `
                <img src="/Designs/Design-2/icons/noun_Other_862C4D.svg" alt="Unpredictable weather icon"/>
                <h1>Prepare for everything!
                <span class="place">${data.name}</span> is unpredictable today.</h1>
            `;
      searchButton.style.backgroundColor = "#BFE2E0";
      searchButton.style.color = "#862C4D";
      searchButton.style.borderColor = "#862C4D";
      chosenCity.style.borderColor = "#862C4D";
      body.classList.add("unpredictable");
      buttonCity.style.background =
        'url("/Designs/buttons_weatherapp/button_other.svg")';
    }
    description = description.charAt(0).toUpperCase() + description.slice(1);
  };
  changeRecomendation();
};

const getForecast = (data) => {
  const tempForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00")
  ); // array

  const tempForecastFiveDays = tempForecast.map((listItem) => {
    const dateVariable = new Date(listItem.dt * 1000).getDay(); // gives us 2 as today is tuesday
    const now = new Date().getDay();
    const isToday = dateVariable === now;
    const arrayOfWeekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const weekdayName = arrayOfWeekdays[dateVariable]; //arrayofWeekdays[2]
    if (!isToday) {
      return (weatherForecast.innerHTML += /*html*/ `
                <div class="week-wrap">
                    <div class="week-day">
                        <h1> ${weekdayName}</h1>
                    </div> 
                    <div class="week-temp">
                        <h1>${Math.round(listItem.main.temp)}°</h1>
                    </div>
                </div>
            `);
    }
  });
};

const fetchWeatherStockholm = () => {
  fetch(API_URL_STOCKHOLM)
    .then((response) => response.json())
    .then((data) => {
      getWeather(data);
      console.log(data);
    })
    .catch((error) => console.error("error", error));
  fetch(API_URL_FORECAST_STOCKHOLM)
    .then((response) => response.json())
    .then((data) => {
      getForecast(data);
      console.log(data);
    });
};

const fetchWeatherBerlin = () => {
  fetch(API_URL_BERLIN)
    .then((response) => response.json())
    .then((data) => getWeather(data));
  fetch(API_URL_FORECAST_BERLIN)
    .then((response) => response.json())
    .then((data) => getForecast(data));
};

const fetchWeatherCopenhagen = () => {
  fetch(API_URL_COPENHAGEN)
    .then((response) => response.json())
    .then((data) => getWeather(data));
  fetch(API_URL_FORECAST_COPENHAGEN)
    .then((response) => response.json())
    .then((data) => getForecast(data));
};

let click = 1;

buttonCity.addEventListener("click", () => {
  if (click === 1) {
    fetchWeatherBerlin();
    click = 2;
    currentWeather.innerHTML = "";
    cityName.innerHTML = "";
    weatherForecast.innerHTML = "";
  } else if (click === 2) {
    fetchWeatherCopenhagen();
    click = 3;
    currentWeather.innerHTML = "";
    cityName.innerHTML = "";
    weatherForecast.innerHTML = "";
  } else {
    fetchWeatherStockholm();
    currentWeather.innerHTML = "";
    cityName.innerHTML = "";
    weatherForecast.innerHTML = "";
    click = 1;
  }
});

const fetchWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      getWeather(data);
    })
    .catch((error) => {
      console.error("Error: ", error);
      weatherForecast.innerHTML = /*html*/ `
              <div class="error-text">Ooops! Please try again.</div>
              <div class="search-instructions">If the city you searched for is not in the country you intended please submit the country code as well. For example, instead of writing <i>Melbourne</i> write <i>Melbourne, AU</i>.</div>
          `;
    });
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      getForecast(data);
    });
  currentWeather.innerHTML = "";
  cityName.innerHTML = "";
  weatherForecast.innerHTML = "";
};

const changeCity = () => {
  // console.log(chosenCity.value)
  city = chosenCity.value;
  fetchWeather();
  chosenCity.value = "";
};

searchButton.addEventListener("click", () => {
  changeCity();
});

chosenCity.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    changeCity();
  }
});

// start display
fetchWeather();

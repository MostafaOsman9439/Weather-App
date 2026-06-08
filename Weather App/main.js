const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const weatherDesc = document.getElementById("weather-desc");
const temp = document.getElementById("temp");
const weatherIcon = document.getElementById("weather-icon");

async function getWeather(city) {
  try {
    const apiKey = "3125888e388948d5883121014260806";
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );
    const data = await response.json();
    const currentCity = data.location.name;
    const currentTemp = data.current.temp_c;
    const currentDesc = data.current.condition.text;
    const iconUrl = data.current.condition.icon;
    cityName.innerText = currentCity;
    temp.innerText = `${currentTemp}°C`;
    weatherDesc.innerText = currentDesc;
    weatherIcon.src = `https:${iconUrl}`;
    if (currentTemp > 25) {
      // Changing The Colors Depending On The Temp
      document.body.style.background =
        "linear-gradient(135deg, #f6d365 0%, #fda085 100%)";
    } else if (currentTemp < 15) {
      document.body.style.background =
        "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";
    } else {
      document.body.style.background =
        "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)";
    }
  } catch (error) {
    // If Something Wrong Happened (Wrong Name, No Internet, etc)
    cityName.innerText = "City not found!";
    weatherIcon.src = "";
    temp.innerText = "--°C";
    weatherDesc.innerText = "Please try again";
  }
}

// If Someone Pressed Enter Instead Of Search
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const cityName = cityInput.value;
    getWeather(cityName);
  }
});
// So It Starts With Cairo Not Empty Value
searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value;
  getWeather(cityName); // Then We Call They Function For The Weather Results
});

getWeather("Cairo");

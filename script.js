// Function to fetch weather data
async function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");

  // Check if city is empty
  if (city === "") {
    result.innerHTML = "❌ Please enter a city name";
    return;
  }

  try {
    // Step 1: Convert city name to latitude & longitude
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results) {
      result.innerHTML = "❌ City not found";
      return;
    }

    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    const location = geoData.results[0].name;
    const country = geoData.results[0].country;

    // Step 2: Fetch current weather
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();

    const temperature = weatherData.current_weather.temperature;
    const windSpeed = weatherData.current_weather.windspeed;

    // Display weather
    result.innerHTML = `
      📍 <b>${location}, ${country}</b><br>
      🌡 Temperature: <b>${temperature}°C</b><br>
      💨 Wind Speed: <b>${windSpeed} km/h</b>
    `;
  } catch (error) {
    result.innerHTML = "⚠️ Unable to fetch weather data";
  }
}

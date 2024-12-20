const apiKey = '6c4ac48c5887915bd67c13bbd0359238';

function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=en`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const city = data.name;
      document.getElementById('weather-info').innerHTML = `It is ${weatherDescription} with a temperature at ${temperature}&deg;C in ${city}.`;
    })
    .catch(error => {
      document.getElementById('weather-info').innerHTML = 'data could not be loaded.';
      console.error('Fejl ved hentning af vejrdata:', error);
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeather(latitude, longitude);
    }, () => {
      document.getElementById('weather-info').innerHTML = 'Kunne ikke få din placering.';
    });
  } else {
    document.getElementById('weather-info').innerHTML = 'Geolocation er ikke understøttet af din browser.';
  }
}

window.onload = getLocation;
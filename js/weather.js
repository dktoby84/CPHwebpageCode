// Din OpenWeatherMap API-nøgle
const apiKey = '6c4ac48c5887915bd67c13bbd0359238';

// Funktion til at hente vejret baseret på bredde- og længdegrad
function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=da`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const city = data.name;
      document.getElementById('weather-info').innerHTML = `Det er ${weatherDescription} med en temperatur på ${temperature}&deg;C i ${city}.`;
    })
    .catch(error => {
      document.getElementById('weather-info').innerHTML = 'Kunne ikke hente vejrdata.';
      console.error('Fejl ved hentning af vejrdata:', error);
    });
}

// Få brugerens position
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

// Kald funktionen når siden indlæses
window.onload = getLocation;

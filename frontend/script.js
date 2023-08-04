const search_btn = document.querySelector('.search-bar button');
search_btn.addEventListener('click', () => {
  const city = document.querySelector('input').value;
  makeCall(city);
});

const makeCall = async (city) => {
  city = city ? city : 'London';
  let apiUrl = 'http://localhost:5000/api/weather/' + city;

  const error_block = document.querySelector('#error');
  const weather_block = document.querySelector('.weather');
  const post_data = {
    city,
  };
  try {
    const response = await fetch(apiUrl);
    console.log(response);
    if (response.status >= 400) {
      error_block.style.display = 'block';
      weather_block.style.display = 'none';
    } else {
      error_block.style.display = 'none';
      weather_block.style.display = 'block';

      var data = await response.json();
      console.log(data);

      document.querySelector('#name').innerHTML = data.name;
      document.querySelector('#temp').innerHTML =
        Math.round(data.main.temp - 273.15) + '°C';
      document.querySelector('#condition-name').innerHTML =
        data.weather[0].main;
      document.querySelector('#description').innerHTML =
        data.weather[0].description;
      document.querySelector('#humid-per').innerHTML =
        data.main.humidity + '%<br/> Humidity';
      document.querySelector('#wind-speed-kmh').innerHTML =
        data.wind.speed + 'Km/h<br/> Wind Speed';

      let condition = 'png/clear.png';
      switch (data.weather[0].main) {
        case 'Rain':
          condition = 'png/rainy.png';
          break;
        case 'Haze':
          condition = 'png/haze.png';
          break;
        case 'Mist':
          condition = 'png/mist.png';
          break;
        case 'Clear':
          condition = 'png/clear.png';
          break;
        case 'Clouds':
          condition = 'png/cloudy.png';
          break;
      }
      document.querySelector('#condition-img').src = condition;
    }
  } catch (error) {
    console.log(error);
  }
};

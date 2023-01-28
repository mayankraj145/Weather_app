const timeE1= document.getElementById('time');
const dateE1= document.getElementById('date');

setInterval(() =>{
    const time= new Date();
    const hour = time.getHours();
    const minutes= time.getMinutes();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const ampm = hour >=12 ? 'Pm' : 'Am'

    timeE1.innerHTML = `Current Time: ${hoursIn12HrFormat}:${minutes} ${ampm}`
},1000);

let weather = {
  apiKey: "37894067252e46f37e858bbf035f8cf5",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { sunrise, sunset } = data.sys;
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;
    // const sun= document.querySelector(".sunrise");
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".feels_like").innerText= "Feels Like: " + feels_like + "°C";
    // document.querySelector(".sunrise").innerText = "Sunrise: "+ window.moment(sunrise* 1000).format('HH:mm a');
    // sun.innerHTML =
    //   `<div class="sunrise">
    //     <div>Sunrise: </div>
    //     <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    //   </div>` 
    // document.querySelector(".sunrise").innerText = "Sunrise: " + sunrise;
    // document.querySelector(".sunset").innerText = "Sunset: " + sunset;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Patna");

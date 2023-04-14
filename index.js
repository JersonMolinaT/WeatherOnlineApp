const apikey = "17c8656368263c34c2801ed8fc1ab1f9";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");
formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
         if(!response.ok){
            throw new Error("Respuesta de red negativa")
         }         
            const data = await response.json()

         const temperature = Math.round( data.main.temp );
         const description = data.weather[0].description;
         const icon = data.weather[0].icon
         /*const details = [
            `Feels like: ${Math.round( data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}`,
            `Wind speed: ${data.wind.speed}`
         ]
       .innerHTML = `<img
        src="http://openweathermap.org/img/wn/${icon}.png"
        alt="Weather Icon">`;

      weatherDataEl.querySelector(".temperature").textContent  = `${temperature}°C`;
      weatherDataEl.querySelector(".description").textContent = description;*/

      const details = [
        `Feels like: ${Math.round( data.main.feels_like)}`,
        `Humidity: ${data.main.humidity} %`,
        `Wind speed: ${data.wind.speed} m/s`
     ];
     
     const imgHtml = `<img
      src="http://openweathermap.org/img/wn/${icon}.png"
      alt="Weather Icon">`;
     
     weatherDataEl.innerHTML = `
        <div class="temperature"></div>
        <div class="description"></div>
        <div class="details">${details.map((detail)=> `<div>${detail}</div>`).join("")}</div>
        ${imgHtml}
     `;
     
     weatherDataEl.querySelector(".temperature").textContent  = `${temperature}°C`;
     weatherDataEl.querySelector(".description").textContent = description;
     

      weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`).join("");

        } catch (error) {
        
    }
}




















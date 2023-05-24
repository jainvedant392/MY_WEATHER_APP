let search_bar = document.getElementById("search_bar");

let temperature =document.getElementById("temperature");
let condition =document.getElementById("condition");
let weathericon=document.getElementById("icon");
let feels_like=document.getElementById("feelslike");
let windspeed=document.getElementById("windspeed");
let sunrise=document.getElementById("sunrise");
let sunset=document.getElementById("sunset");

search_bar.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.getElementById("search_btn").click();
    }
});

document.getElementById("search_btn").addEventListener("click", () => {
    let location = search_bar.value;
    weather_info(location);
})

function weather_info(location){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5339c66fde06783269bfc4e14d2a89dc`;
    fetch(url)
    .then(response => {return response.json();})
    .then(data => {
        console.log(data);
        document.getElementById("error").innerText = "";
        weathericon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        condition.innerText = data.weather[0].main;
        temperature.innerText = data.main.temp + '°C';
        temperature.style.fontSize="37px";
        feels_like.innerText = `FEELS LIKE : ${data.main.feels_like} °C`;
        windspeed.innerText = data.wind.speed + 'm/s';
        
        let sunrise_gmt = new Date((data.sys.sunrise)*1000);
        let sunset_gmt = new Date((data.sys.sunset)*1000);
        sunrise.innerText = `SUNRISE : ${sunrise_gmt.toLocaleDateString()}, ${sunrise_gmt.toLocaleTimeString()}`;
        sunset.innerText = `SUNSET : ${sunset_gmt.toLocaleDateString()}, ${sunset_gmt.toLocaleTimeString()}`;
    })
    .catch(() => {
        document.getElementById("error").innerText=`SORRY! ${search_bar.value} NOT FOUND`;
        temperature.innerText="NOT FOUND";
        temperature.style.fontSize="12px";
        feels_like.innerText="NOT FOUND";
        condition.innerText="NOT FOUND";
        windspeed.innerText="NOT FOUND";
        sunrise.innerText="NOT FOUND";
        sunset.innerText="NOT FOUND";
    })
}

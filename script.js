let search_bar = document.getElementById("search_bar");

let temperature =document.getElementById("temperature");
let condition =document.getElementById("condition");
let weathericon=document.getElementById("icon");
let feels_like=document.getElementById("feelslike");
let windspeed=document.getElementById("windspeed");

let api='5339c66fde06783269bfc4e14d2a89dc';

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
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api}`;
    fetch(url)
    .then(response => {return response.json();})
    .then(data => {
        console.log(data);
        document.getElementById("error").innerText="";
        weathericon.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temperature.innerText=`TEMPERATURE : ${data.main.temp} °C`;
        feels_like.innerText=`FEELS LIKE : ${data.main.feels_like} °C`;
        condition.innerText=`${data.weather[0].main}`;
        windspeed.innerText=`WINDSPEED : ${data.wind.speed} m/s`;
    })
    .catch(() => {
        document.getElementById("error").innerText=`SORRY! ${search_bar.value} NOT FOUND`;
        temperature.innerText="NOT FOUND";
        feels_like.innerText="NOT FOUND";
        condition.innerText="NOT FOUND";
        windspeed.innerText="NOT FOUND";
    })
}

const searchBar = document.querySelector(".searchBar");
const searchButton = document.querySelector("#searchButton");
const cityNameDisplay = document.querySelector(".cityName"); 
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weatherIcon");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const tabIcon = document.querySelector("#tabIcon");
const changeColor = document.querySelector(".changeColor");
const apiKey="4a6e3889789b198be919a80ef3ef5cea";
let cityName;
let darkMode=true;

searchBar.addEventListener("keyup",(event)=>{
    if(event.code==="Enter"){
        fetchWeather();
    }
}
);
searchButton.addEventListener("click", fetchWeather);
changeColor.addEventListener("click", change);

function change(){
    changeColor.firstChild.classList.toggle("darkmode");    
        document.querySelector(".searchBar").classList.toggle("lightmode");
        document.querySelector(".searchButton").classList.toggle("lightmode");
        document.querySelector(".box").classList.toggle("lightmode");    
        document.body.classList.toggle("darkmode");
}

function fetchWeather(){
    cityName=searchBar.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => weatherDisplay(data));
}

function weatherDisplay(data){
    console.log(data);
    cityNameDisplay.textContent=`Weather in ${data.name}, ${data.sys.country}`;
    temperature.textContent = `${data.main.temp}°C`;
    weatherIcon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.style="width:70px; height:70px;";
    tabIcon.href=weatherIcon.src;
    description.textContent=data.weather[0].description;
    humidity.textContent=`Humidity: ${data.main.humidity}%`;
    windSpeed.textContent=`Wind-Speed: ${data.wind.speed} km/h`;
}
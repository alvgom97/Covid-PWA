
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').then(function() { console.log('Service Worker Registered'); });
}

async function getData() {

    return await fetch('https://api.covid19api.com/summary')
    .then(response => response.json());
}

async function getColor() {

    return await fetch('https://www.colr.org/json/colors/random/4')
    .then(response => response.json());
}

function updateView(data){

    const total = document.querySelector("header h1");
    const recov = document.querySelector("#recov");
    const deaths = document.querySelector("#deaths");
    const date = document.querySelector("header h4");
    

    total.innerText = data.Global.TotalConfirmed;
    recov.innerText = data.Global.TotalRecovered;
    deaths.innerText = data.Global.TotalDeaths;
    date.innerText = data.Date.slice(0, 10).split("-").reverse().join("/");
    
}

function updateBackground(data){

    let body = document.querySelector("body");
    body.style.setProperty("background", "linear-gradient(90deg, #" + data.matching_colors[0] + " 0%, #" + data.matching_colors[1] +" 50%, #" + data.matching_colors[2] + " 100%)");
}

const button = document.querySelector("header button");

button.addEventListener("click", () => {});

let offline = document.createElement("p");
offline.appendChild(document.createTextNode("Offline"));
offline.id = "offline";

if(!navigator.onLine){
    document.querySelector("body").appendChild(offline);
}

getData().then(updateView);
getColor().then(updateBackground);


if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').then(function() { console.log('Service Worker Registered'); });
}

async function getData() {

    return await fetch('https://api.covid19api.com/summary')
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

const button = document.querySelector("header button");

button.addEventListener("click", () => { getData().then(updateView)});

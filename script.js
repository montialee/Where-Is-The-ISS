var map = L.map('map').setView([0, 0], 1)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var issIcon = L.icon({
    iconUrl: 'iss.svg.png',
    iconSize: [80, 62],
    iconAnchor: [40, 31],
});
var marker = L.marker([0, 0], {icon: issIcon}).addTo(map);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let ftime = true;

async function getISS(){
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude} = data;

    marker.setLatLng([latitude, longitude]);

    if(ftime){
      map.setView([latitude, longitude], 1)
      ftime = false;
    }



    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('long').textContent = longitude.toFixed(2);


}

getISS();

setInterval(getISS,5000)

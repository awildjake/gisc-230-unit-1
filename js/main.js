const leafletMap = function () {
    var map = L.map('map').setView([37.334950108395034, -121.88113429729086], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
};

const cities = function (){
    var cities = [
        { name: 'Campbell', population: 42696 },
        { name: 'Cupertino', population: 60091 },
        { name: 'Gilroy', population: 55615 },
        { name: 'Los Altos', population: 31361 },
        { name: 'Los Altos Hills', population: 8568 },
        { name: 'Los Gatos', population: 30601 },
        { name: 'Milpitas', population: 74865 },
        { name: 'Monte Sereno', population: 3630 },
        { name: 'Morgan Hill', population: 44513 },
        { name: 'Mountain View', population: 81527 },
        { name: 'Palo Alto', population: 69721 },
        { name: 'San Jose', population: 1051316 },
        { name: 'Santa Clara', population: 129604 },
        { name: 'Saratoga', population: 31435 },
        { name: 'Sunnyvale', population: 153389 }
    ];

    var table = document.createElement('table');
    var headerRow = document.createElement('tr');

    headerRow.insertAdjacentHTML('beforeend','<th>City</th><th>Population</th>')

    table.appendChild(headerRow);

    for (let i = 0; i < cities.length; i++) {
        var tr = document.createElement('tr');

        var city = document.createElement('td');
        city.innerHTML = cities[i].name;
        tr.appendChild(city);

        var pop = document.createElement('td');
        pop.innerHTML = cities[i].population;
        tr.appendChild(pop);

        table.appendChild(tr);
    };

    document.querySelector("#mydiv").appendChild(table);
};

function initialize(){
    cities();
    leafletMap();
};

window.onload = initialize();
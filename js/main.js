const loadGeoJson = async function() {
    try{
        const response = await fetch('data/ed_1940_pct.geojson');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

		const geojson = await response.json();
		return geojson;
    } catch (error) {
		console.error('Failed to load GeoJSON:', error);
		throw error;
	}
};

const leafletMap = async function () {
    var map = L.map('map').setView([37.334950108395034, -121.88113429729086], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

	const geojson = await loadGeoJson();

	const layer = L.geoJSON(geojson).addTo(map);
	
};

// Array of city names and populations
const cityPop = [
	{ 
		city: 'Madison',
		population: 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];

// Create intitial table with names and pops
const cities = function (){

    var table = document.createElement('table');
    var headerRow = document.createElement('tr');

    headerRow.insertAdjacentHTML('beforeend','<th>City</th><th>Population</th>')

    table.appendChild(headerRow);

    for (let i = 0; i < cityPop.length; i++) {
        var tr = document.createElement('tr');

        var city = document.createElement('td');
        city.innerHTML = cityPop[i].city;
        tr.appendChild(city);

        var pop = document.createElement('td');
        pop.innerHTML = cityPop[i].population;
        tr.appendChild(pop);

        table.appendChild(tr);
    };

    document.querySelector("#mydiv").appendChild(table);
};

// Add column to table stating city size based on pop value
function addColumns(){
    
    document.querySelectorAll("tr").forEach(function(row, i){

    	if (i == 0){
    		row.insertAdjacentHTML('beforeend','<th>City Size</th>');
    	} else {
    		var citySize;
            

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};

			row.insertAdjacentHTML('beforeend','<td>' + citySize + '</td>');
    	};
    });
};

// Add listeners for mouse over and click on table
function addEvents(){

    // Changes text color of table based on random value
	document.querySelector("table").addEventListener("mouseover", function(){
		
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
		    };

            // Sets table color to random color defined above
		    document.querySelector("table").style.color = color;
	    };
    });

    // Creates alert for clicking on table
	function clickme(){
		alert('Hey, you clicked me!');
	};

	document.querySelector("table").addEventListener("click", clickme)
};

// Initialize function
function initialize(){
    cities();
    addColumns();
    addEvents();
    leafletMap();
};

window.onload = initialize;
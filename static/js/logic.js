// Declare variables
let url = 'data/all_week.geojson';
let queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Change the color based on the feature's earthquake depth
let cats = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
let colors = ['GreenYellow', 'Cyan', 'Tan', 'Salmon', 'Orange', 'Red', 'LightGreen'];

// Function to get color based on depth
function getColor(d) {
  return d > 90 ? colors[5] :
         d > 70 ? colors[4] :
         d > 50 ? colors[3] :
         d > 30 ? colors[2] :
         d > 10 ? colors[1] :
         d > -10 ? colors[0] :
         colors[6];
}

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Define a function to run for each feature
  function doOnEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><ul><li>Earthquake Magnitude: ${feature.properties.mag}</li><li>Earthquake Depth: ${feature.geometry.coordinates[2]}</li></ul>`);
  }

  // Create a GeoJSON layer
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius: feature.properties.mag * 3,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: 'black',
        weight: 0.2,
        opacity: 0.5,
        fillOpacity: 0.75
      });
    },
    onEachFeature: doOnEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {
  // Create the base layers
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  let dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  });

  // Create a baseMaps object
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    "Dark Map": dark
  };

  // Create an overlay object
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create the map
  let map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [street, earthquakes]
  });

  // Create a legend
  let legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');
    for (let i = 0; i < cats.length; i++) {
      let item = `<li style='background: ${colors[i]} '></li>   ${cats[i]}<br>`;
      div.innerHTML += item;
    }
    return div;
  };
  legend.addTo(map);

  // Create a layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
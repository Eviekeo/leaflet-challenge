// Create the tile layer that will be the background of our map.
    let worldmap = L.map('map').setView([12.5657,104.9910], 3.1); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(worldmap);

// Create a variable to hold the API URL
    let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"     
    
// Use d3 to call the API and its data
d3.json(url).then(function(data){

    //Define the colour for each bucket 
    function getValue(x) {
        return x > 90 ? "#644D8E" :
               x > 70 ? "#8E5B91" :
               x > 50 ? "#C76B8F" :
               x > 30 ? "#DC828E" :
               x > 10 ? "#EC988E" :
                         "#FFCC99";
    }
    
    //Define the style to be used for the circle markers
    function style(feature) {
        return {
            fillColor: getValue(feature.geometry.coordinates[2]),
            stroke: true,
            color: "#000", 
            radius: feature.properties.mag * 3,
            weight: 0.5,
            fillOpacity: 1,
        };
    }
    
   // Create a geojson layer and add the styling defined earlier
    var dat = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, style(feature));
        },
  
      // Define the behaviour for each feature on the map and binding a popup to the feature layer with place, magnitude, and depth information
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<strong>" + feature.properties.place + "</strong><br /><br />Magnitude:" +
          feature.properties.mag + "<br /><br />Depth:" + feature.geometry.coordinates[2]);
      }
    }).addTo(worldmap);
  
    // Set up the legend and lists to hold the depth and colours
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let colors = ["#FFCC99", "#EC988E", "#DC828E", "#C76B8F", "#8E5B91", "#644D8E"];
      let labels = [-10, 10, 30, 50, 70, 90];

      // Loop through labels and colors to create legend items   
      for (var i = 0; i < labels.length; i++) {
        div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
        + labels[i] + (labels[i + 1] ? "&ndash;" + labels[i + 1] + "<br>" : "+");
    }

    // Return the created legend
    return div;
    };
     
  
    // Adding the legend to the map
    legend.addTo(worldmap);

});



# leaflet-challenge
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

As part of this project I have mapped all earthquakes from the past 7 days pulled from the USGS API.

# File structure
HTML code is stored in the "Leaflet-Part-1" directory 
    CSS and javascript files are stored in the "static" directory 

# Code source
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let colors = ["#FFCC99", "#EC988E", "#DC828E", "#C76B8F", "#8E5B91", "#644D8E"];
      let labels = [-10, 10, 30, 50, 70, 90];
  
      for (var i = 0; i < labels.length; i++) {
        div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
        + labels[i] + (labels[i + 1] ? "&ndash;" + labels[i + 1] + "<br>" : "+");
    }

The above code was used to set up and create the legend for the map. The code was adapted from the below site:
https://gis.stackexchange.com/questions/133630/adding-leaflet-legend
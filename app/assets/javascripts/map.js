$(document).ready(function() {
  var map = L.mapbox.map('map', 'examples.map-20v6611k').setView([51.5, -0.08], 16);


  $.ajax({
		type: "GET",
		url: "/restaurants/",
		data: $(this).serialize(),
		success: function(data){
			dataType:'json';
			$.each(data, function(restaurant, item){
				console.log(item);
    				addMarker(item);
			});
		}
	});


  function addMarker(item) {
		var geoJson = [{
	    type: 'Feature',
	    "geometry": { "type": "Point", "coordinates": [item.latitude, item.longitude]},
	    "properties": {
	        "url": "/",
	        "name": item.name,
	        "description": item.description
	    }

	}];
	map.markerLayer.setGeoJSON(geoJson);
	map.markerLayer.on('ready', function(e) {
    this.eachLayer(function(marker) {
        var feature = marker.feature;
        // Create custom popup content
        var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' +
             '<div>' + feature.properties.name + '</div>' + '</a>' + '<p>' +feature.properties.description + '</p>' + '<p>' + '<strong>' + 'Lat/Long:' + '</strong>' + " " + feature.geometry.coordinates + '</p>';

        // http://leafletjs.com/reference.html#popup
        marker.bindPopup(popupContent,{
            closeButton: false,
            minWidth: 320
        });

    });
});

	}




  $("#find_me").click(function() {

map.locate();

  map.on('locationfound', function(e) {
    map.setView(e.latlng, 16);



});






});
});

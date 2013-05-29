$(document).ready(function() {
  var map = L.mapbox.map('map', 'examples.map-20v6611k').setView([51.5, -0.08], 16);
  var geolocate = document.getElementById('geolocate');



  $.ajax({
		type: "GET",
		url: "/restaurants/",
		data: $(this).serialize(),
		dataType:'json',
		success: function(data){
			$.each(data, function(restaurant, item){
    			addMarker(item);
			});
		}
	});


  function addMarker(item) {
		var geoJson = [{
	    type: 'Feature',
	    "geometry": { "type": "Point", "coordinates": [item.longitude, item.latitude]},
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
            closeButton: true,
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
  $(".hero-unit").hide('fast');
});


  $(".close").click(function() {
  	$(".hero-unit").hide('fast');
  });

 $(".navbar-search").submit(function(e) {

	  e.preventDefault();
	  $.ajax({
	  	type: "GET",
	  	url: "/locations/",
	  	data: {"address": $("#search_term").val()},
	  	success: function(data){
      console.log(data.address);
      map.setView([data.latitude, data.longitude], 16);
	  		$(".hero-unit").hide('fast');
	  	}

	  });

	});
});

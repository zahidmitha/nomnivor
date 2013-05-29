$(document).ready(function() {
  var map = L.mapbox.map('map', 'examples.map-20v6611k').setView([51.5, -0.08], 16);
// current_lng = "51.5258872476589"
// current_lat = "-0.08416957473754883"


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





clientid = "F2TFZIIG0IVCY4UU3XZPMMK0YG5XKL5LDPSGWO3KRZWUD2GT"
clientsec = "EKTERA4XDUW5M1WLU4NT2V3ARPAQTHL4P1AENIHIZ1ZJHDVJ"


$('#name_auto_complete').keyup(function() {callFoursquareForTypeahead()});


function locate() {
  var current_latlng = [map.getCenter().lat,map.getCenter().lng];
  return String(current_latlng);
};

function callFoursquareForTypeahead() {


    var inputQuery = $('#name_auto_complete').val();
        $('#name_auto_complete').typeahead({
            minLength: 3,
            source: function(query, process) {
                var urlString = "https://api.foursquare.com/v2/venues/suggestCompletion?ll="+locate()+"&client_id=" + clientid +"&client_secret="+clientsec;
                return $.get(urlString, {query: $('#name_auto_complete').val()},
                    function(json) {
                        venueNames = [];
                        $.each(json.response.minivenues, function(index,value) {
                            venueNames.push(value.name + " (" + value.location.address + ")");
                        });
                        return process(venueNames);

                    }
            );
        }
    });
}

map.getCenter().lat


// $('#name_auto_complete').typeahead()


  $("#find_me").click(function() {

map.locate();

  map.on('locationfound', function(e) {
    map.setView(e.latlng, 16);
	});
  $(".hero-unit").hide('fast');
  map.center
});


  $(".close").click(function() {
  	$(".hero-unit").hide('fast');
  });

});

$(document).ready(function() {



  var map = L.mapbox.map('map', 'examples.map-20v6611k').setView([51.5, -0.08], 16);

 //  $.ajax({
	// 	type: "GET",
	// 	url: "/restaurants/",
	// 	data: $(this).serialize(),
	// 	success: function(data){
	// 		$.each(data, function(index, item){
 //    			addMarker(item);
	// 		});
	// 	}
	// });

  $(".diet-filter").submit(function(e){
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/restaurants/",
        data: $(this).serialize(),
        success: function(data){
          $.each(data, function(index, item) {
                addMarker(item);
            });
          }
        });
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
             '<div>' + '</div>' + '</a>' + '<p>' + '</p>' + '<p>' + '<strong>' + 'Lat/Long:' + '</strong>' + " " + feature.geometry.coordinates + '</p>';

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


$('.multiselect').multiselect({
      buttonClass: 'btn',
      buttonWidth: 'auto',
      buttonText: function(options) {
        if (options.length == 0) {
                return 'None selected <b class="caret"></b>';
            }
            else if (options.length > 6) {
                return options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
                options.each(function() {
            selected += $(this).text() + ', ';
                });

          return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
        }
      },
  });

});

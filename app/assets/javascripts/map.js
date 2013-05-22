$(document).ready(function() {
  var map = L.mapbox.map('map', 'examples.map-20v6611k').setView([51.5, -0.08], 16);


  $.ajax({
		type: "GET",
		url: "/restaurants/",
		data: $(this).serialize(),
		success: function(data){
			dataType:'json';
			$.each(data, function(restaurant, item){
    				addMarker(item);
			});
		}
	});


  function addMarker(item) {
		var geoJson = [{
	    type: 'Feature',
	    "geometry": { "type": "Point", "coordinates": [51, 0]},
	    "properties": {
	        "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/3/39/NYC_Top_of_the_Rock_Pano.jpg/640px-NYC_Top_of_the_Rock_Pano.jpg",
	        "url": "http://en.wikipedia.org/wiki/New_York_City",
	        "city": "New York City"
	    }
	}];
	console.log(geoJson);
	map.markerLayer.setGeoJSON(geoJson);
	}




  $("#find_me").click(function() {

map.locate();

  map.on('locationfound', function(e) {
    map.setView(e.latlng, 16);

});






});
});

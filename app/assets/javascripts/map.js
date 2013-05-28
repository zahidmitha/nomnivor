$(document).ready(function() {


  var map = L.mapbox.map('map', 'examples.map-20v6611k').setView([51.5, -0.08], 16);

  // $.ajax({
  //   type: "GET",
  //   url: "/restaurants/",
  //   data: $(this).serialize(),
  //   success: function(data){
  //     $.each(data, function(index, item){
  //       addMarker(item);
  //     });
  //     ;
  //   }

  // });

  $(".diet-filter").submit(function(e){

      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/restaurants/",
        data: $(this).serialize(),
        success: function(data){
            var jsonarray = []
            var markerLayer = L.mapbox.markerLayer(jsonarray).addTo(map);
            $.each(data, function(index, restaurant) {

            // a simple GeoJSON featureset with a single point
            // with no properties
            var geo = markerLayer.setGeoJSON({
                type: "FeatureCollection",
                features: [{type: "Feature",
                    geometry: {
                    type: "Point",
                    coordinates: [restaurant.latitude, restaurant.longitude]
                     },
                properties: { "title": restaurant.name, "description": restaurant.description}}]
            });
             jsonarray.push(geo);
            });

          }
      });

  });


  //   function createGeo(item) {
  // 		var geoJson = {
  // 	    "type": "Feature",
  // 	    "geometry": { "type": "Point", "coordinates": [item.latitude, item.longitude]},
  // 	    "properties": {
  // 	        "title": item.name,
  // 	        "description": item.description
  // 	    }
  // 	 };
  // //    map.markerLayer.setGeoJSON(geoJson);
  // //    // return geoJson;
  // // //popop code goes here

  // }




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

          return selected.substr(0, selected.length -2) + '<b class="caret"></b>';
        }
      },
  });

});
  // map.markerLayer.on('ready', function(e) {
 //    this.eachLayer(function(marker) {
 //        var feature = marker.feature;
 //        // Create custom popup content
 //        var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' +
 //             '<div>' + '</div>' + '</a>' + '<p>' +feature.properties.title + '</p>' + feature.properties.description +'<p>' + '<strong>' + 'Lat/Long:' + '</strong>' + " " + feature.geometry.coordinates + '</p>';

 //        // http://leafletjs.com/reference.html#popup
 //        marker.bindPopup(popupContent,{
 //            closeButton: true,
 //            minWidth: 320
 //        });

 //    });

 //  });

$(document).ready(function() {


  var map = L.mapbox.map('map', 'examples.map-20v6611k').setView([51.5, -0.08], 16);

  $.ajax({
    type: "GET",
    url: "/restaurants/",
    data: $(this).serialize(),
    success: function(data){
      var collection = createGeoJsonCollection(data);
             group.clearLayers();
             group.addData(collection);

      ;}

  });


var group = L.geoJson(null, {
    style: null,
    onEachFeature: function (feature, layer) {
         layer.bindPopup("<p>"+"<strong>"+feature.properties.title+"</strong>"+"</p>" +
                        "<p>"+feature.properties.description+"</p>");
     }
}).addTo(map);




  $(".diet-filter").submit(function(e){
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: "/restaurants/",
        data: $(this).serialize(),
        success: function(data){
          var collection = createGeoJsonCollection(data);
             group.clearLayers();
             group.addData(collection);

          }
      });

  });



  function createGeoJsonCollection(array){
      var json_array = []
      $.each(array, function(index, element){
          var feature = {type: "Feature",
          geometry: {type: "Point", coordinates: [element.latitude, element.longitude]},
          properties: { "title": element.name, "description": element.description}}

          json_array.push(feature);
      });
          return json_array;
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

          return selected.substr(0, selected.length -2) + '<b class="caret"></b>';
        }
      },
  });

});


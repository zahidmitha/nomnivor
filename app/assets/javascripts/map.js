$(document).ready(function() {

  var venues = [];
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

  function addMarker(item) {

    var geoJson = [{
      type: 'Feature',
      "geometry": { "type": "Point", "coordinates": [item.longitude, item.latitude]},
      "properties": {
      "url": "/",
      "title": item.name,
      "description": item.description
      }
    }];
    map.markerLayer.setGeoJSON(geoJson);
    map.markerLayer.on('ready', function(e) {
      this.eachLayer(function(marker) {

        var feature = marker.feature;
        // Create custom popup content
        var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' + '<div>' + feature.properties.name + '</div>' + '</a>' + '<p>' +feature.properties.description + '</p>' + '<p>' + '<strong>' + 'Lat/Long:' + '</strong>' + " " + feature.geometry.coordinates + '</p>';
        // http://leafletjs.com/reference.html#popup
          marker.bindPopup(popupContent,{
            closeButton: true,
            minWidth: 320
          });

      });
    });
  }




  var group = L.geoJson(null, {
    style: null,
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<p>"+"<strong>"+feature.properties.title+"</strong>"+"</p>" + "<p>"+feature.properties.description+"</p>");
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
    json_array = []
    $.each(array, function(index, element){
      var feature = {type: "Feature",
        geometry: {type: "Point", coordinates: [element.latitude, element.longitude]},
        properties: { "title": element.name, "description": element.description}}
        json_array.push(feature);
      });
    return json_array;
  };


  var clientid = "F2TFZIIG0IVCY4UU3XZPMMK0YG5XKL5LDPSGWO3KRZWUD2GT";
  var clientsec = "EKTERA4XDUW5M1WLU4NT2V3ARPAQTHL4P1AENIHIZ1ZJHDVJ";



  $('#name_auto_complete').keyup(function() {callFoursquareForTypeahead()});


  function callFoursquareForTypeahead() {
    $('#name_auto_complete').typeahead({
        minLength: 3,
        source: function(query, process) {
            foursquareQuery(query);
            process(venueNames());
        }
    });
  }

  function venueNames() {
    return _.map(venues, function(venue) { return venue.name + " (" + venue.location.address + ")" });
  }

  function venuesFound(minivenues) {
    venues = minivenues;
  }

  function foursquareQuery(query) {
    var urlString = "https://api.foursquare.com/v2/venues/suggestCompletion?ll="+locate()+"&client_id=" + clientid +"&client_secret="+clientsec;
    $.get(urlString, {query: $('#name_auto_complete').val()}, function(json) {
      venuesFound(json.response.minivenues)
    });
  };


  $("#find_me").click(function() {
    map.locate();
    map.on('locationfound', function(e) {
      map.setView(e.latlng, 16);
  	});
    $(".hero-unit").hide('fast');
    map.center
  });

  function locate() {
    var current_latlng = [map.getCenter().lat,map.getCenter().lng];
    return String(current_latlng);
  };

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
    }
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

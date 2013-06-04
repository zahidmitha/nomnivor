$(document).ready(function() {

  $("#sidebar").hide();

  var venues = [];
  createMap([51.5, -0.08],13);

// create map

  function createMap(ll, zoom) {
    map = L.mapbox.map('map', 'examples.map-20v6611k').setView(ll, zoom);
  }

//create map $$$$ end
// validation of restaurant form

  $('#submit').click(function (e) {
    if (nameValidation() == false ) {
      e.preventDefault();
      alert("Please enter a valid name");
    }
    else if (descriptionValidation() == false) {
      e.preventDefault();
      alert("Please enter a valid description");
    }
    else if (dietValidation() == false) {
      e.preventDefault();
      alert("Please select atleast one diet");
    };
  });

  function nameValidation() {
    if ( ($('#name_auto_complete').val().length) <= 3) {
      return false;
    }
    else if ($.isNumeric($('#latitude-field').val()) == false) {
      return false;
    }
  }

  function descriptionValidation() {
      if ( ($('#description').val().length) <= 6) {
        return false;
      }
    }

  function dietValidation() {
    var boxes = $(':checked');
    if ( boxes.length == 0) {
        return false;
    }
  }

// validation of restaurant form $$$$ end
// add markers and filter them

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

  function createGeoJsonCollection(array){
    json_array = []
    $.each(array, function(index, element){
      var feature = {type: "Feature",
        geometry: {type: "Point", coordinates: [element.longitude, element.latitude]},
        properties: { "title": element.name, "description": element.description, "diets": element.diets}}
        json_array.push(feature);
      });
    return json_array;
  };

  function addMarker(item) {

    var geoJson = [{
      type: 'Feature',
      "geometry": { "type": "Point", "coordinates": [item.latitude, item.longitude]},
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
        var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' + '<div>' + feature.properties.name + '</div>' + '</a>' + '<p>' +feature.properties.description + '</p>' + '<p>' + '<strong>' + 'Lat/Long:' + '</strong>' + " " + feature.geometry.coordinates + '</p>';
        marker.bindPopup(popupContent,{
          closeButton: true,
          minWidth: 320
        });
      });
    });
  }

// add markers and filter them $$$$ end
// show diets

  var group = L.geoJson(null, {
    style: null,
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<p>"+"<strong>"+feature.properties.title+"</strong></p><p>"+feature.properties.description+"</p><p>"+ eachDietName(feature.properties.diets)+"</p>");
    }
  }).addTo(map);

  function eachDietName(diets){
    var dietsString = ''
    $.each(diets, function(index, diet){
         dietsString += diet.name + ', ';
    });
    return dietsString.substring(0, dietsString.lastIndexOf(', '));
  }

  $(".diets-filter").submit(function(e){
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

// show diets $$$$ end
// foursquare venues

  var clientid = "F2TFZIIG0IVCY4UU3XZPMMK0YG5XKL5LDPSGWO3KRZWUD2GT";
  var clientsec = "EKTERA4XDUW5M1WLU4NT2V3ARPAQTHL4P1AENIHIZ1ZJHDVJ";

 $('#name_auto_complete').keyup(function() {callFoursquareForTypeahead();
  });

  $('#name_auto_complete').blur(function() {
    fillLatLng();
  });

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
    return _.map(venues, function(venue) { return displayName(venue) });
  }

  function displayName(venue) {
    return venue.name + " (" + venue.location.address + ")"
  }

  function venuesFound(minivenues) {
    venues = minivenues;
  }

  function foursquareQuery(query) {
    var urlString = "https://api.foursquare.com/v2/venues/suggestCompletion?ll="+current_location()+"&client_id=" + clientid +"&client_secret="+clientsec +"&radius=1000";
    $.get(urlString, {query: $('#name_auto_complete').val()}, function(json) {
      venuesFound(json.response.minivenues)
    });
  };

  function fillLatLng() {
    venueLatLng(venues);
  }

  function venueLatLng(venues) {
    _.each(venues, function(venue){
      if (displayName(venue) == $('#name_auto_complete').val()) {
        $("#latitude-field").val(venue.location.lat);
        $("#longitude-field").val(venue.location.lng);
      };
    })
  }

// foursquare venues $$$$ end
// geolocation for find me

  $(".find_me").click(function() {
    map.locate();
    map.on('locationfound', function(e) {
      map.setView(e.latlng, 15);
    });
    $(".hero-unit").hide('fast');
    $("#sidebar").show('slow');
  });

  function current_location() {
    var current_latlng = [map.getCenter().lat,map.getCenter().lng];
    return String(current_latlng);
  };

// geolocate for me $$$$ end
// close hero unit

  $(".close").click(function() {
    $(".hero-unit").hide('fast');
  });

// close hero unit $$$$ end
// find location finder

  var input = document.getElementById('search_term');
    autocomplete = new google.maps.places.Autocomplete(input);

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
        map.setView([data.latitude, data.longitude], 15);
        $(".hero-unit").hide('fast');
          $("#sidebar").show('slow');

        }
    });
  });

  // location finder $$$$ end
});

$(document).ready(function() {

  var venues = [];

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
    var urlString = "https://api.foursquare.com/v2/venues/suggestCompletion?ll="+locate()+"&client_id=" + clientid +"&client_secret="+clientsec;
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

});
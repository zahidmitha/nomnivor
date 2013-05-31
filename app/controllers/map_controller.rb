class MapController < ApplicationController

#The resturant form is rendered in the home view due to the modal box being on the homepage

  def show
    @restaurant = Restaurant.new
    @diets = Diet.all
  end

end

# function callFoursquareForTypeahead() {
#     var inputQuery = $('#name_auto_complete').val();
#         $('#name_auto_complete').typeahead({
#             minLength: 3,
#             source: function(query, process) {
#                 var urlString = "https://api.foursquare.com/v2/venues/suggestCompletion?ll="+locate()+"&client_id=" + clientid +"&client_secret="+clientsec;
#                 return $.get(urlString, {query: $('#name_auto_complete').val()},
#                     function(json) {
#                         venueNames = [];
#                         $.each(json.response.minivenues, function(index,value) {
#                             venueNames.push(value.name + " (" + value.location.address + ")");
#                         });
#                         return process(venueNames);

#                     }
#             );
#         }
#     });
# }
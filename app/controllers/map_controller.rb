class MapController < ApplicationController

#The resturant form is rendered in the home view due to the modal box being on the homepage

  def show
    @restaurant = Restaurant.new
    @diets = Diet.all
  end

end

# CLIENT_ID = F2TFZIIG0IVCY4UU3XZPMMK0YG5XKL5LDPSGWO3KRZWUD2GT
# CLIENT_SECRET = EKTERA4XDUW5M1WLU4NT2V3ARPAQTHL4P1AENIHIZ1ZJHDVJ

# https://api.foursquare.com/v2/venues/suggestCompletion?near=london&query=foursqu&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD

# https://api.foursquare.com/v2/venues/suggestCompletion?near=london&query=foursqu&client_id=F2TFZIIG0IVCY4UU3XZPMMK0YG5XKL5LDPSGWO3KRZWUD2GT&client_secret=EKTERA4XDUW5M1WLU4NT2V3ARPAQTHL4P1AENIHIZ1ZJHDVJ&v=20130524

# "https://api.foursquare.com/v2/venues/suggestcompletion?ll=" + $('#latitude-field').val() + "," + $('#longitude-field').val() +"&query=" + $('#name_auto_complete').val() +
#                        "&client_id=" + clientid + "&client_secret=" + clientsec;
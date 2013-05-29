class LocationsController < ApplicationController

  def search
    s = Geocoder.search params[:address]
    render :json => {
      "latitude" => s[0].latitude,
      "longitude" => s[0].longitude,
      "address" => s[0].address
    }.to_json
  end

end

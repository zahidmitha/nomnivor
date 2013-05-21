class RestaurantsController < ApplicationController

  def create
    @restaurant = Restaurant.create(params[:restaurant])

    if @restaurant.valid?
      redirect_to root_url
    else
      render :json => { :message => "The information you entered about the restaurant was not correct. Please try again!" }
    end
  end
end

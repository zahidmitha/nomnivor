class RestaurantsController < ApplicationController

  def new
    # @restaurant = Restaurant.new
  end

  def create
    @restaurant = Restaurant.create!(params[:restaurant])
    redirect_to root_url
  end

end
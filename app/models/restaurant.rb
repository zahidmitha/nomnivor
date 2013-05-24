class Restaurant < ActiveRecord::Base

  attr_accessible :name, :longitude, :latitude, :description
  has_and_belongs_to_many :diets

  validates :name, :longitude, :latitude, :description, :presence => true

  validates :longitude, :numericality => { :only_float => true }
  validates :latitude, :numericality => { :only_float => true }

  def self.create_with_diets(restaurant, diets)
    eatery = Restaurant.create(restaurant)
    eatery.diet_ids = diets
    eatery
  end


  def self.find_by_diet_ids(*diet_ids)
    restaurants = []
     Restaurant.all.collect do |restaurant|
      restaurant.diet_ids.include? diet_ids
        restaurants << restaurant
    end
    restaurants
  end
end
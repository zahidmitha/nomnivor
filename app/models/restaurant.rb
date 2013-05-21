class Restaurant < ActiveRecord::Base

  attr_accessible :name, :longitude, :latitude, :description
  has_and_belongs_to_many :diets

  validates :name, :longitude, :latitude, :description, :presence => true

  validates :longitude, :numericality => { :only_float => true }
  validates :latitude, :numericality => { :only_float => true }


  def self.create_with_diets(args, args2)
   restaurant = Restaurant.create(args)
   p diet = Diet.find(args2)
   restaurant.diets << diet
   restaurant
  end
end
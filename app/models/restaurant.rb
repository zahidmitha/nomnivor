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
    Restaurant.joins(:diets).where("diets.id IN (#{diet_ids.join(',')})")
  end
end

# eqivalent SQL for above AR method
# SELECT "restaurants".* FROM "restaurants" INNER JOIN "diets_restaurants" ON "diets_restaurants"."restaurant_id" = "restaurants"."id" INNER JOIN "diets" ON "diets"."id" = "diets_restaurants"."diet_id" WHERE (diets.id IN (1,2,3))
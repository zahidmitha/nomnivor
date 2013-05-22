class AddIndexToRestaurantsDiets < ActiveRecord::Migration
  def change
    add_index :diets_restaurants, [:restaurant_id, :diet_id]
  end
end

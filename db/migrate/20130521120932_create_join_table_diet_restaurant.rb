class CreateJoinTableDietRestaurant < ActiveRecord::Migration
  def change
    create_table :diets_restaurants do |t|
      t.references :diet
      t.references :restaurant
    end
  end
end

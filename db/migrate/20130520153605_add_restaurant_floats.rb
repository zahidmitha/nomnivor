class AddRestaurantFloats < ActiveRecord::Migration
  def change
    change_column :restaurants, :longitude, :float
    change_column :restaurants, :latitude, :float
  end

end

class AddFloatstoRestaurants < ActiveRecord::Migration
  def change
    change_column :restaurants, :longitude, :integer
    change_column :restaurants, :latitude, :integer
  end

end

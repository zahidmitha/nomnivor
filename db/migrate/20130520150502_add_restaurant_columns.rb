class AddRestaurantColumns < ActiveRecord::Migration
  def change
    add_column :restaurants, :name, :string
    add_column :restaurants, :description, :string
    add_column :restaurants, :longitude, :integer
    add_column :restaurants, :latitude, :integer
  end
end

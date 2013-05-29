class AddColumnstoLocationSearch < ActiveRecord::Migration

  def change
    add_column :location_searches, :address, :string
    add_column :location_searches, :longitude, :float
    add_column :location_searches, :latitude, :float

  end

end

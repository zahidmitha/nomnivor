class CreateLocationSearches < ActiveRecord::Migration
  def change
    create_table :location_searches do |t|

      t.timestamps
    end
  end
end

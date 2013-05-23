class CreateInitialDiets < ActiveRecord::Migration
  def up
    Diet.create(:name => "Vegetarian")
    Diet.create(:name => "Vegan")
    Diet.create(:name => "Halal")
    Diet.create(:name => "Kosher")
    Diet.create(:name => "Pescatarian")
    Diet.create(:name => "Nut-free")
    Diet.create(:name => "Dairy-free")
    Diet.create(:name => "Carb-free")
    Diet.create(:name => "Paleo")
  end

  def down
    Diet.delete_all
  end
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Diet.create(:name => "Vegetarian")
Diet.create(:name => "Vegan")
Diet.create(:name => "Halal")
Diet.create(:name => "Kosher")
Diet.create(:name => "Pescatarian")
Diet.create(:name => "Nut-free")
Diet.create(:name => "Dairy-free")
Diet.create(:name => "Carb-free")
Diet.create(:name => "Paleo")
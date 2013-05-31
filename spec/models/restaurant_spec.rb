require 'spec_helper'

describe Restaurant do

  let(:restaurant) {Restaurant.new(:name => "Dorsia", :longitude => "51.5171", :latitude => "-0.1062", :description => "Four year waiting list to get in line for a table." )}

  let(:valid) {{:name => "Dorsia", :longitude => "51.5171", :latitude => "-0.1062", :description => "Four year waiting list to get in line for a table."}}

  let(:valid2) {{:name => "CrazyBurger", :longitude => "51.5171", :latitude => "-0.1062", :description => "Now serving the macHorse meal"}}


  it 'has a name' do
    restaurant.name.should eq "Dorsia"
  end

  it 'has a longitude' do
    restaurant.longitude.should eq 51.5171
  end

  it 'has a latitude' do
    restaurant.latitude.should eq -0.1062
  end

  it 'has a description' do
    restaurant.description.should eq "Four year waiting list to get in line for a table."
  end

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:longitude) }
  it { should validate_presence_of(:latitude) }
  it { should validate_presence_of(:description) }
  it { should validate_numericality_of :longitude}
  it { should validate_numericality_of :latitude}

  context "latitude/longitude" do
    it 'converts an integer into a float' do
      restaurant = Restaurant.new(:longitude => 1)
      restaurant.longitude.should eq 1.0
    end

    it "validates negative numbers for longitude" do
      restaurant.longitude = -1.56
      restaurant.latitude = -2.345
      restaurant.should be_valid
    end
  end

  it { should have_and_belong_to_many(:diets) }

  it 'adds that diet to the list of diets' do
    diet = Diet.create(name: "Halal")
    rest = Restaurant.create_with_diets(valid, [diet.id])
    rest.diets.should include(diet)
  end
  context 'given several diet ids' do
    it 'returns all restaurants associated' do
      diet = Diet.create(name: "Halal")
      diet1 = Diet.create(name: "Kosher")
      rest = Restaurant.create_with_diets(valid, [diet.id])
      rest1 = Restaurant.create_with_diets(valid, [diet.id, diet1.id])
      Restaurant.find_by_diet_ids(diet.id, diet1.id).should include(rest,rest1)
    end
    it 'doesn\t return restaurants that are not associated' do
      rest = restaurant.save
      diet = Diet.create(name: "Halal")
      Restaurant.find_by_diet_ids(diet.id).should_not include(rest)
    end

  end
end


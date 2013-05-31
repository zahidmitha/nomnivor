require 'spec_helper'

describe Diet do
  let(:diet) {Diet.create(name: "halal")}

  let(:restaurant) {Restaurant.new(:name => "Dorsia", :longitude => "51.5171", :latitude => "-0.1062", :description => "Four year waiting list to get in line for a table." )}

  context '.new' do
    it 'should have a name' do
      diet.name.should eq "halal"
    end
    it { should validate_presence_of(:name) }
    it { should have_and_belong_to_many(:restaurants) }
  end
end

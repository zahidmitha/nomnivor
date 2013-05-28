require 'spec_helper'

describe LocationSearch do

    let(:location) {LocationSearch.create(:address => "200 Commercial Road, London")}

   it 'has a longitude' do
    location.longitude.should eq -0.0324728
  end

  it 'has a latitude' do
    location.latitude.should eq 51.512434
  end

end

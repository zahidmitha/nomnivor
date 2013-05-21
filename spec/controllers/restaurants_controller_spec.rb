require 'spec_helper'

describe RestaurantsController do

  let(:restaurant) {{ :restaurant => {:name => "Ruben's Sandwich", :description => "best jewish sandwich in town", :latitude => 51.534048, :longitude => -0.071984} }}

  let(:invalid_restaurant) {{:restaurant => {:name => "Ruben's Sandwich"} }}

  context "POST create" do
    context "valid attributes" do

      it "creates a new restaurant" do
        expect { post :create, restaurant }.to change(Restaurant, :count).by(1)
        response.should redirect_to(root_path)
      end
    end

    context "with invalid attributes" do
      it "doesn't create a new user" do
        post :create , invalid_restaurant
        assigns(:restaurant).should_not be_persisted
        response.body.should eq '{"message":"The information you entered about the restaurant was not correct. Please try again!"}'
      end
    end
    context 'with a diet selected' do
    end
  end
end

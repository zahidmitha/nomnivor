require 'spec_helper'

describe RestaurantsController do

  let(:diet) { Diet.create(name: "Halal") }
  let(:restaurant) {{ :restaurant => {:name => "Ruben's Sandwich", :description => "best jewish sandwich in town", :latitude => 51.534048, :longitude => -0.071984},:diets => [diet.id] }}

  let(:invalid_restaurant) {{:restaurant => {:name => "Ruben's Sandwich"},:diets => [diet.id]  }}

  context "POST create" do
    context "valid attributes" do

      it "creates a new restaurant" do
        expect { post :create, restaurant }.to change(Restaurant, :count).by(1)
        response.should redirect_to(root_path)
      end
      it "has a diet" do
        post :create, restaurant
       p assigns(:restaurant).diets.should include(diet)
      end
    end

    context "with invalid attributes" do
      it "doesn't create a new user" do
        post :create , invalid_restaurant
        assigns(:restaurant).should_not be_persisted
        response.body.should eq '{"message":"The information you entered about the restaurant was not correct. Please try again!"}'
      end
    end
  end
end

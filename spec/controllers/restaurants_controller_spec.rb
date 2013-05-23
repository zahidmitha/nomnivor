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
        assigns(:restaurant).diets.should include(diet)
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

  context "GET index" do

    it 'gets all the restaurants on the map' do
      r1 = Restaurant.create({:name => "Ruben's Sandwich", :description => "best jewish sandwich in town", :latitude => 51.534048, :longitude => -0.071984 })
      r2 = Restaurant.create({:name => "L. Ron Hubbard's Culturally Sensitive Cafe", :description => "We embrace all faiths...except Buddhists, Christians, Muslims, Jews and Hindus.", :latitude => 51.534048, :longitude => -0.071984 })
      r3 = Restaurant.create({:name => "Leonidas' Spartan Bar", :description => "THIS. IS..a Greek delicacy.", :latitude => 51.534048, :longitude => -0.071984 })
      get :index
      response.body.should eq [r1, r2, r3].to_json

    end

  end

end

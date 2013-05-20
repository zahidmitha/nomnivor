require 'spec_helper'

describe RestaurantsController do

  let(:restaurant) { {:restaurant => {:name => "Ruben's Sandwich", :description => "best jewish sandwich in town", :latitude =>
  51.534048, :longitude => -0.071984 }} }

  # let(:invalid_user_hash) { {:user => {:name => "Blah", :age => 24}}}

  context "GET new" do
    it "renders the new restaurant form" do
      get :new
      response.should render_template(:new)
    end
  end

  context "POST create" do
    context "valid attributes" do

      it "creates a new restaurant" do
        expect {post :create, restaurant}.to change(Restaurant, :count).by(1)
      end

      #     it "returns a successful response" do
      #       post :create, user_hash
      #       parsed_response.should eq post_success
      #       response.status.should eq 200
      #     end
    end

    #   context "invalid attributes" do

    #     let(:post_fail) { {"message" => "There were some errors in your form", "errors" => {"email" => ["can't be blank"]}} }

    #     it "responds with a json error" do
    #       post :create, invalid_user_hash

    #       parsed_response.should eq post_fail
    #       response.status.should eq 422
    #     end
    #   end
    # end

    # def parsed_response
    #   JSON.parse(response.body)
    # end
  end
end

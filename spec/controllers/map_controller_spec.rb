require 'spec_helper'

describe MapController do
  context "show" do
    it "renders the new restaurant form" do
      get :show
      response.should render_template(:show)
    end
  end
end

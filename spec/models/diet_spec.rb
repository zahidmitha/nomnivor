require 'spec_helper'

describe Diet do
  let(:diet) {Diet.create(name: "halal")}
  context '#new' do
    it 'should have a name' do
      diet.name.should eq "halal"
    end
    it { should validate_presence_of(:name) }
    it { should have_and_belong_to_many(:restaurants) }
  end
end

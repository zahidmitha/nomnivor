class Restaurant < ActiveRecord::Base

  attr_accessible :name, :longitude, :latitude, :description

  validates :name, :longitude, :latitude, :description, :presence => true

  validates :longitude, :numericality => { :only_float => true }
  validates :latitude, :numericality => { :only_float => true }


end
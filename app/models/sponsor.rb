class Sponsor < ApplicationRecord
    has_many :sponsorships
    has_many :sponsees, through: :sponsorships
    validates :first_name, presence: true
    validates :last_name, presence: true
end

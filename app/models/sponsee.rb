class Sponsee < ApplicationRecord
    has_many :sponsorships
    has_many :sponsors, through: :sponsorships
    validates :first_name, presence: true
    validates :last_name, presence: true
end

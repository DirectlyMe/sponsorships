class Service < ApplicationRecord
    has_many :sponsor_services
    has_many :sponsors, through: :sponsor_services
end

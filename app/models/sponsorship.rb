class Sponsorship < ApplicationRecord
    belongs_to :sponsor, class_name: 'Sponsor', foreign_key: :sponsee_id
    belongs_to :sponsee, class_name: 'Sponsee', foreign_key: :sponsor_id
    has_many :agreed_services
end

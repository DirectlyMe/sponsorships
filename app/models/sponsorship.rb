class Sponsorship < ApplicationRecord
    belongs_to :sponsor, class_name: 'User', foreign_key: :sponsee_id
    belongs_to :sponsee, class_name: 'User', foreign_key: :sponsor_id
    has_many :agreed_services
end

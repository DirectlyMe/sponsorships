class Assistance < ApplicationRecord
    has_many :needs
    has_many :users, through: :needs
    has_many :services
    has_many :users, through: :services
    has_many :agreed_services
end

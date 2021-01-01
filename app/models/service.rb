class Service < ApplicationRecord
    has_one :user
    has_one :assistance
end

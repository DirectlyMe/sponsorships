class Need < ApplicationRecord
    has_one :user
    has_one :assistance
end

class SponsorService < ApplicationRecord
    belongs_to :sponsors
    belongs_to :services
end

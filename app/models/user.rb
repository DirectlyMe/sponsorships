class User < ApplicationRecord
    has_one :user_type
    has_many :services
    has_many :needs
    has_many :assistances, through: :services
    has_many :assistances, through: :needs
    has_many :sponsorships

    has_secure_password
    validates :username, :email, uniqueness: true

    scope :admin, -> { joins('INNER JOIN user_types ON user_types.id = users.user_types_id').where('user_types.name = \'admin\'') }
    scope :sponsor, -> { joins('INNER JOIN user_types ON user_types.id = users.user_types_id').where('user_types.name = \'sponsor\'') }
    scope :sponsee, -> { joins('INNER JOIN user_types ON user_types.id = users.user_types_id').where('user_types.name = \'sponsee\'') }

    def sponsees
        raise "User #{id} is not a Sponsor" unless UserType.find_by_id(user_types_id).name == 'sponsor'

        User.select('sponsees.first_name, sponsees.last_name, sponsees.email')
            .joins('INNER JOIN sponsorships s on users.id = s.sponsor_id')
            .joins('INNER JOIN users sponsees on s.sponsee_id = sponsees.id')
            .where(id: id)
    end

    def sponsors
        raise "User #{id} is not a Sponsee" unless UserType.find_by_id(user_types_id).name == 'sponsee'

        User.select('sponsors.*')
            .joins('INNER JOIN sponsorships s on users.id = s.sponsor_id')
            .joins('INNER JOIN users sponsors on s.sponsor_id = sponsors.id')
            .where(id: id)
    end
end

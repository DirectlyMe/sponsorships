class User < ApplicationRecord
    has_one :user_type
    has_one :organization
    has_many :services
    has_many :needs
    has_many :assistances, through: :services
    has_many :assistances, through: :needs
    has_many :sponsorships
    has_many :handler_relations

    has_secure_password
    validates :username, :email, uniqueness: true

    scope :admin, -> { joins('INNER JOIN user_types ON user_types.id = users.user_types_id').where('user_types.name = \'admin\'') }
    scope :handler, -> { joins('INNER JOIN user_types ON user_types.id = users.user_types_id').where('user_types.name = \'handler\'') }
    scope :sponsor, -> { joins('INNER JOIN user_types ON user_types.id = users.user_types_id').where('user_types.name = \'sponsor\'') }
    scope :sponsee, -> { joins('INNER JOIN user_types ON user_types.id = users.user_types_id').where('user_types.name = \'sponsee\'') }

    # Get a list of sponsees associated with the user, this will vary the type of user
    def sponsees
        case UserType.find_by_id(user_types_id).name
        when 'sponsor'
            User.select('sponsees.first_name, sponsees.last_name, sponsees.email')
                .joins('INNER JOIN sponsorships s on users.id = s.sponsor_id')
                .joins('INNER JOIN users sponsees on s.sponsee_id = sponsees.id')
                .where(id: id)
        when 'handler'
            User.select('sponsees.first_name, sponsees.last_name, sponsees.email')
                .joins('INNER JOIN handler_relations s on users.id = s.handler_id')
                .joins('INNER JOIN users sponsees on s.sponsee_id = sponsees.id')
                .where(id: id)
        else
            raise "User #{id} is not a Sponsor or a Handler"
        end
    end

    # get the sponsors associated with a sponsee
    def sponsors
        raise "User #{id} is not a Sponsee" unless UserType.find_by_id(user_types_id).name == 'sponsee'

        User.select('sponsors.*')
            .joins('INNER JOIN sponsorships s on users.id = s.sponsor_id')
            .joins('INNER JOIN users sponsors on s.sponsor_id = sponsors.id')
            .where(id: id)
    end

    # get the handlers associated with a Sponsee
    def handlers
        raise "User #{id} is not a Sponsee" unless UserType.find_by_id(user_types_id).name == 'sponsee'

        User.select('handlers.*')
            .joins('INNER JOIN handler_relations s on users.id = s.sponsee_id')
            .joins('INNER JOIN users handlers on s.handler_id = sponsors.id')
            .where(id: id)
    end
end

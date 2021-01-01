module UserRoles
    extend ActiveSupport::Concern

    ADMIN_CONSOLE_ROLES = %w[admin handler].freeze
end

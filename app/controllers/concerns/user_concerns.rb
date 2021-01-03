module UserConcerns
    extend ActiveSupport::Concern

    ADMIN_CONSOLE_ROLES = %w[admin handler].freeze
    CREATION_STATUSES = { draft: 'draft', created: 'created' }.freeze
end

class HandlerRelation < ApplicationRecord
    belongs_to :handler, class_name: 'User', foreign_key: :sponsee_id
    belongs_to :sponsee, class_name: 'User', foreign_key: :handler_id
end

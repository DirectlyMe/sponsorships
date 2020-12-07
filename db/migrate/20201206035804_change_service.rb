class ChangeService < ActiveRecord::Migration[6.0]
    def change
        change_table :services do |t|
            t.remove :name
            t.references :sponsor, null: false, foreign_key: { to_table: :users }
            t.references :assistances, null: false, foreign_key: true
        end
    end
end

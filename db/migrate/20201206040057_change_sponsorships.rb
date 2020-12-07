class ChangeSponsorships < ActiveRecord::Migration[6.0]
    def change
        change_table :sponsorships do |t|
            t.remove :sponsor_id, :sponsee_id
            t.references :sponsor, null: false, foreign_key: { to_table: :users }
            t.references :sponsee, null: false, foreign_key: { to_table: :users }
        end
    end
end

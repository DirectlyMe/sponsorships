class CreateNeeds < ActiveRecord::Migration[6.0]
    def change
        create_table :needs do |t|
            t.references :sponsee, null: false, foreign_key: { to_table: :users }
            t.references :assistances, null: false, foreign_key: true
            t.string :notes
            t.timestamps
        end
    end
end

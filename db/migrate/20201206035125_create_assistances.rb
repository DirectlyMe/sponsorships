class CreateAssistances < ActiveRecord::Migration[6.0]
    def change
        create_table :assistances do |t|
            t.string :name
            t.timestamps
        end
    end
end

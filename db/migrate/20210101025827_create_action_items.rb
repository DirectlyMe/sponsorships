class CreateActionItems < ActiveRecord::Migration[6.0]
    def change
        create_table :action_items do |t|
            t.references :user
            t.string :subject
            t.jsonb :detail
            t.boolean :complete
            t.timestamps
        end
    end
end

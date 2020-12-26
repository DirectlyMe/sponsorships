class CreateOrganizations < ActiveRecord::Migration[6.0]
    def change
        create_table :organizations do |t|
            t.string :name
            t.timestamps
        end

        change_table :users do |t|
            t.references :organization
        end
    end
end

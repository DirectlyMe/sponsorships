class AddUserCreationStatus < ActiveRecord::Migration[6.0]
    def change
        change_table :users do |t|
            t.string :creation_status
        end
    end
end

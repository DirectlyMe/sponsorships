class AddUserTypeToUsers < ActiveRecord::Migration[6.0]
  def change
    change_table :users do |t|
      t.references :user_types, null: false, foreign_key: true
      t.string :first_name
      t.string :last_name
    end
  end
end

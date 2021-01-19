class UpdateUserFields < ActiveRecord::Migration[6.0]
  def change
    change_table :users do |t|
      t.bigint :phone
      t.string :employee_id
      t.string :description
    end
  end
end

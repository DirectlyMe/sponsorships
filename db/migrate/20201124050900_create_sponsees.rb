class CreateSponsees < ActiveRecord::Migration[6.0]
  def change
    create_table :sponsees do |t|
      t.column :first_name, :string
      t.column :last_name, :string
      t.timestamps
    end
  end
end

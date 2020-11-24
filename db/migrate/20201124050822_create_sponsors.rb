class CreateSponsors < ActiveRecord::Migration[6.0]
  def change
    create_table :sponsors do |t|
      t.column :first_name, :string
      t.column :last_name, :string
      t.timestamps
    end
  end
end

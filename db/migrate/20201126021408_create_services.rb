class CreateServices < ActiveRecord::Migration[6.0]
  def change
    create_table :services do |t|
      t.column :name, :string
      t.timestamps
    end
  end
end

class CreateHandlerRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :handler_relations do |t|
      t.references :handler, null: false, foreign_key: { to_table: :users }
      t.references :sponsee, null: false, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end

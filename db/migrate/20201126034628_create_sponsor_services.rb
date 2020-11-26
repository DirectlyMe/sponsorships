class CreateSponsorServices < ActiveRecord::Migration[6.0]
  def change
    create_table :sponsor_services do |t|
      t.references :sponsor, null: false, foreign_key: true
      t.references :service, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end

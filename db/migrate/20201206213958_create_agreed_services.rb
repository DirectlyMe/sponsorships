class CreateAgreedServices < ActiveRecord::Migration[6.0]
  def change
    create_table :agreed_services do |t|
      t.references :sponsorships, null: false, foreign_key: true
      t.references :assistances, null: false, foreign_key: true
      t.string :notes
      t.timestamps
    end

    change_table :services do |t|
      t.string :notes
    end
  end
end

class CreateSponsorships < ActiveRecord::Migration[6.0]
  def change
    create_table :sponsorships do |t|
      t.references :sponsor, null: false, foreign_key: true
      t.references :sponsee, null: false, foreign_key: true

      t.timestamps
    end
  end
end

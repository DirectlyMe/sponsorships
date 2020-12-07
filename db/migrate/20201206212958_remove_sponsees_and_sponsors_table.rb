class RemoveSponseesAndSponsorsTable < ActiveRecord::Migration[6.0]
  def change  
    remove_foreign_key "sponsor_services", "services"
    remove_foreign_key "sponsor_services", "sponsors"
    drop_table :sponsors
    drop_table :sponsees
  end
end

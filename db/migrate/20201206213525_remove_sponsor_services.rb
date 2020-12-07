class RemoveSponsorServices < ActiveRecord::Migration[6.0]
  def change
    drop_table :sponsor_services
  end
end

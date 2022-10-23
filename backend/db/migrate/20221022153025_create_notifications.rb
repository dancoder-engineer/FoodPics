class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.string :content
      t.string :read
      t.integer :user_id
      t.integer :whichpost
      t.timestamps
    end
  end
end

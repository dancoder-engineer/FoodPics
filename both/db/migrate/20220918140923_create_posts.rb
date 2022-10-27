class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.text :title
      t.string :place
      t.text :description
      t.text :captions
      t.integer :user_id
      t.timestamps
    end
  end
end

=begin


  BT	User
    Title
  HM	MainPictures
    Place ("made" if its a recipe, or restaurant name if not)
  HO	Recipe (just null if its restaurant)



=end

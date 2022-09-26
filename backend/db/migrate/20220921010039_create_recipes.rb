class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :ingredientlist
      t.text :guide
      t.integer :post_id
      t.timestamps
    end
  end
end

class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :ingredientlist
      t.text :guide
      t.timestamps
    end
  end
end

class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :ingredientlist, :guide, :post_id

  belongs_to :post
end

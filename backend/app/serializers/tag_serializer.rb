class TagSerializer < ActiveModel::Serializer
  attributes :id, :tag

  has_many :posts, through: :posttags
end

class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :place, :description, :user_id, :captions

  belongs_to :user
  has_one :recipe
end

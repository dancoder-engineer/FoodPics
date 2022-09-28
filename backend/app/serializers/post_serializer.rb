class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :place, :description, :user_id, :captions, :recipe

  belongs_to :user
  has_one :recipe


end

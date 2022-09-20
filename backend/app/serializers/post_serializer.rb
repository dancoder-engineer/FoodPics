class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :place, :description, :user_id

  belongs_to :user
end

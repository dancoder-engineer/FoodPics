class MessageSerializer < ActiveModel::Serializer
  attributes :id, :sender, :recipient, :content
end

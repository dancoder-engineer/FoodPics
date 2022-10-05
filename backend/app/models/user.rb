class User < ApplicationRecord
    has_secure_password

    has_many :posts
    has_one_attached :avatar

    validates :UserName, format: { with: /\A[a-zA-Z0-9]+\Z/ }
    validates :UserName, :ActualName, :Description, :Pronouns, :Website, :avatar, presence: true
end

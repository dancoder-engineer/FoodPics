class User < ApplicationRecord
    has_secure_password

    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :notifications, dependent: :destroy
    has_one_attached :avatar, dependent: :destroy
    
    validates :UserName, format: { with: /\A[a-zA-Z0-9]+\Z/ }
    validates :UserName, uniqueness: true
    validates :UserName, :ActualName, :Description, :Pronouns, :Website, presence: true
    #validates :UserName, :ActualName, :Description, :Pronouns, :Website, :avatar, presence: true
end

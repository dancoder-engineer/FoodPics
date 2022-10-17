class Post < ApplicationRecord

    belongs_to :user
    has_one :recipe, dependent: :destroy
    has_many :comments, dependent: :destroy
    
    has_many_attached :pics, dependent: :destroy

    validates :title, :description, :place, :pics, presence: true

    # def pic_urls
    #     pics.map{|p| Rails.application.routes.url_helpers.url_for(p) }
    # end
    
end

class Post < ApplicationRecord

    belongs_to :user
    has_one :recipe
    has_many :comments
    
    has_many_attached :pics

    validates :title, :description, :place, :pics, presence: true

    def pic_urls
        pics.map{|p| Rails.application.routes.url_helpers.url_for(p) }
    end
    

end

class Post < ApplicationRecord

    belongs_to :user
    has_one :recipe
    
    has_many_attached :pics

    def pic_urls
        pics.map{|p| Rails.application.routes.url_helpers.url_for(p) }
    end
    

end

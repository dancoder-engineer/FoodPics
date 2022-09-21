class Recipe < ApplicationRecord
    belongs_to :post
    has_many_attached :pics
end

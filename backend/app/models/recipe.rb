class Recipe < ApplicationRecord
    belongs_to :post
    has_one_attached :pic
end

class RecipesController < ApplicationController

  #  skip_before_action :verify_authenticity_token

    def index
        recipes=Recipe.all
        render json: recipes, status: 200
    end

    def show
        recipe = Recipe.find_by(id: params[:id])
        pic = rails_blob_path(recipe.pic)
        render json: ({recipe: recipe, pic: pic}), status: 200
    end

    def recipepic
        recipe = Recipe.find_by(id: params[:id])
        pic = rails_blob_path(recipe.pic)
        render json: ({pic: pic}), status: 200
    end

    def create
        if !session[:user_id]
            return render json:{error: 'Not logged in.'}, status: :forbidden
        end

        recipe=Recipe.create(allowed)

        if recipe.save
            render json: recipe, status: :created
        else
            render json: {error: "Invalid eecipe."}
        end
    end


    private

    def allowed
        params.require(:recipe).permit(:title, :ingredientlist, :guide, :post_id, :pic)
    end
end

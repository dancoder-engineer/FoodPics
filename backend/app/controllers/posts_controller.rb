class PostsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        posts = Post.all
        render json: posts, status: 200
    end

    def show
        post = Post.find_by(id: params[:id])
        pics = post.pics.map{|p| rails_blob_path(p) }
        recipepic = rails_blob_path(post.recipe.pic)
        render json: ({post: post, recipe: post.recipe, pics: pics, recipepic: recipepic}), status: 200
    end

    def create
        post = Post.create(allowed)

 

        if post.save
            render json: post, status: :created
        else
            render json: {error: "Faild!", post: post}
        end
    end


    private

    def allowed
        params.require(:post).permit(:title, :place, :description, :user_id, :captions, pics: [])
    end
end

class PostsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        posts = Post.all
        render json: posts, status: 200
    end

    def show
        post = Post.find_by(id: params[:id])
        pic1 = rails_blob_path(post.pics[0])
        pic2 = rails_blob_path(post.pics[1])
        render json: ({post: post, pic1: pic1, pic2: pic2}), status: 200
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
        params.require(:post).permit(:title, :place, :description, :user_id, pics: [])
    end
end

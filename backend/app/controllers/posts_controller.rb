class PostsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        posts = Post.all
        render json: posts, status: 200
    end

    def show
        post = Post.find_by(id: params[:id])
        pics = post.pics.map{|p| rails_blob_path(p) }
        if post.recipe
            recipepic = rails_blob_path(post.recipe.pic)
            render json: ({post: post, recipe: post.recipe, pics: pics, recipepic: recipepic}), status: 200
        else
            render json: ({post: post, pics: pics}), status: 200
        end
    end

    def userposts
        posts = Post.where(user_id: params[:id])
        postnums = posts.map {|i| i.id }
        postsWithInfo = posts.map{|i| {
                post: i,
                recipe: i.recipe,
                recipepic: i.recipe ? rails_blob_path(i.recipe.pic) : nil,
                pics: i.pics.map{|p| rails_blob_path(p) }
        }}
        sortedPosts = postsWithInfo.sort{|i| i[:post][:created_at]}
      #  sortedPosts = sortedPosts.reverse
        render json: {posts: sortedPosts}, status: 200
    end

    def create
        post = Post.create(allowed)


        if post.save
            render json: post, status: :created
        else
            render json: {error: "Faild!", post: post}
        end
    end

    def destroy
        post = Post.find_by(id: params[:id])
        post.destroy     
        return render json: {message: "It is done."}
    end


    private

    def allowed
        params.require(:post).permit(:title, :place, :description, :user_id, :captions, pics: [])
    end
end

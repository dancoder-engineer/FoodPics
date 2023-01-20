class PostsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        posts = Post.all
        render json: posts, status: 200
    end

    def show
        post = Post.find_by(id: params[:id])
        pics = post.pics.map{|p| rails_blob_path(p) }
        tags = post.tags ? tagnames(post.tags) : []
        if post.recipe
            recipepic = rails_blob_path(post.recipe.pic)
            render json: ({post: post, recipe: post.recipe, pics: pics, recipepic: recipepic}), status: 200
        else
            render json: ({post: post, pics: pics, tags: tags}), status: 200
        end
    end

    def userposts
        posts = Post.where(user_id: params[:id])
        postnums = posts.map {|i| i.id }
        postsWithInfo = posts.map{|i| {
                post: i,
                recipe: i.recipe,
                recipepic: i.recipe ? rails_blob_path(i.recipe.pic) : nil,
                pics: i.pics.map{|p| rails_blob_path(p) },
                tags: i.tags ? tagnames(i.tags) : []
        }}
        sortedPosts = postsWithInfo.sort{|i| i[:post][:created_at]}
        
      howmanyfollowers = Following.where(followee: params[:id])
      howmanyfollowees = Following.where(follower: params[:id])
      follow = {
        followers: howmanyfollowers.length,
        followees: howmanyfollowees.length
      }
        render json: {posts: sortedPosts, follow: follow}, status: 200
    end

    def create
        
        if !session[:user_id]
            return render json:{error: 'Not logged in.'}, status: :forbidden
        end

        post = Post.create!(allowed)

        return if post.save
            render json: post, status: :created
        else
            render json: {error: "Faild!", post: post}
        end

    rescue ActiveRecord::RecordInvalid => invalid
        return render json: { errors: invalid.record.errors.full_messages  }, status: :unprocessable_entity

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

    def tagnames(tags)
        tags.map{|i| i.tag}
    end
end

class CommentsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        comments = Comment.all
        render json: comments
    end

    def bypost
        comments = Comment.where(post_id: params[:id])
        if comments[0]
            render json: comments
        else
            render json: ({error: "No posts."})
        end
    end

    def create
        if !session[:user_id]
            return render json({error: "Not logged in."})
        end
        comment = Comment.create(allowed)
        if comment.save
            return render json: comment, status: :created
        else
            render json({error: "Not created."})
        end
    end

    private

    def allowed
        params.permit(:post_id, :user_id, :content)
    end
end

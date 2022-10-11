class CommentsController < ApplicationController

    def bypost
        comments = Comment.where(post_id: params[:id])
        if comments[0]
            render json: comments
        else
            render json: ({error: "No posts."})
        end
    end
end

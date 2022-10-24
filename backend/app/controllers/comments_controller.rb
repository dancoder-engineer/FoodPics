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
            commentnotifications(comment[:post_id])
            return render json: comment, status: :created
        else
            render json({error: "Not created."})
        end
    end

    private

    def commentnotifications(postid)

        post = Post.find_by(id: postid)

        comments = Comment.where(post_id: postid)
        commenters = comments.map{|i| post.user_id == i.user_id ? nil : i.user_id}
        commenters = commenters.uniq.compact

        commenters.each {|i|
            if i != session[:user_id]
                Notification.create({
                    whichpost: post.id,
                    user_id: i,
                    read: "unread",
                    content: "There's a new comment on a post you commented on."
                })
            end
        }

        Notification.create({
            whichpost: post.id,
            user_id: post.user_id,
            read: "unread",
            content: "There's a new comment on one of your posts."
        })

    end

    def allowed
        params.permit(:post_id, :user_id, :content)
    end
end

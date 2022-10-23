class NotificationsController < ApplicationController

    def commentnotifications
        testnotifications = []
        post = Post.find_by(id: params[:id])

        if !post
            return render json: {error: "No such post."}
        end

        comments = Comment.where(post_id: params[:id])
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

        render json: {status: "Success"}
    end

    def messagenotification

        message = Message.find_by(id: params[:id])

        if !message
            return render json: {error: "No such message."}
        end

        Notification.create({
            whichpost: 0,
            user_id: message.recipient,
            read: "unread",
            content: "You have a new message."
        })

        render json: {status: "Success"}

        
    end
end

class FollowingsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        followings = Following.all
        render json: followings, status: 200
    end

    def newFollowing
        if session[:user_id]
            following = Following.create({
                follower: session[:user_id],
                followee: params[:followee]
            })
        else
            return render json:{error: 'Not logged in.'}, status: :forbidden
        end
    end

    def deleteFollowing
        following = Following.where(follower: session[:user_id], followee: params[:followee])
        if following
            following.each{|i| i.destroy }
            return render json:{done: "It is done."}
        else
            return render json:{error: "User not found."}
        end
    end

    def checkFollowing
        following = Following.where(follower: session[:user_id], followee: params[:followee])
        render json: following, status: 200
    end

end

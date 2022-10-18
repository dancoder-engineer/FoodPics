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
        if !session[:user_id]
            return render json:{error: 'Not logged in.'}, status: :forbidden
        end
        following = Following.where(follower: session[:user_id], followee: params[:followee])
        if following
            following.each{|i| i.destroy }
            return render json:{done: "It is done."}
        else
            return render json:{error: "User not found."}
        end
    end

    def checkFollowing
        if !session[:user_id]
            return render json:{error: 'Not logged in.'}, status: :forbidden
        end
        following = Following.where(follower: session[:user_id], followee: params[:followee])
        render json: following, status: 200
    end

    
    def makefeed
        if !session[:user_id]
            return render json: {error: "not logged in"}
        end
        #gather all followings where the current user is the follower into an array
        followings = Following.where(follower: session[:user_id])
        #make an array out of only the followees
        followedUsers = followings.map{|i| i.followee}
        #for each of these, gather all the posts (in reality, we'd do only in the past week)
        #put all of those in an array
        feedPosts = []
        followedUsers.each{|i| 
            postswhere = Post.where(user_id: i)
            postswhere.each{|j| 
                 feedPosts.push({
                    post: j,
                    recipe: j.recipe,
                    recipepic: j.recipe ? rails_blob_path(j.recipe.pic) : nil,
                    pics: j.pics.map{|p| rails_blob_path(p) },
                    tags: tagnames(j.tags)
                 })
            }
        }
        #sort that array by posting time
        feedPosts = feedPosts.sort{|i| i[:post][:created_at]}
        render json: feedPosts
    end

    def followersof
        userid = User.find_by(UserName: params[:user])
        users = Following.where(followee: userid.id)
        follo = getuserslist(users)
        render json: follo 
    end

    def followedby
        userid = User.find_by(UserName: params[:user])
        users = Following.where(follower: userid.id)
        follo = getuserslist(users)
        render json: follo 
    end

private

    def getuserslist(foll)
      #  foll = Following.where({follower: userId})
         if !foll[0]
             return {error: "No such followings."}
         end
        follo = []
        listofUsers = foll.each{|i| 
        user=User.find_by(id: i.followee)
        avatar = rails_blob_path(user.avatar)
        follo.push({UserName: user.UserName, avatar: avatar, description: user.Description})
        }
        return follo
    end

    def tagnames(tags)
        tags.map{|i| i.tag}
    end

end


#get '/followersof/:user', to: 'followings#followersof'
#get '/followedby/:user', to: 'followings#followedby'
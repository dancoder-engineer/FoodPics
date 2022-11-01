class TagsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def maketags
        # if !session[:user_id]
        #     return render json: ({error: "Not logged in."})
        # end
        # tags = params[:tags].split(" ")
        # werethere = []
        # tags.each{|i| 
        #     found = Tag.find_by(tag: i)
        #     found ? werethere.push(messwithtags(found.id)): werethere.push(maketag(i))}
        #render json: {tags: Tag.all, posttags: Posttag.all}
        render json: {par: params}
    end

    def postsbytag
        smallTag = params[:tag].downcase
        posts = Tag.find_by(tag: smallTag)
        if !posts
            return render json: ({error: "No posts found"})
        end
        posts = Tag.find_by(tag: smallTag).posts
        postNos = posts.map {|i| i.id}
        feedPosts = []
        postNos.each{|i| 
        postswhere = Post.where(id: i)
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
                    pics: j.pics.map{|p| rails_blob_path(p) }
                 })
            }
        }
        #sort that array by posting time
        feedPosts = feedPosts.sort{|i| i[:post][:created_at]}
        render json: feedPosts
    end

private

def messwithtags(i)
    postNo = params[:postId].to_i
    newposttag = Posttag.create({
        post_id: postNo,
        tag_id: i
    })
    return newposttag
end

def maketag(i)
    smallTag = i.downcase
    newtag = Tag.create({tag: smalltag})
    postNo = params[:postId].to_i
    newposttag = Posttag.create({
        post_id: postNo,
        tag_id: newtag.id
    })
    return newposttag
end

def tagnames(tags)
    tags.map{|i| i.tag}
end

end

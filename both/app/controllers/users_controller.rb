class UsersController < ApplicationController

  skip_before_action :verify_authenticity_token

    def index
        users = User.all
        render json: users, status: 200
    end

    def getme
        if session[:user_id]
            user = User.find_by(id: session[:user_id])
            avatar = rails_blob_path(user.avatar)
            return render json: ({user: user, avatar: avatar, notifications: user.notifications}), status: 200
        else
            return render json: {error: "Not logged in."}
        end
    end

    def getid
        user = User.find_by(UserName: params[:name])
        if user
            avatar = rails_blob_path(user.avatar)
            howmanyfollowers = Following.where(followee: user.id)
            howmanyfollowees = Following.where(follower: user.id)
            follow = {
              followers: howmanyfollowers.length,
              followees: howmanyfollowees.length
            }
            return render json: ({user: user, avatar: avatar, follow: follow}), status: 200
        else
            return render json: ({error: "No such user"})
        end
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            avatar = rails_blob_path(user.avatar)
            notifications = user.notifications
        else
            avatar = "N/A"
            notifications = []
        end
        render json: ({user: user, avatar: avatar, notifications: notifications}), status: 200
    end

    def create
        user=User.create!(allowed)
        session.delete :user_id

        if user.save
            session[:user_id] = user.id     
            createstuff(user.id)
            render json: {user: user, session: session}, status: :created
        end

        rescue ActiveRecord::RecordInvalid => invalid
            render json: { errors: invalid.record.errors.full_messages  }, status: :unprocessable_entity
    end

    def update
        user=User.find_by(id:params[:id])
        user.update(allowed)
        render json: user, status: 200
    end

    def addavatar
        user=User.find_by(id:params[:id])
        user.update(avatar: params[:avatar])
        avatar_url = rails_blob_path(user.avatar)
        render json: {user: user, avatar_url: avatar_url}, status: 200
    end

    def userAvatar
        user=User.find_by(id:params[:id])
        avatar = rails_blob_path(user.avatar)

        render json: {UserName: user.UserName, avatar: avatar}
    end

    def update
        user=User.find_by(id:params[:id])
        if user
            user.update(allowed)
            return render json: user, status: 200
        else
            return render json: user
        end
    end

    def destroy
        user=User.find_by(id:params[:id])
        if user
            user.destroy
            return render json: {finished: "It is done."}
        else
            return render json: {error: "User not found or not logged in."}
        end
    end

    private

    def createstuff(id)

        dan = User.find_by(UserName: "Dan")

        Notification.create({
            content: "Welcome to FoodBook!!",
            read: "unread",
            user_id: id,
            whichpost: 0,
        })

        Following.create({
            follower: id,
            followee: id,
        })

        Following.create({
            follower: id,
            followee: dan.id,
        })

    end

    def allowed
        params.require(:user).permit(:ActualName, :Description, :Pronouns, :UserName, :Website, :avatar, :password, :password_confirmation)
    end



end

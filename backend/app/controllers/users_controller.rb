class UsersController < ApplicationController

   skip_before_action :verify_authenticity_token

    def index
        users = User.all
        render json: users, status: 200
    end

    def show
        user = User.find_by(id: params[:id])
        avatar = rails_blob_path(user.avatar)
        render json: ({user: user, avatar: avatar}), status: 200
    end

    def create
        user=User.create(allowed)
        if user.save
            render json: user, status: :created
        else
            render json: {error: "Passwords don't match."}
        end
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

    private

    def allowed
        params.require(:user).permit(:ActualName, :Description, :Pronouns, :UserName, :Website, :avatar, :password, :password_confirmation)
    end

end

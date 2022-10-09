class SessionsController < ApplicationController

    skip_before_action :verify_authenticity_token


    def login
        user = User.find_by(UserName: params[:username])

        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            avatar = rails_blob_path(user.avatar)
            return render json: {user: user, avatar: avatar}, status: 200
        else
            return render json: ({bad: "bad"}), status: 200
        end
    end

end

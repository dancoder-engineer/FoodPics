class SessionsController < ApplicationController

    skip_before_action :verify_authenticity_token


    def login
        user = User.find_by(UserName: params[:username])

        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            avatar = rails_blob_path(user.avatar)
            return render json: {user: user, avatar: avatar}, status: 200
        else
            session.delete :user_id
            return render json: ({error: "Login Failed. Check username and password."}), status: 200
        end
    end

    def logout
        session.delete :user_id
        render json: ({info: "logged out", session: session})
    end

end

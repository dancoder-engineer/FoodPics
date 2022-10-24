class NotificationsController < ApplicationController

    def index
        render json: Notification.all
    end

    

    def readall

        if !session[:user_id]
            return render json: ({error: "Not logged in"}), status: :forbidden
        end

        notifications = Notification.where(user_id: session[:user_id])
        notifications.each{|i| i.update({read: "read"}) }

        render json: {status: "Success"}

    end
end

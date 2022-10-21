class MessagesController < ApplicationController

   # skip_before_action :verify_authenticity_token

    def firstmessages

        if !session[:user_id]
            return render json:{error: 'Not logged in.'}, status: :forbidden
        end


        lasts = []
        messages = Message.where(recipient: session[:user_id]).or(Message.where(sender: session[:user_id]))
        users = getusers(messages).uniq
        messages = messages.reverse
        users = users.reverse
        users.each{|i|
            messages.each{|j|
            if j.sender == i || j.recipient == i
                lasts.push(makeua(j))
                break
            end
            }
            }
        render json: lasts
    end


    def messagethread

        if !session[:user_id]
            return render json:{error: 'Not logged in.'}, status: :forbidden
        end

        messages = Message.where(recipient: session[:user_id], sender: params[:id]).or(Message.where(sender: session[:user_id], recipient: params[:id]))
        messages = messages.reverse
        user=User.find_by(id:params[:id])
        avatar = rails_blob_path(user.avatar)
        userinfo = {    
                user: user.UserName,
                avatar: avatar
            }
        render json: {messages: messages, userinfo: userinfo}
    end

    private

        def makeua(j)
            user = j.sender == session[:user_id] ? User.find_by(id:j[:recipient]) : user=User.find_by(id:j[:sender])
            avatar = rails_blob_path(user.avatar)
            return {
                otheruser: j.sender == session[:user_id] ? j.recipient : j.sender,
                content: j.content,
                user: user.UserName,
                avatar: avatar}
        end

        def getusers(userarr)
            return userarr.map{|i| 
            i.sender == session[:user_id] ? i.recipient : i.sender
        }
        end

end

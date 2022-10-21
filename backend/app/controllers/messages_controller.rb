class MessagesController < ApplicationController

    def firstmessages
        lasts = []
        messages = Message.where(recipient: session[:user_id]).or(Message.where(sender: session[:user_id]))
        users = getusers(messages).uniq
        messages = messages.reverse
        users = users.reverse
        users.each{|i|
            messageList = []
            messages.each{|j|
            if j.sender == i || j.recipient == i
                if j.sender == session[:user_id]
                    user=User.find_by(id:j[:recipient])
                    avatar = rails_blob_path(user.avatar)
                    ua = {
                        sender: j.sender,
                        recipient: j.recipient,
                        content: j.content,
                        user: user.UserName,
                        avatar: avatar}
                    lasts.push(ua)
                else
                    user=User.find_by(id:j[:sender])
                    avatar = rails_blob_path(user.avatar)
                    ua = {
                        sender: j.sender,
                        recipient: j.recipient,
                        content: j.content,
                        user: user.UserName,
                        avatar: avatar}
                    lasts.push(ua)
                end
                break
            end
            }
            }
        render json: lasts
    end


    def messagethread
        thread = []
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

        def getusers(userarr)
            return userarr.map{|i| 
            i.sender == session[:user_id] ? i.recipient : i.sender
        }
        end

end

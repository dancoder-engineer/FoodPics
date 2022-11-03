Rails.application.routes.draw do
 # namespace :api do
    resources :notifications
    resources :messages
   resources :posttags
    resources :tags
    resources :comments
    
    resources :recipes
    resources :posts
    resources :users
    resources :followings

    put '/addavatar/:id', to: 'users#addavatar'
    get '/useravatar/:id', to: 'users#userAvatar'
    get '/recipepic/:id', to: 'recipes#recipepic'
    get '/userposts/:id', to: 'posts#userposts'
    get '/userid/:name', to: 'users#getid'
    get '/getme/', to: 'users#getme'
    post '/loginback/', to: 'sessions#login'
    get '/logoutback/', to: 'sessions#logout'
    post '/newFollowing/:followee', to: 'followings#newFollowing'
    post '/deleteFollowing/:followee', to: 'followings#deleteFollowing'
    get '/checkFollowing/:followee', to: 'followings#checkFollowing'
    get '/makefeed/',  to: 'followings#makefeed'
    get '/commentsbypost/:id', to: 'comments#bypost'
    post '/maketags/', to: 'tags#maketags'
    get '/postsbytagback/:tag', to: 'tags#postsbytag'
    get '/followersof/:user', to: 'followings#followersof'
    get '/followedby/:user', to: 'followings#followedby'
    get '/firstmessages/', to: 'messages#firstmessages'
    get '/messagethreadback/:id', to: 'messages#messagethread'
    get '/commentnotifications/:id', to: 'notifications#commentnotifications'
    get '/readall/', to: 'notifications#readall'
 # end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

Rails.application.routes.draw do
  resources :notifications
  resources :messages
  resources :posttags
  resources :tags
  resources :comments
  
  resources :recipes
  resources :posts
  resources :users
  resources :followings, only: [:index]

  put '/addavatar/:id', to: 'users#addavatar'
  get '/useravatar/:id', to: 'users#userAvatar'
  get '/recipepic/:id', to: 'recipes#recipepic'
  get '/userposts/:id', to: 'posts#userposts'
  get '/userid/:name', to: 'users#getid'
  get '/getme/', to: 'users#getme'
  post '/login/', to: 'sessions#login'
  get '/logout/', to: 'sessions#logout'
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
  get '/messagethread/:id', to: 'messages#messagethread'
  get '/commentnotifications/:id', to: 'notifications#commentnotifications'
  get '/messagenotification/:id', to: 'notifications#messagenotification'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

Rails.application.routes.draw do
  
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
  post '/newFollowing/:followee', to: 'followings#newFollowing'
  post '/deleteFollowing/:followee', to: 'followings#deleteFollowing'
  get '/checkFollowing/:followee', to: 'followings#checkFollowing'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

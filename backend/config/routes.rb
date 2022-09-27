Rails.application.routes.draw do
  resources :recipes
  resources :posts
  resources :users

  put '/addavatar/:id', to: 'users#addavatar'
  get '/useravatar/:id', to: 'users#userAvatar'
  get '/recipepic/:id', to: 'recipes#recipepic'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

Rails.application.routes.draw do
  resources :users

  post 'rails/active_storage/direct_uploads', to: 'direct_uploads#create'
  put '/addavatar/:id', to: 'users#addavatar'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

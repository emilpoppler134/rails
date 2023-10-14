Rails.application.routes.draw do
  root 'tasks#index'

  get '/add', to: 'tasks#add'

  resources :tasks, only: [:index, :update]
  
  # Google OAuth2 routes
  get '/auth/:provider/callback' => 'sessions#omniauth'
  get '/login', to: 'sessions#login'
  post '/logout', to: 'sessions#logout'
end

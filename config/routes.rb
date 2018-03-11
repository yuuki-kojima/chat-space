Rails.application.routes.draw do
  resource :users, only: [:edit, :update]
  devise_for :users
  root 'messages#index'
end

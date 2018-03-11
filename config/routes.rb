Rails.application.routes.draw do
  resource :users, only: [:index, :edit, :update]
  devise_for :users
  root 'messages#index'
  resource :groups, only: [:new, :create, :edit, :update] do
    resource :messages, only: [:index, :create]
  end
end

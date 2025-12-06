Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        token_validations: 'api/v1/auth/token_validations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
        resource :avatar, only: [:show]
      end

      resources :products, only: %i[index show create update destroy]
      resources :cart_items, only: [:create, :index, :update, :destroy]
      resources :order_items, only: %i[index create]
      resources :credit_cards, only: %i[index create show]
    end
  end

  
end

Rails.application.routes.draw do
  resources :organizations
    resources :needs
    resources :assistances
    resources :user_types
    resources :users
    get 'password/reset'
    post 'password/reset'
    get 'password/forgot'
    post 'password/forgot'

    root 'homepage#index'

    scope :auth do
        get 'login', to: 'auth#show'
        post 'login', to: 'auth#login'
        get 'logout', to: 'auth#logout'
    end

    namespace :api, defaults: { format: 'json' } do
        scope :sponsees do
            get 'sponsees', to: 'sponsees#list'
        end
        scope :sponsors do
            get 'sponsors', to: 'sponsors#list'
        end
        scope :sponsorships do
            get 'sponsors', to: 'sponsorships#list_sponsors'
            get 'sponsees', to: 'sponsorships#list_sponsees'
            get 'sponsor/:id', to: 'sponsorships#sponsor', constraints: { id: /[0-9]+(%7C[0-9]+)*/ }
            get 'sponsee/:id', to: 'sponsorships#sponsee', constraints: { id: /[0-9]+(%7C[0-9]+)*/ }
        end
        scope :handler_relations do
            get 'handler/:id', to: 'handler_relations#handler'
        end
    end

    get '*path', to: 'homepage#index'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

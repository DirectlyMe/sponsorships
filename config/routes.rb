Rails.application.routes.draw do
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

    scope :users do
        get 'current', to: 'users#current_user'
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

    resources :action_items
    resources :organizations
    resources :needs
    resources :assistances
    resources :user_types
    resources :users

    # make sure active_storage resolves
    post 'rails/active_storage/direct_uploads', to: 'direct_uploads#create'
    get '*path', to: 'homepage#index', constraints: lambda { |req|
        req.path.exclude? 'rails/active_storage'
    }
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
    resources :sponsor_services
    resources :services
    resources :sponsees
    resources :sponsors
    root 'homepage#index'

    namespace :api, defaults: { format: 'json' } do
        get 'sponsees', to: 'sponsees#list'
        get 'sponsorships/sponsors', to: 'sponsorships#list_sponsors'
        get 'sponsorships/sponsor/:id', to: 'sponsorships#sponsor'
        get 'sponsorships/sponsee/:id', to: 'sponsorships#sponsee'
    end

    get '*path', to: 'homepage#index'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  resources :sponsees
  resources :sponsors
  root 'homepage#index'

  namespace :api, defaults: { format: 'json' } do
    get 'sponsees', to: 'sponsees#list'
    get 'sponsorships', to: 'sponsorships#list'
  end

  get '*path', to: 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

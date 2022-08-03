Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :songs
      resources :playlists
      resource :search, only: [] do
        get :artists
        get :artist_albums
        get :album
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'react#index'
  get 'app', to: 'react#index'
  get 'app/*path', to: 'react#index'
end
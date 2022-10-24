Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :songs, only: [] do
        collection do
          get :playing
        end
      end
      resources :playlists do
        resources :songs do
          member do
            put :play
            put :pause
          end
        end
      end
      resource :search, only: [] do
        get :artists
        get :artist_albums
        get :album
        get :songs
        get :all
        get :track
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'react#index'
  get '/', to: 'react#index'
  get '/*path', to: 'react#index'
  mount ActionCable.server => '/cable'
end
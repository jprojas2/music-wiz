module Api
    module V1
        class SearchesController < ApplicationController
            def artists
                @artists = Discogs.new.search_artist params[:query]
                render json: @artists["results"]
            end

            def artist_albums
                @albums = Discogs.new.get_artist_albums params[:artist_id]
                render json: @albums["releases"]
            end

            def album
                @album = Discogs.new.get_album params[:album_id]
                render json: @album
            end
        end
    end
end
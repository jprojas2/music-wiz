module Api
  module V1
    class PlaylistsController < ApplicationController
      before_action :set_playlist, only: [:show, :update, :destroy]

      # GET /playlists
      def index
        @playlists = Playlist.all

        render json: @playlists
      end

      # GET /playlists/1
      def show
        render json: @playlist.as_json.merge({"songs": @playlist.songs.map{|e| e.as_json}})
      end

      # POST /playlists
      def create
        @playlist = Playlist.new(playlist_params)

        if @playlist.save
          render json: @playlist, status: :created, location: @playlist
        else
          render json: @playlist.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /playlists/1
      def update
        if @playlist.update(playlist_params)
          render json: @playlist.as_json.merge({"songs": @playlist.songs.map{|e| e.as_json}})
        else
          render json: @playlist.errors, status: :unprocessable_entity
        end
      end

      # DELETE /playlists/1
      def destroy
        @playlist.destroy
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_playlist
          @playlist = Playlist.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def playlist_params
          params.require(:playlist).permit(:id, :name, :description, songs_attributes: [:id, :name, :band, :remote_id,  :duration,
            :coverart_url, :thumbnail_url, :album, :position, :_destroy])
        end
    end

  end
end
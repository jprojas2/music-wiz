module Api
  module V1
    class SongsController < ApplicationController
      before_action :set_playlist, except: [:playing]
      before_action :set_song, only: [:play, :pause, :show, :update, :destroy]

      # GET /songs
      def index
        @songs = Song.all

        render json: @songs
      end

      # GET /songs/1
      def show
        render json: @song
      end

      # POST /songs
      def create
        @song = @playlist.songs.create(song_params)

        if @song.save
          render json: @song, status: :created, location: @song
        else
          render json: @song.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /songs/1
      def update
        if @song.update(song_params)
          render json: @song
        else
          render json: @song.errors, status: :unprocessable_entity
        end
      end

      # DELETE /songs/1
      def destroy
        @song.destroy
      end

      def playing
        @song = Song.find_by(playing: true)
        render json: @song
      end

      def play
        @song.assign_attributes(playing: true)
        if @song.valid? && Song.update_all(playing: false)
          @song.update(playing: true)
          render json: @song
        else
          render json: @song.errors, status: :unprocessable_entity
        end
      end

      def pause
        Song.update_all(playing: false)
        render json: @song
      end

      private

        def set_playlist
          @playlist = Playlist.find(params[:playlist_id])
        end
        # Use callbacks to share common setup or constraints between actions.
        def set_song
          @song = @playlist.songs.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def song_params
          params.require(:song).permit(:remote_id, :name, :album, :band, :coverart_url)
        end
    end
  end
end

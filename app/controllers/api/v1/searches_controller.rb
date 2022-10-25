module Api
    module V1
        class SearchesController < ApplicationController
            def artists
                @artists = Discogs.new.search_artist params[:name]
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

            def songs
                @songs = Discogs.new.search_song params[:name]
                render json: @songs["results"]
            end

            def all
                @results = Discogs.new.search params[:q], type: params[:type]
                render json: @results["results"]
            end

            def track
                @results = Discogs.new.search params[:q], type: params[:type]
                @results = @results["results"].select{|e| e["format"] && (e["format"].include?("Album") || e["format"].include?("Compilation")) && e["format"].include?("CD") }.uniq{|e| e["master_id"]}
                @results = @results.sort_by{|e| e["format"].include?("Album") ? 0 : 1}
                @results.select! do |result|
                    begin
                        result_detail = Discogs.new.get_album result["id"]
                        track = FuzzyMatch.new(result_detail["tracklist"].map{|e| OpenStruct.new(e)}, read: :title).find(params[:q]).to_h
                        result.merge!({"track": track}).merge!(result_detail)
                        result["artists"] && result["artists"].each{|e| e["name"] = e["name"].gsub(/\([0-9]+\)/, "").strip}
                        result.merge!({"artist": result_detail["artists"].first["name"]}) if result_detail["artists"]&.first
                        true
                    rescue
                        false
                    end
                end
                render json: @results
            end
        end
    end
end
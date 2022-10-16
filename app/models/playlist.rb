class Playlist < ApplicationRecord
    has_and_belongs_to_many :songs, -> { order('songs.position') }
    accepts_nested_attributes_for :songs, allow_destroy: true
end

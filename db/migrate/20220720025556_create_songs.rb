class CreateSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :songs do |t|
      t.string :remote_id
      t.string :name
      t.string :album
      t.string :band
      t.string :cover_art_url

      t.timestamps
    end
  end
end

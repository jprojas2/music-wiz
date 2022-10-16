class CreateSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :songs do |t|
      t.string :remote_id
      t.string :name
      t.string :album
      t.string :band
      t.string :thumbnail_url
      t.string :coverart_url
      t.integer :duration
      t.integer :position, null: false, default: 0
      t.boolean :playing, null: false, default: false

      t.timestamps
    end
  end
end

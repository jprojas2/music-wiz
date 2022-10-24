class PlayerChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_channel"
    puts "AAAAAAAAAAAAAAAAAAAAAAAA"
    PlayerChannel.broadcast_to(
      "player_channel",
      title: 'New things!',
      body: 'All the news fit to print'
    )
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

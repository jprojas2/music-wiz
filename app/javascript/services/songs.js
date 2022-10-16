
class songsService {
    get(playlist_id, id) {
        return fetch("http://localhost:3000/api/v1/playlists/" + id + "/songs/" + id)
    }

    update(playlist_id, id) {
        return fetch("http://localhost:3000/api/v1/playlists/" + playlist.id + "/songs/" + id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({playlist: playlist})
        })
    }

    getPlaying(){
        return fetch("http://localhost:3000/api/v1/songs/playing")
    }

    play(playlist_id, id){
        return fetch("http://localhost:3000/api/v1/playlists/"+ playlist_id +"/songs/" + id + "/play", {
            method: "PUT"
        })
    }

    pause(playlist_id, id){
        return fetch("http://localhost:3000/api/v1/playlists/"+ playlist_id +"/songs/" + id + "/pause", {
            method: "PUT"
        })
    }

    destroy(playlist_id, id) {
        return fetch("http://localhost:3000/api/v1/playlists/"+ playlist_id +"/songs/" + id, {
            method: "DELETE"
        })
    }
}

export default new songsService();
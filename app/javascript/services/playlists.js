
class playlistsService {
    get(id) {
        return fetch("/api/v1/playlists/" + id)
    }

    create(playlist) {
        return fetch("/api/v1/playlists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({playlist: playlist})
        })
    }

    update(id, playlist) {
        return fetch("/api/v1/playlists/" + playlist.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({playlist: playlist})
        })
    }

    destroy(id) {
        return fetch("/api/v1/playlists/" + id, {
            method: "DELETE"
        })
    }
}

export default new playlistsService();
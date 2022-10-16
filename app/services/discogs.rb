class Discogs

    API_PROTOCOL = "https://"
    API_ENDPOINT = "api.discogs.com"

    def initialize
        @key = "SrHVEWQlwMoJUZORObfa"
        @secret = "nMUYqlcnnxmgeTUKsrHjmpylAJHyVVYP"
    end

    def search_song song, page: nil, per_page: nil
        request(http_method: :get, endpoint:
          paginate_endpoint("/database/search?q=#{song}", 2, 150))
    end

    def search term, type: nil, page: nil, per_page: nil
        endpoint = "/database/search?q=#{term}"
        endpoint += "&type=#{type}" if type
        request(http_method: :get, endpoint:
            paginate_endpoint(endpoint, page, per_page))
    end

    def search_artist artist, page: nil, per_page: nil
        request(http_method: :get, endpoint:
          paginate_endpoint("/database/search?q=#{artist}&type=artist", page, per_page))
    end

    def get_artist_albums artist_id, page: nil, per_page: nil
        request(http_method: :get, endpoint:
          paginate_endpoint("/artists/#{artist_id}/releases", page, per_page))
    end

    def get_album album_id
        request(http_method: :get, endpoint: "/masters/#{album_id}")
    end

    def paginate_endpoint endpoint, page, per_page
        if per_page
            page ||= 1
            endpoint += "?" unless endpoint.include? "?"
            endpoint += "&page=#{page}&per_page=#{per_page}"
        end
        endpoint
    end

    def request(http_method:, endpoint:, params: nil, attempt: 1)
        date = DateTime.now
        client =  Faraday.new(API_PROTOCOL + API_ENDPOINT) do |client|
            client.request :url_encoded
            client.adapter Faraday.default_adapter
            #TIMEOUT 120 seconds!!
        end
        client.headers['Authorization'] = "Discogs key=#{@key}, secret=#{@secret}"

        puts "\n#{http_method.to_s} #{endpoint}"
        puts "\nRequest headers\n"
        client.headers.each do |key, val|
            puts "#{key}: #{val}"
        end
        if params
          puts "\nRequest body\n"
          puts params.to_json
        end

        if params
            client.headers['Content-Type'] = "application/json"
            client.headers['Content-Length'] = params.to_json.bytesize.to_s
            @response = client.public_send(http_method, endpoint, params.to_json)
        else
            @response = client.public_send(http_method, endpoint)
        end

        if @response.status.in? [200, 201]
            JSON.parse(@response.body) if @response.status != 204
        elsif @response.status == 404
            raise "Código #{@response.status}: no encontrado"
        elsif @response.status == 422
            raise "Código #{@response.status}: #{JSON.parse(@response.body) }"
        elsif @response.status == 429 && attempt <= 10
            request(http_method: http_method, endpoint: endpoint, params: params, attempt: attempt + 1)
        else
            puts "\nResponse status code: #{@response.status}"
            puts "\nResponse headers\n"
            #LOG ALSO THE HEADERS!!!
            @response.headers.each do |key, val|
                puts "#{key}: #{val}"
            end
            puts "\nResponse body\n"
            puts @response.body
            raise "Código #{@response.status}"
        end
    end
end
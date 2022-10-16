import React from "react";
import { AudioOutlined, SaveOutlined } from '@ant-design/icons';
import { Input, AutoComplete, Space, Button } from 'antd';
import MusicItem from "./MusicItem";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import playlistsService from "../services/playlists.js";
import songsService from "../services/songs.js";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { notification } from 'antd';

const hourToSeconds = (hour) => {
  var seconds = 0;
  var parts = hour.split(":");
  if(parts.length == 2){
    seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  else if(parts.length == 3){
    seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  }
  return seconds;
}

const secondsToHour = (seconds) => {
  var hour = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hour * 3600) / 60);
  var seconds = seconds - hour * 3600 - minutes * 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}


const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "unset",
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // change background colour if dragging
  border: isDragging ? "2px solid blue" : "unset",
  background: isDragging ? "white" : "unset",
  // styles we need to apply on draggables
  ...draggableStyle
});

const searchResult = (q, results) =>
  results
    .map((result, idx) => {
      console.log(result)
      return {
        value: result.id,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            data-id={result.id}
            data-duration={result.track.duration && hourToSeconds(result.track.duration)}
            data-src={result.thumb}
            data-coverart={result.cover_image}
            data-name={result["track"]["title"]}
            data-artist={result["artist"]}
            data-album={result["title"] + " (" + result["year"] + ")"}
          >
            <img src={result["thumb"]} alt={result["track"]["title"]} />
            <div style={{display: 'flex', flexFlow: 'column', textAlign: "right"}}>
                <span>
                {result["track"]["title"]}
                </span>
                <span>
                {result["artists"] != undefined ? result["artists"][0]["name"] : ""}
                </span>
                <span>
                {result["title"]} ({result["year"]})
                </span>
            </div>
          </div>
        ),
      };
    });


export default () => {

    const [options, setOptions] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [items, setItems] = useState(null);

    const { id } = useParams();
    
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      for(var i = 0; i < result.length; i++){
        result[i].position = i;
      }
    
      return result;
    };

    const onDragEnd = (result) => {
      if (!result.destination) {
        return;
      }
  
      const _items = reorder(
        items,
        result.source.index,
        result.destination.index
      );
  
      setItems(_items);
    }

    useEffect(() => {
      if(playlist === null) {
        playlistsService.get(id).then((response) => response.json())
        .then((data) => {
          setPlaylist(data);
          setItems(data.songs || []);
        }).catch((error) => {
          setPlaylist({});
        });
      }
    }, [playlist])

    let currentTimeout = null;

    var _items = [{id: "1"},{id: "2"},{id: "3"},{id: "4"}]

    var PlaylistItemList = (props) => {
      if(props.items == null){
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {[{id: "1"}].map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div {...props.provided.dragHandleProps}></div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> 
        return <div>Loading...</div>
      }
      else if (props.items.length == 0){
        return <div>No items found</div>
      }
      else{
        return <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {props.items.filter((item) => item._destroy != "1").map((item, index) => (
                <Draggable key={(item.id || item.key)} draggableId={(item.id || item.key).toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <MusicItem key={item.key || item.id} item={item} onDelete={() => onItemDelete(props.id, item.id, item.key)} onPlay={() => onItemPlay(props.id, item.id)} provided={provided} onPause={() => onItemPause(props.id, item.id)}/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> 
        
        
      //  props.items.filter((item) => item._destroy != "1").map((item, index) => (
      //    <MusicItem key={item.key || item.id} item={item} onDelete={() => onItemDelete(props.id, item.id, item.key)}/>
      //  ))
      }
    }

    const onItemPlay = (playlistId, id) => {
      songsService.play(playlistId, id).then((response) => response.json())
      .then((data) => {
        for(var i = 0; i < items.length; i++){
          items[i].playing = false;
        }
        let item = items.find((item) => item.id == id);
        item.playing = true;
        setPlayingSong();
        setItems([...items]);
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }

    const onItemPause = (playlistId, id) => {
      songsService.pause(playlistId, id).then((response) => response.json())
      .then((data) => {
        for(var i = 0; i < items.length; i++){
          items[i].playing = false;
        }
        setItems([...items]);
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }

    const setPlayingSong = () => {
      songsService.getPlaying().then((response) => response.json())
          .then((data) => {
            setSong(data);
          }).catch((error) => {
          });
    }

    const setSong = (song) => {
      let songPlayer = document.getElementById("songPlayer");
      if(song != null){
        songPlayer.classList.add("songPlayer_open");
        songPlayer.querySelector(".songPlayer__title").innerHTML = song.name;
        songPlayer.querySelector(".songPlayer__band").innerHTML = song.band;
        songPlayer.querySelector(".songPlayer__album").innerHTML = song.album;
        //songPlayer.querySelector(".songPlayer__artist").innerHTML = song.artist;
        //songPlayer.querySelector(".songPlayer__album").innerHTML = song.album;
        songPlayer.querySelector(".songPlayer__image img").src = song.thumbnail_url;
        songPlayer.querySelector(".songPlayer__duration span").innerHTML = secondsToHour(song.duration);
      } else {
        songPlayer.classList.remove("songPlayer_open");
      }
    }

    const onItemDelete = (playlistId, id, key) => {
      document.querySelector("[data-id=\"" + (key || id) + "\"]").parentElement.display = "none";
      if(key != undefined){
        setItems([...items.filter((item) => item.key != key)]);
      } else {
        let item = items.find((_item) => _item.id == id);
        item._destroy = "1";
        setItems([...items]);
      }
    }

    const handleSearch = (value) => {
        console.log(value);
        if (currentTimeout) {
          clearTimeout(currentTimeout);
        }
        currentTimeout = setTimeout(() => {
          fetch("http://localhost:3000/api/v1/search/track?q=" + value)
          .then((response) => response.json())
          .then((data) => {
            setOptions(data ? searchResult(value, data) : []);
          }).catch((error) => {
            setOptions([]);
            console.log(error);
          }
          );
        } , 1500);
    };
  
    const onSelect = (value) => {
      console.log('onSelect', value);
      document.getElementById("search").value = "";
      var optionLabel = document.querySelector("[data-id='" + value + "']");
      items.push({
        key: Date.now(),
        remote_id: value,
        duration: optionLabel.dataset.duration,
        thumbnail_url: optionLabel.dataset.src,
        coverart_url: optionLabel.dataset.coverart,
        name: optionLabel.dataset.name,
        album: optionLabel.dataset.album,
        band: optionLabel.dataset.artist,
        position: items.length
      });
      setItems([...items]);
    };

    const updatePlaylist = () => {
      playlist.songs = items;
      playlist.songs_attributes = playlist.songs;
      playlistsService.update(playlist.id, playlist)
        .then((response) => response.json())
        .then((data) => {
          notification['success']({
            message: 'Playlist saved',
          });
          setItems(data.songs);
        }).catch((error) => {
          console.log(error);
        }
      );
    }

    return <>
    <h1>{playlist === null ? "Loading" : playlist.name}</h1>
    <Space direction="vertical" style={{ width: '100%'}}>
        <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: '90%' }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        id="search"
        >
        </AutoComplete>
    </Space>
    <PlaylistItemList items={items} id={playlist ? playlist.id : null} onDragEnd={() => {}}/>
    
    <Button onClick={updatePlaylist} type="primary" icon={<SaveOutlined/>}>
      Save
    </Button>
    </>;
};
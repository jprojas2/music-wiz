import React from "react";
import "../styles/OverlayPlayer.css";
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { useState, useEffect } from "react";
import songsService from "../services/songs";
import {
    Link, Outlet,
  } from 'react-router-dom';

const secondsToHour = (seconds) => {
    var hour = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hour * 3600) / 60);
    var seconds = seconds - hour * 3600 - minutes * 60;
    return minutes + ":" + seconds;
}

export default (props) => {
    const [song, setSong] = React.useState(null);

    useEffect(() => {
        document.querySelector("body").style.backgroundColor = "rgba(0,0,0,0.5)";
        document.querySelector("body").style.color = "rgba(255, 255, 255, 1)";
        if(song === null) {
            songsService.getPlaying().then((response) => response.json())
          .then((data) => {
            setSong(data);
          }).catch((error) => {
            setSong(false);
          });
        }
      }, [song])

    if(song) {
        return  <div id="overlayPlayer" className="overlayPlayer">
            <div className="overlayPlayer__image">
                <img src={song.coverart_url} alt=""/>
            </div>
            <div className="overlayPlayer__label">
                <span className="overlayPlayer__title">{song.name}</span>
                <span className="overlayPlayer__band">{song.band}</span>
                <span className="overlayPlayer__album">{song.album}</span>
            </div>
        </div>
    } else {
        return <span> Nothing playing </span>
    }
};
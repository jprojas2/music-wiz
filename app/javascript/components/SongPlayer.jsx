import React from "react";
import "../styles/SongPlayer.css";
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
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}

export default (props) => {
    const song = props.song;
    if(song) {
        return  <div id="songPlayer" className={"songPlayer songPlayer_open"}>
            <div className="songPlayer__image">
                <img src={song.thumbnail_url} alt=""/>
            </div>
            <div className="songPlayer__label">
                <span className="songPlayer__title">{song.name}</span>
                <span className="songPlayer__band">{song.band}</span>
                <span className="songPlayer__album">{song.album}</span>
            </div>
            <div className="songPlayer__openPlayer">
                <Link to="/player" target="_blank">
                    Go to player
                </Link>
            </div>
            <div className="songPlayer__duration">
                <span>{secondsToHour(song.duration)}</span>
            </div>
            {props.onDelete && (
                <div className="songPlayer__discard" onClick={props.onDelete}>
                    <CloseOutlined />
                </div>
            )}
        </div>
    } else {
        return <div id="songPlayer" className={"songPlayer"}>
        <div className="songPlayer__image">
            <img alt=""/>
        </div>
        <div className="songPlayer__label">
            <span className="songPlayer__title"></span>
            <span className="songPlayer__band"></span>
            <span className="songPlayer__album"></span>
        </div>
        <div className="songPlayer__openPlayer">
            <Link to="/player" target="_blank">
                Go to player
            </Link>
        </div>
        <div className="songPlayer__duration">
            <span></span>
        </div>
        {props.onDelete && (
            <div className="songPlayer__discard" onClick={props.onDelete}>
                <CloseOutlined />
            </div>
        )}
    </div>
    }
};
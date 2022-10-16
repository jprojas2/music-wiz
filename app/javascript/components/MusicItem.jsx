import React from "react";
import "../styles/MusicItem.css";
import HolderOutlined from '@ant-design/icons/HolderOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined';
import PauseOutlined from '@ant-design/icons/PauseOutlined';

const secondsToHour = (seconds) => {
    var hour = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hour * 3600) / 60);
    var seconds = seconds - hour * 3600 - minutes * 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}

export default (props) => (
    <div className="musicItem" data-id={props.item.key || props.item.id}>
        <div {...props.provided.dragHandleProps} className="musicItem__handle">
            <HolderOutlined />
        </div>
        <div className="musicItem__image">
            <img src={props.item.thumbnail_url} alt=""/>
        </div>
        <div className="musicItem__label">
            <span className="musicItem__title">{props.item.name}</span>
            <span className="musicItem__band">{props.item.band}</span>
            <span className="musicItem__album">{props.item.album}</span>
        </div>
        {props.item.id && props.onPlay && !props.item.playing && (
            <div className="musicItem__play" onClick={props.onPlay}>
                <CaretRightOutlined />
            </div>
        )}
        {props.item.id && props.onPause && props.item.playing && (
            <div className="musicItem__play" onClick={props.onPause}>
                <PauseOutlined />
            </div>
        )}
        <div className="musicItem__type">
            <span>{secondsToHour(props.item.duration)}</span>
        </div>
        {props.onDelete && (
            <div className="musicItem__delete" onClick={props.onDelete}>
                <CloseOutlined />
            </div>
        )}
    </div>
    
);
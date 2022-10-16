import React from "react";
import "../styles/PlaylistItem.css";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import { Link } from "react-router-dom";


export default (props) => (
    <Link to={"/playlists/" + props.item.id}>
        <div className="playlistItem">
            <div className="playlistItem__image">
                <UnorderedListOutlined />
            </div>
            <div className="playlistItem__label">
                {props.item.name}
            </div>
            <div className="playlistItem__type">
                <span>{props.item.type}</span>
            </div>
        </div>
    </Link>
);
import React from "react";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import PlaylistItem from "./PlaylistItem";
import { useState, useEffect } from "react";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value) => console.log(value);

var PlaylistsList = () => {
  var [items, setItems] = useState(null);

  useEffect(() => {
    if(items === null) {
      fetch("http://localhost:3000/api/v1/playlists")
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
        }).catch((error) => {
          console.log(error);
        }
      );
    }
  }, [items])
  

  if(items == null){
    return <div>Loading...</div>
  }
  else if (items.length == 0){
    return <div>No playlists found</div>
  }
  else{
    return <Space direction="vertical" style={{ width: '100%', overflow: "auto", maxHeight: "calc(100vh - 200px)"}}>
      { items.map((item,) => <PlaylistItem key={item.id} item={item} />) }
    </Space>
  }
}


export default () => (
    <>
    <h1>Playlists</h1>
    <Space direction="vertical" style={{ width: '100%'}}>
        <Search placeholder="input search text" onSearch={onSearch} enterButton size="large"/>
    </Space>
    <PlaylistsList/>
    </>
);
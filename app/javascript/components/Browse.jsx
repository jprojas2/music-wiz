import React from "react";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import MusicItem from "./MusicItem";
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


export default () => (
    <>
    <h1>Browse</h1>
    <Space direction="vertical" style={{ width: '100%'}}>
        <Search placeholder="input search text" onSearch={onSearch} enterButton size="large"/>
    </Space>
    </>
);
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import SongPlayer from './SongPlayer';
import {
  Link, Outlet,
} from 'react-router-dom';
import ActionCable from 'actioncable';
import { useEffect } from 'react';
import songsService from "../services/songs";

const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Playlists', '1', <UserOutlined />),
  getItem('Browse', '2', <UserOutlined />),
]

const AppLayout = () => {
  const [song, setSong] = React.useState(null);
  const cable = ActionCable.createConsumer('/cable');
  useEffect(() => {
    cable.subscriptions.create({channel: 'PlayerChannel'}, {
      received: (data) => {
        console.log("song changed")
        setSong(JSON.parse(data.message));
      }
    });
  }, [false])

  useEffect(() => {
    if(song === null) {
        songsService.getPlaying().then((response) => response.json())
      .then((data) => {
        setSong(data);
      }).catch((error) => {
        setSong(false);
      });
    }
  }, [song])

  return (<Layout  style={{
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  }}>
    {/*
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
    </Header>
*/}
    <Content
      className="site-content"
    >
      {/*<Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
*/}
      <Layout
        className="site-layout-background"
        style={{
          padding: '24px 0',
        }}
      >
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{
              height: '100%',
            }}>
            <Menu.Item key="1" icon={<UserOutlined></UserOutlined>}>
              <Link to="/playlists">
                Playlists
              </Link>
            </Menu.Item>
          </Menu>
          <div className='toggle' onClick={ () =>{ document.querySelector(".ant-layout-sider").classList.toggle("open") }}><span>></span></div>
        </Sider>
        <Content
          className="inner-content"
        >
          <Outlet/>
        </Content>
      </Layout>
    </Content>
    {/*
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
*/}
    <SongPlayer song={song}></SongPlayer>
  </Layout>
)
}

export default AppLayout;
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Playlists from "../components/Playlists";
import Playlist from "../components/Playlist";
import AppLayout from "../components/AppLayout";
import OverlayPlayer from "../components/OverlayPlayer";

export default (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/playlists" replace />}
      />
      <Route path="/player" element={<OverlayPlayer />}/>
      <Route path="/" element={<AppLayout/>}>
        <Route path="playlists" exact element={<Playlists />} >
        </Route>
        <Route path="playlists/:id" element={<Playlist />} />
        <Route path="home" element={<Playlists />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
      
    </Routes>
  </BrowserRouter>
);
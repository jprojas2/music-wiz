import React from "react";
import Routes from "../routes/index";
import "antd/dist/antd.css";
import { hot } from 'react-hot-loader/root'

class App extends React.Component {
    render () {
      return (
        <>{Routes}</>
      );
    }
  }

export default hot(App);
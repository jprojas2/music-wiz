import React from "react";
import Routes from "../routes/index";
import AppLayout from "./AppLayout";
import "antd/dist/antd.css";
import { hot } from 'react-hot-loader/root'

class HelloWorld extends React.Component {
    render () {
      return (
        <>{Routes}</>
      );
    }
  }

export default hot(HelloWorld);
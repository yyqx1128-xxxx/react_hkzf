import React, { Component } from "react";
import './news.less'
import TabBar from "../../components/tab-bar/tab-bar";

export default class News extends Component {
  render() {
    return <div>
        <h2>资讯页面</h2>
        <TabBar children='/news'></TabBar>
    </div>;
  }
}

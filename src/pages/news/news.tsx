import React, { Component } from "react";
import './news.less'
import TabBar from "../../components/tab-bar/tab-bar";
import NavBar from "../../components/nav-bar/nav-bar";

export default class News extends Component {
  render() {
    const navprpos = {
      title: "资讯页面",
      lefticon: require("../../assets/images/back-icon.png").default,
      leftshow: true,
      prop: this.props,
    };
    return <div className="news-div">
         <div className="news-nav">
          <NavBar children={navprpos}></NavBar>
        </div>
        <TabBar children='/news'></TabBar>
    </div>;
  }
}

import NavBar from "../../components/nav-bar/nav-bar";
import React, { Component } from "react";
import TabBar from "../../components/tab-bar/tab-bar";
import './house.less'

export default class RentHouse extends Component {
  render() {
    const navprpos = {
      title: "租房",
      lefticon: require("../../assets/back-icon.png").default,
      leftshow: true,
      prop: this.props,
    };
    return <div className="renthouse-div">
        <div className="renthouse-nav">
          <NavBar children={navprpos}></NavBar>
        </div>
        <TabBar children='/renthouse'></TabBar>
    </div>;
  }
}

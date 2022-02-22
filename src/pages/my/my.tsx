import React, { Component } from "react";
import TabBar from "../../components/tab-bar/tab-bar";
import NavBar from "../../components/nav-bar/nav-bar";
import "./my.less";

export default class My extends Component {
  state = {};
  goPage() {
    //  this.props.history.push('/home')
  }
  render() {
    const navprpos = {
      title: "我的",
      lefticon: require("../../assets/images/back-icon.png").default,
      leftshow: true,
      prop: this.props,
    };
    return (
      <div className="my-div">
        <div className="my-nav">
          <NavBar children={navprpos}></NavBar>
        </div>
        <TabBar children="/my"></TabBar>
      </div>
    );
  }
}

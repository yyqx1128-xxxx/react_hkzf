import NavBar from "../../components/nav-bar/nav-bar";
import React, { Component } from "react";
import "./cityList.less";

export default class CityList extends Component {
  render() {
    const navprpos = {
      title: "城市选择",
      lefticon: require("../../assets/back-icon.png").default,
      leftshow: true,
      prop: this.props,
    };
    return (
      <div className="city-div">
        <div className="city-nav">
          <NavBar children={navprpos}></NavBar>
        </div>
      </div>
    );
  }
}

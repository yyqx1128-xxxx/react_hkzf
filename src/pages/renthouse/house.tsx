import React, { Component } from "react";
import TabBar from "../../components/tab-bar/tab-bar";
import './house.less'

export default class RentHouse extends Component {
  render() {
    return <div>
        <h2>租房列表</h2>
        <TabBar children='/renthouse'></TabBar>
    </div>;
  }
}

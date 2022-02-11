import React, { Component } from "react";
import TabBar from "../../components/tab-bar/tab-bar";
import './my.less'

export default class My extends Component {
  state = {
  };
  goPage(){
  //  this.props.history.push('/home')
  }
  render() {
    console.log(this.props,'my')
    return <div>
      <h2 onClick={()=>this.goPage}>我的</h2>
      <TabBar children='/my'></TabBar>
    </div>
  }
}


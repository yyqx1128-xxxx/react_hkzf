
import { Component } from "react";
import { Link } from "react-router-dom";
import './nav-bar.less'

export default class NavBar extends Component {
  state = {
    isshowRight:false,
  };
  componentDidMount(){
  }
  goBack(prop:any) {
    prop.history.push('/home')
  }
  
  render() {
    const nav_prop:any = this.props.children
    return <div className="nav-div">
      {
        nav_prop.leftshow ? <div className="return-btn" onClick={()=>this.goBack(nav_prop.prop)}>
        <img src={nav_prop.lefticon} alt=""/> 
      </div> : ''
      
      }
     {
       nav_prop.title ? <div className="nav-title">{nav_prop.title}</div> : ''
     }
     {
        nav_prop.rightshow ? <div className="nav-right">
          {nav_prop.righttext?<img src={nav_prop.righticon} alt="" />: <span>{nav_prop.righttext}</span>}
        </div> : ''
      }
    </div>;
  }
}

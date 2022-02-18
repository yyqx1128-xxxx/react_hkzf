import NavBar from "../../components/nav-bar/nav-bar";
import React, { Component } from "react";
import "./map.less";
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';


export default class MapPage extends Component {
  state = {
    latitude:'',//纬度
    longitude:'',//经度
  };
  // 初始化地图实例
  componentDidMount() {
    this.getLocation();
    const map = new (window as any).BMapGL.Map("map-container")
    //设置中心点坐标
    const point = new (window as any).BMapGL.Point(116.404, 39.915);
    //初始化地图，同时设置展示级别
    map.centerAndZoom(point, 15); 
    //开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true);  
    //设置地图旋转角度
    map.setHeading(64.5);  
    //设置地图的倾斜角度   
    map.setTilt(73); 
    // map.setCenter(this.props.children.cityName);      
  }
  //获取地理位置信息
  //百度地图API-ak:
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
        })
      });
    } else {
      console.log("当前不支持获取地理位置");
    }
  }

  render() {
    const navprpos = {title:'地图找房',lefticon:require('../../assets/back-icon.png').default,leftshow:true,prop:this.props}
    const { latitude, longitude } = this.state
    console.log(latitude,longitude,'hdhsgh')
    return (
      <div className="map-div">
        <div className="map-nav">
          <NavBar children={navprpos}></NavBar>
        </div>
        {/* 地图容器 */}
        <div id="map-container">

        {/* 运用react-bmapgl插件 */}
        {/* <Map style={{ height: 450 }} center={{lng: 116.404, lat: 39.915}} zoom={12} heading={0}
          tilt={40} onClick={e => console.log(e)} enableScrollWheelZoom>
          <Marker position={{lng:116.404 , lat: 39.915}} icon={undefined} map={undefined} />
            <NavigationControl map={undefined} /> 
        </Map> */}
        </div>
      </div>
    );
  }
}

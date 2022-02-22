import NavBar from "../../components/nav-bar/nav-bar";
import React, { Component } from "react";
import "./map.less";
import { Map, Marker, NavigationControl, InfoWindow } from "react-bmapgl";
import { getSwiperData } from "../../api";

export default class MapPage extends Component {
  state = {
    latitude: "", //纬度
    longitude: "", //经度
    swiperList:[],
  };
  // 初始化地图实例
  componentDidMount() {
    this.getLocation();
    console.log(this.state.longitude, this.state.latitude, "司法局水电费");
    const map = new (window as any).BMapGL.Map("map-container");
    //设置中心点坐标
    const point = new (window as any).BMapGL.Point(106.5507, 29.5647);
    // const point = new (window as any).BMapGL.Point(this.state.longitude, this.state.latitude);
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
  getLocation = async()=> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        console.log(position,'进入location方法')
         this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position,'2222222')
      });
      await console.log('进入if之后')
    } else {
      console.log("当前不支持获取地理位置");
    }
  };

  render() {
    const navprpos = {
      title: "地图找房",
      lefticon: require("../../assets/images/back-icon.png").default,
      leftshow: true,
      prop: this.props,
    };
    const {latitude, longitude } = this.state;
    return (
      <div className="map-div">
        <div className="map-nav">
          <NavBar children={navprpos}></NavBar>
        </div>
        {/* 地图容器 */}
        <div id="map-container">
          {/* 运用react-bmapgl插件 */}
          {/* <Map style={{ height: 450 }} center={{lng: 106.5507, lat: 29.5647}} zoom={30} heading={0}
          tilt={40} onClick={e => console.log(e)} enableScrollWheelZoom>
          <Marker position={{lng: 106.5507, lat: 29.5647}} icon={undefined} map={undefined} />
            <NavigationControl map={undefined} /> 
        </Map> */}
        </div>
      </div>
    );
  }
}

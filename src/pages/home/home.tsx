import React, { PureComponent } from "react";
import TabBar from "../../components/tab-bar/tab-bar";
// import TabBar from "@/components/tab-bar/tab-bar";
import "./home.less";
import { Grid, Swiper, Input } from "antd-mobile";
import { getNews, getRentHouse, getSwiperData, getcityList, getcityInfo } from "../../api";
import { AutoComplete } from "react-bmapgl";
import axios from "axios";

export default class Home extends PureComponent {
  state = {
    nowrouter: "/home",
    swiperList: [],
    rentHouseList: [],
    newsList: [],
    curCityName:'',//当前城市名称
  };
  componentDidMount() {
    //获取轮播图
    getSwiperData().then((res: any) => {
      this.setState({
        swiperList: res.body,
      });
    });
    //获取租房信息
    getRentHouse({ area: "AREA|dbf46d32-7e76-1196" }).then((res: any) => {
      this.setState({
        rentHouseList: res.body,
      });
    });
    //获取资讯
    getNews({ area: "AREA|dbf46d32-7e76-1196" }).then((res: any) => {
      this.setState({
        newsList: res.body,
      });
    });
    const myCity =new (window as any).BMapGL.LocalCity();
    myCity.get(this.getLocationCity); 
  }
  //获取地理位置信息--手机优先使用GPS，笔记本等最准确的定位是wife(会因为网络环境经纬度有偏差)
  //h5的地理位置API 通过navigator.geolocation.getCurrentPosition只能获取经纬度信息
  //谷歌浏览器限制了h5的地理位置API获取浏览器经纬度
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position, "经纬度");
      });
    } else {
      console.log("当前不支持获取地理位置");
    }
  }
  //获取当前定位城市
  getLocationCity=(result:any)=>{
    getcityInfo({name:result.name}).then((res:any) => {
      this.setState({
        curCityName:res.body.label
      })

    })
  }
  goPage(path: string, prop: any,params?:any) {
    if(params){
      prop.history.push(path+`/${params.curCityName}`)
    }else {
      prop.history.push(path);
    }
  }
  searchInput(val:string) {
    console.log('输入框的值', val)
  }

  render() {
    let prop = this.props;
    const { swiperList, rentHouseList, newsList, curCityName } = this.state;
    const navImgList = [
      {
        img: require("../../assets/nav-1.png").default,
        text: "整租",
        path: "/renthouse",
      },
      {
        img: require("../../assets/nav-2.png").default,
        text: "合租",
        path: "/renthouse",
      },
      {
        img: require("../../assets/nav-3.png").default,
        text: "地图找房",
        path: "/renthouse",
      },
      {
        img: require("../../assets/nav-4.png").default,
        text: "去出租",
        path: "/renthouse",
      },
    ];
    return (
      <div className="home-div">
        <div className="home-nav">
          <Swiper loop autoplay>
            {swiperList.map((item: any) => (
              <Swiper.Item key={item.id}>
                <div className="home-nav-swiper-item">
                  <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </div>
              </Swiper.Item>
            ))}
          </Swiper>
          <div className="home-nav-search">
            <div className="search-left">
              <div className="search-left-select" onClick={()=>this.goPage('/citylist',prop,{curCityName})}>
                <span>{curCityName}</span>
                <img src={require("../../assets/down-select.png").default} alt=""/>
              </div>
              <div className="search-left-input">
                <img src={require("../../assets/search-input.png").default} alt="" />
                <div>
                <input id="ac" placeholder='请输入小区或地址'/>
                <AutoComplete
                  input="ac"
                  location="北京"
                />
              </div>
                {/* <Input placeholder='请输入小区或地址' clearable
                  onChange={val => {
                    this.searchInput(val)
                  }}
                /> */}
              </div>
            </div>
            <div className="search-right" onClick={() => this.goPage('/map', prop)}>
            {/* <div className="search-right" onClick={() => this.getLocation()}> */}
              <img src={require("../../assets/location.png").default} alt="" />
            </div>
          </div>
        </div>
        <div className="home-nav-second">
          {navImgList.map((item: any, index) => {
            return (
              <div
                className="nav-second-item"
                onClick={() => this.goPage(item.path, prop)}
                key={index}
              >
                <img src={item.img} alt="" />
                <div>{item.text}</div>
              </div>
            );
          })}
        </div>

        <div className="home-div-first">
          <div className="home-div-first-top">
            <span>租房小组</span>
            <span
              onClick={() => {
                this.goPage("/my", prop);
              }}
            >
              更多
            </span>
          </div>
          <div className="home-div-first-content">
            <Grid columns={2} gap={10}>
              {rentHouseList.map((item: any) => {
                return (
                  <Grid.Item key={item.id}>
                    <div className="home-div-first-content-item">
                      <div className="content-item-left">
                        <span>{item.title}</span>
                        <span>{item.desc}</span>
                      </div>
                      <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                    </div>
                  </Grid.Item>
                );
              })}
            </Grid>
          </div>
        </div>
        <div className="home-div-second">
          <p>最新资讯</p>
          {newsList.map((item: any) => {
            return (
              <div className="home-div-second-content" key={item.id}>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                <div className="second-content-item">
                  <div className="second-content-item-title">{item.title}</div>
                  <div className="second-content-item-date">
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h2>首页</h2>

        <TabBar children="/home" {...this.props}></TabBar>
      </div>
    );
  }
}

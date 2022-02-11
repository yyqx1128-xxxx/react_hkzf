import React, { Component, PureComponent } from "react";
import TabBar from "../../components/tab-bar/tab-bar";
import "./home.less";
import { Grid, Swiper } from "antd-mobile";
import { getNews, getRentHouse, getSwiperData, getcityList } from "../../api";

export default class Home extends PureComponent {
  state = {
    nowrouter: "/home",
    swiperList: [],
    rentHouseList: [],
    newsList: [],
  };
  componentDidMount() {
    console.log(this.props,'home')
    getSwiperData().then((res: any) => {
      this.setState({
        swiperList: res.body,
      });
    });
    getRentHouse({ area: "AREA|88cff55c-aaa4-e2e0" }).then((res: any) => {
      this.setState({
        rentHouseList: res.body,
      });
    });
    getNews({ area: "AREA|88cff55c-aaa4-e2e0" }).then((res: any) => {
      this.setState({
        newsList: res.body,
      });
    });
  }
  goPage(path: string) {
    console.log(path);
    // this.props.history.push(path)
  }

  render() {
    const a =1
    const { swiperList, rentHouseList, newsList } = this.state;
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
          <div className="home-nav-second">
            {navImgList.map((item: any, index) => {
              return (
                <div
                  className="nav-second-item"
                  onClick={() => this.goPage(item.path)}
                  key={index}
                >
                  <img src={item.img} alt="" />
                  <div>{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="home-div-first">
          <div className="home-div-first-top">
            <span>租房小组</span>
            <span
              onClick={() => {
                this.goPage("");
              }}
            >
              更多
            </span>
          </div>
          <div className="home-div-first-content">
          <Grid columns={2} gap={10}>
            {rentHouseList.map((item: any) => {
              return <Grid.Item key={item.id}>
                <div className="home-div-first-content-item" >
                  <div className="content-item-left">
                    <span>{item.title}</span>
                    <span>{item.desc}</span>
                  </div>
                  <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </div>
              </Grid.Item>;
            })}
            </Grid>
          </div>
        </div>
        <div className="home-div-second">
          <p>最新资讯</p>
          {newsList.map((item: any) => {
            return <div className="home-div-second-content" key={item.id}>
              <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              <div className="second-content-item">
                <div className="second-content-item-title">
                  {item.title}
                </div>
                <div className="second-content-item-date">
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>;
          })}
        </div>

        <h2>首页</h2>

        <TabBar children="/home" {...this.props}></TabBar>
      </div>
    );
  }
}

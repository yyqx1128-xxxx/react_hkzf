import NavBar from "../../components/nav-bar/nav-bar";
import React, { Component } from "react";
import "./cityList.less";
import { getcityList } from "../../api";

export default class CityList extends Component {
  state = {
    formCityList:{},
    englishalphabetList: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"], //城市索引
    curCityName:'',
    reloadgrayicon: require('../../assets/images/reload-gray-icon.png').default,
    positionLoading:false,
    activeIndex:'A'
  }
  componentDidMount() {
    getcityList({level:'1'}).then((res:any) => {
      this.formatCityData(res.body)
    })
    const {location} = Object(this.props)

    // console.log(location.search,'哈哈哈哈')
  }
  

  //城市数据格式化
  formatCityData = (arr:any) => {
    const { englishalphabetList } = this.state
    let cityList:any = {}
    for(let j in englishalphabetList){
      let encitylist = [];
      for (let i in arr) {
        if ((arr[i].short.slice(0,1)).toUpperCase() ==englishalphabetList[j] ) {
          let ThisCityJSonForm = arr[i];
          encitylist.push(ThisCityJSonForm);
        }
      }
      cityList[englishalphabetList[j]] = encitylist
    }
    this.setState({
      formCityList:cityList
    })
  }
  render() {
    const navprpos = {
      title: "城市选择",
      lefticon: require("../../assets/images/back-icon.png").default,
      leftshow: true,
      prop: this.props,
    };
    const { curCityName, englishalphabetList,reloadgrayicon,positionLoading,formCityList,activeIndex } = this.state
    return (
      <div className="city-div">
        <div className="city-nav">
          <NavBar children={navprpos}></NavBar>
        </div>
        <div className="city-current">
          <div>当前城市<img className={positionLoading?'reload-img':''} src={reloadgrayicon} /></div>
          <div>
            {curCityName?curCityName:'定位失败'}
          </div>
        </div>
        <div className="city-list">
          <div className="city-list-index">
          <div className="city-index-div">
            {
              englishalphabetList.map((item)=>{
                return <div className={`city-index ${item === activeIndex ?"city-index-active":""}`}  key={item}>
                  <span className={`${item === activeIndex ?"city-number-active":""}`}>{item}</span>
                </div>
              })
            }
          </div>
          </div>
          <div className="city-list-div">
            {
             formCityList?Object.keys(formCityList).map((item:any,index)=> {
              return <div className="city-list-item" key={index}>
                <div className="list-item-index">{item}</div>
                { 
                  formCityList[item].map((el:any,eindex:any)=>{
                  return <div className="list-item-text" key={eindex}>{el.label}</div>
                  })
                }
                </div>
             }):''
            }
          </div>
        </div>
      </div>
    );
  }
}

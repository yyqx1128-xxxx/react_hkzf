import NavBar from "../../components/nav-bar/nav-bar";
import { PureComponent } from "react";
import "./cityList.less";
import { getcityHot, getcityList } from "../../api";
import { SpinLoading } from "antd-mobile";
import commonfunction from "../../utils";

export default class CityList extends PureComponent {
  state = {
    formCityList:{},
    indexList:[],
    englishalphabetList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], //城市索引
    curCityName:'',
    reloadgrayicon: require('../../assets/images/reload-gray-icon.png').default,
    positionLoading:false,
    activeIndex:'A',
    hotCitys:[]
  }
  componentDidMount() {
    getcityList({level:'1'}).then((res:any) => {
      this.formatCityData(res.body)
    })
    getcityHot().then((res:any)=>{
      this.setState({
        hotCitys:res.body
      })
    })
    this.setState({
      curCityName:  commonfunction.getcurCity().label
    })
  }
  
  formatIndex = (index:any) =>{
   switch(index) {
     case '#' : return '当前定位城市'
     case '热' : return '热门城市'
     default : return index.toUpperCase()
   }
  }

  //城市数据格式化
  formatCityData = (arr:any) => {

    //第一种
    // const oneCityList = {}//城市列表
    // oneCityList['#']=[]
    // oneCityList['热']=[]
    // arr.map((el:any)=>{
    //   const index = el.short.slice(0,1)
    //   if(oneCityList[index]){
    //     oneCityList[index].push(el)
    //   }else {
    //     oneCityList[index] = [el]
    //   }
    // })
    // const indexList = Object.keys(oneCityList).sort()//索引数据

    //第二种
    const { englishalphabetList, hotCitys } = this.state
    let cityList:any = {}
    cityList['热'] = hotCitys
    for(let j in englishalphabetList){
      let encitylist = [];
      for (let i in arr) {
        if ((arr[i].short.slice(0,1)).toUpperCase() == englishalphabetList[j] ) {
          let ThisCityJSonForm = arr[i];
          encitylist.push(ThisCityJSonForm);
        }
      }
      if(encitylist.length>0) {
        cityList[englishalphabetList[j]] = encitylist
      }
    }
    this.setState({
      formCityList:cityList,
      // formCityList:oneCityList,
      // indexList: indexList
    })
  }
  render() {
    const navprpos = {
      title: "城市选择",
      lefticon: require("../../assets/images/back-icon.png").default,
      leftshow: true,
      prop: this.props,
    };
    const { curCityName,reloadgrayicon,positionLoading,formCityList,activeIndex } = this.state
    return (
      <div className="city-div">
        <div className="city-nav">
          <NavBar children={navprpos}></NavBar>
        </div>
        <div className="city-current">
          <div>当前定位城市<img className={positionLoading?'reload-img':''} src={reloadgrayicon} /></div>
          <div>
            <span>{curCityName?curCityName:'定位失败'}</span>
          </div>
        </div>
        {
          Object.keys(formCityList).length==0?<div className="city-list-load" >
            <SpinLoading />
          </div>:
           <div className="city-list">
           <div className="city-list-index">
           <div className="city-index-div">
             {
                Object.keys(formCityList).length>0?Object.keys(formCityList).map((item)=>{
                 return <div className={`city-index ${item === activeIndex ?"city-index-active":""}`}  key={item}>
                   <span className={`${item === activeIndex ?"city-number-active":""}`}>{item}</span>
                 </div>
               }):''
             }
           </div>
           </div>
           <div className="city-list-div">
             {
              Object.keys(formCityList).length>0?Object.keys(formCityList).map((item:any,index)=> {
               return <div className="city-list-item" key={index}>
                 <div className="list-item-index">{item === '热'?'热门城市':item}</div>
                 {/* <div className="list-item-index">{this.formatIndex(item)}</div> */}
                 { 
                  item === '热'?
                    <div className="list-item-hot">
                      {
                        formCityList[item].map((el:any,eindex:any)=>{
                          return <div key={eindex}>{el.label}</div>
                        })  
                      }
                    </div>
                    :formCityList[item].map((el:any,eindex:any)=>{
                      return <div className='list-item-text' key={eindex}>{el.label}</div>
                    })
                 }
                 </div>
              }):''
             }
           </div>
         </div>
        }
       
      </div>
    );
  }
}

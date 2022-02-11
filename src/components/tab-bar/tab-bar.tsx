
import { Component } from "react";
import { Link } from "react-router-dom";
import './tab-bar.less'

export default class TabBar extends Component {
  state = {
    tabs: [
      { tabName: "首页", id: "index", url:'/home', img: require('../../assets/home.png').default, imgactive:require('../../assets/home-active.png').default },
      { tabName: "找房", id: "ranking", url:'/renthouse', img:require('../../assets/search.png').default, imgactive:require('../../assets/search-active.png').default },
      { tabName: "资讯", id: "task", url:'/news', img:require('../../assets/news.png').default, imgactive:require('../../assets/news-active.png').default  },
      { tabName: "我的", id: "mine", url:'/my', img:require('../../assets/my.png').default, imgactive:require('../../assets/my-active.png').default },
    ],
    current:0,
  };
  componentDidMount(){
    switch(this.props.children){
      case '/home': 
        this.setState({ current: 0 })
        break;
      case '/renthouse': 
        this.setState({ current: 1 })
        break;
      case '/news': 
        this.setState({ current: 2 })
        break;
      case '/my': 
        this.setState({ current: 3 })
        break;
    }
  }
  render() {
    return <div className="tab-div">{
      this.state.tabs.map((item,index)=>{
        return <Link key={index} to={item.url} className={`tab-item ${index === this.state.current ?"tab-active":""}`} >
            <div key={item.id}>
            <div className="tab-item-icon"><img src={index === this.state.current ?item.imgactive : item.img } alt=""/></div>
            <div className="tab-item-name">{item.tabName}</div>
            </div>
        </Link>
      })
      }
    </div>;
  }
}

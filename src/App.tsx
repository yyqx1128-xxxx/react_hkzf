import "./App.less";

import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/home";
import News from "./pages/news/news";
import My from "./pages/my/my";
import RentHouse from "./pages/renthouse/house";
import CityList from "./pages/cityList/cityList";
import MapPage from "./pages/map/map";

function App(this: any) {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/home" component={Home}></Route> */}
        <Route path="/home"render={props => (<Home {...props}></Home>)}></Route>
        <Route path="/renthouse" component={RentHouse}></Route>
        <Route path="/news" component={News}></Route>
        <Route path="/my" component={My}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/map" component={MapPage}></Route>
        {/* <Route path="/my" render={(props)=>(<My children={props}/>)}></Route> */}
        {/* 默认路由---Redirect用于实现路由重定向，to属性指定要跳转的路由 */}
        <Route path="/" exact render={() => <Redirect to="/home"></Redirect>} />
      </Switch>
    </div>
  );
}

export default withRouter(App);

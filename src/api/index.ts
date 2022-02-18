import http from "../providers/http";

//获取轮播图数据
let getSwiperData = () => {
  return http.get("http://localhost:8080/home/swiper");
};
//获取租房小组
let getRentHouse = (params: any = {}) => {
  return http.get("http://localhost:8080/home/groups", params);
};
//获取最新资讯
let getNews = (params: any = {}) => {
  return http.get("http://localhost:8080/home/news", params);
};
//获取城市列表
let getcityList = (params: any = {}) => {
  return http.get("http://localhost:8080/area/city", params);
};
//获取城市列表
let getcityInfo = (params: any = {}) => {
  return http.get("http://localhost:8080/area/info", params);
};

export {
  getSwiperData,
  getRentHouse,
  getNews,
  getcityList,
  getcityInfo,
};

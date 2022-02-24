import { getcityInfo } from "../api";

const commonfunction = {
  getcurCity() {
    const localCity = JSON.parse(String(localStorage.getItem("curCityInfo")));
    //判断本地存储中是否有localCity
    if (!localCity) {
      //没有则 获取定位城市并存储到本地，返回该城市的数据

      const myCity = new (window as any).BMapGL.LocalCity();
      let cityIndo: any = {};
      myCity.get(async (res: any) => {
        getcityInfo({ name: res.name }).then((res: any) => {
          localStorage.setItem(
            "curCityInfo",
            JSON.stringify(res.body ? res.body : "")
          );
          cityIndo = res.body;
        });
      });
      return cityIndo;
    }
    return localCity;
  },
};

export default commonfunction;

import axios from "axios";
axios.defaults.timeout = 30000;

// 添加请求拦截器
axios.interceptors.request.use(function(config:any) {
  // 在发送请求之前做些什么
  if (config.method == "get") {
    if (config.params && config.params.token) {
      config.headers.authorization = config.params.token.replace("%20", " ");
      delete config.params.token;
    }
  } else if (config.method == "post") {
    if (config.data && config.data.token) {
      config.headers.authorization = config.data.token.replace("%20", " ");
      delete config.data.token;
    }
  }
  return config; //添加这一行
  // else{
  //   if (config.data && config.data.token) {
  //     config.headers.authorization = config.data.token;
  //     delete config.data.token
  //   }
  // }
});
// 响应拦截
axios.interceptors.response.use(
  (response:any) => {
    if (response.data.code === 0) {
      return response.data.data;
    } else if (response.data.code === 422) {
      let temp = response.data;
      let key = Object.keys(temp.data)[0];
      // Toast((key && temp.data[key][0]) || temp.message || "参数错误");
      // globalFnClass.params(null, null, 'toLogin');
      // console.error(`${response.data.code} --> ${response.data.messages}`);
      return Promise.reject(response.data.data);
    } else if (![0, 422].includes(response.data.code)) {
      // console.log(response.data)
      if(response.data.code && response.data.code != 0) {
        // Toast(response.data.message)
        return;
      }
      //[50019, 50020,50023,50025,50026,50027,50028,50029,50033,50034,50035,50036,50055,50056,50099,500124,500310,60002]
      return response.data;
    } else {
      // console.error(`${response.data.code} --> ${response.data.messages}`);
      return Promise.reject(response.data);
    }
  },
  (error:any) => {
    if (
      error.response &&
      error.response.config &&
      error.response.config.url == "https://upload-z0.qiniup.com"
    ) {
      return Promise.reject(error);
    } else if (error.response && error.response.status) {
      if (error.response.status === 401) {
        // globalFnClass.NativeInteractive(null, null, "toLogin");
      } else if (error.response.data && error.response.data.message) {
        // Toast(error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

const http = {
  // 封装get请求
  get(url: string, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params,
        })
        .then((res:any) => {
          resolve(res);
        })
        .catch((err:any) => {
          reject(err);
        });
    });
  },
  // 封装post请求
  post(url: string, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, config)
        .then((res:any) => {
          resolve(res);
        })
        .catch((err:any) => {
          reject(err);
        });
    });
  },
  setToken(code: string) {
    if (code) {
      sessionStorage.setItem("code", code);
    } else {
      sessionStorage.removeItem("code");
    }
  },
  setuuid(uuid: string) {
    axios.interceptors.request.use(
      (config:any) => {
        if (uuid) {
          config.headers.uuid = uuid;
        }
        return config;
      },
      (error:any) => {
        return Promise.reject(error);
      }
    );
  },
};

export default http;

import axios from "axios";
import store from "../plugins/store";

axios.defaults.withCredentials = true;
// import Base from "../Base.vue";

// console.log(Base)
// App.message
// App.loadingBar.start();
// message.create('hi');

let baseURL;
let apiVersion = "v1";

const url = {
    dev: "https://www.edge.test/api",
    production: "https://www.edge.test/api",
}


if (process.env.NODE_ENV === "development") {
  baseURL = url.dev;
} else if (process.env.NODE_ENV === "production") {
  baseURL = url.production;
}

baseURL += apiVersion;

// 实例
let instance = axios.create({
  baseURL: baseURL,
  timeout: 15000, // 毫秒
});

instance.interceptors.request.use(
  (config) => {
    if (config.headers === undefined) {
      config.headers = {};
    }

    config.headers["Accept"] = "application/json";
    config.headers["Authorization"] = "Bearer " + store.state.user.api_token;

    window.$loadingBar.start();

    return config;
  },
  (error) => {
    window.$loadingBar.error();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    window.$loadingBar.finish();

    return Promise.resolve(res.data);
  },
  (error) => {
    window.$loadingBar.error();

    window.$message.error(
      error.response.data.message
    );
  }
);

export default instance;

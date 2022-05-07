import axios from "axios";
import store from "../plugins/store";
import api from "../config/api";
import app from "../config/app";
import router from "../plugins/router";

// axios.defaults.withCredentials = true;
// import Base from "../Base.vue";

// console.log(Base)
// App.message
// App.loadingBar.start();
// message.create('hi');

let baseURL;
let apiVersion = "v1";

// const url = {
//     dev: "https://www.leaf.test/api/",
//     production: "https://www.leaf.test/api/",
// }


if (app.buildForProduction) {
    baseURL = api.production;
} else {
    baseURL = api.development;
}


baseURL += apiVersion;

// 实例
let instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});



instance.interceptors.request.use(
    (config) => {
        if (config.headers === undefined) {
            config.headers = {};
        }

        config.headers["Accept"] = "application/json";
        config.headers["Authorization"] = "Bearer " + store.state.token;

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

        // check res has data
        if (res.data === undefined) {


            (res as any) = {
                status: 1,
                data: res,
            }
            res.data.data = res.data;

            console.log(res)
        }

        return Promise.resolve(res);
    },
    (error) => {
        window.$loadingBar.error();

        if (error.response.status === 401) {
            store.commit("setToken", null);
            router.push({ name: "Login" });

        }

        window.$message.error(
            error.response.data.message
        );
    }
);

export default instance;

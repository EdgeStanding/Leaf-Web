import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";

import router from "./plugins/router";
import store from "./plugins/store";

const app = createApp(App);

// app.config.globalProperties.$systemId = "10";

app.use(router).use(store).use(VueAxios, axios);

app.provide("axios", app.config.globalProperties.axios);
app.mount("#app");

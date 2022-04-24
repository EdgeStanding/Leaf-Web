<template>
  <div>
    <div>首页</div>
    <!-- route  link to Products -->
    <router-link to="Products">Products</router-link>
    <router-link to="Login">Login</router-link>

    <div>
      <h1>首页</h1>
      <n-button type="primary">按钮</n-button>
      <n-button type="info">按钮</n-button>

      <n-button type="info">按钮</n-button>
    </div>

    <n-button type="info" @click="logout()">登出</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";

import { useLoadingBar, useMessage } from "naive-ui";
import { onMounted } from "vue";

import axios from "../api/axios";
import store from "../plugins/store";

// onMounted(() => {
//   axios.get("/ping1");
// });

function logout() {
  store.commit("updateUser", []);
}
</script>

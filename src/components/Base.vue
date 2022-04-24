<template>
  <div>
    <n-layout style="height: 100vh">
      <n-layout position="absolute" has-sider>
        <n-layout-sider
          :show-collapsed-content="false"
          v-show="$router.currentRoute.value.name !== 'Login'"
          content-style="padding-left: 15px;padding-right: 15px;"
          :native-scrollbar="false"
          bordered
          collapse-mode="width"
          :collapsed-width="20"
          :width="240"
          show-trigger="arrow-circle"
          :on-update:collapsed="updated()"
        >
          <Menu />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;" :native-scrollbar="true">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
// import LeftMenu from "./components/LeftMenu.vue";
// import { computed } from "@vue/reactivity";
import { ref } from "vue";

import {
  useLoadingBar,
  useMessage,
  useDialog,
  useNotification,
} from "naive-ui";
import Menu from "./Menu.vue";
import router from "../plugins/router";

const routeKey = () => {
  return router.currentRoute.value.name;
};

window.$loadingBar = useLoadingBar();
window.$message = useMessage();
window.$dialog = useDialog();
window.$notification = useNotification();

function updated() {
  // console.log("updated");
}
</script>

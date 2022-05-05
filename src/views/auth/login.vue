<template>
  <h1 v-text="title"></h1>
  <n-space vertical>
    <div>
      <n-button
        v-if="show"
        type="primary"
        @click="toLeaf()"
        :disabled="buttonDisabled"
        >前往 Leaf</n-button
      >
      <p v-else>我们正在将你重定向到 Edge.st Leaf...</p>
    </div>
  </n-space>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { NSpace, NButton } from "naive-ui";
import store from "../../plugins/store";
import http from "../../api/http";
import router from "../../plugins/router";
import api from "../../config/api";

const token = ref("");
const show = ref(false);
const title = ref("连接到 Leaf");
const buttonDisabled = ref(false);

// const user = store.state.user

const connect = () => {
  buttonDisabled.value = true;
  title.value = "正在验证登录...";
  store.commit("updateToken", token.value);
  http
    .get("/user")
    .then((res) => {
      store.commit("updateUser", res.data);

      title.value = "嗨, " + res.data.name;
      buttonDisabled.value = false;

      show.value = true;
      router.push("/");
    })
    .catch((err) => {
      store.commit("updateToken", {
        token: null,
      });
      title.value = "无法验证登录，将在几秒钟后重试。";
      buttonDisabled.value = false;
    });
  token.value = "";
};

// read the router query para
const query = router.currentRoute.value.query;

if (query.token != null) {
  token.value = query.token as string;
  connect();
} else {
  show.value = false;
  setTimeout(toLeaf, 1000)
}

function toLeaf() {
  window.location.href = api.origin + '/?callback=' + encodeURIComponent(window.location.href);
}
</script>

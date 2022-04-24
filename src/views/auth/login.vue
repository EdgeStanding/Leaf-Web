<template>
  <h1 v-text="title"></h1>
  <n-space vertical>
    <n-input
      v-model:value="token"
      type="password"
      name="token"
      placeholder="输入 Token"
      :disabled="buttonDisabled"
    />
    <n-button type="primary" @click="connect" :disabled="buttonDisabled"
      >连接</n-button
    >
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NSpace, NInput, NButton } from "naive-ui";
import store from "../../plugins/store";
import http from "../../api/http";
import router from "../../plugins/router";

const token = ref("im@ivampiresp.com");
const title = ref("连接到 Edge.st");
const buttonDisabled = ref(false);

// const user = store.state.user

const connect = () => {
  buttonDisabled.value = true;
  title.value = "正在验证 Token...";
  store.commit("updateUser", {
    api_token: token.value,
  });
  http
    .get("/user")
    .then((res) => {
      store.commit("updateUser", res.data);

      title.value = "嗨, " + res.data.name;
      buttonDisabled.value = false;

      router.push("/");
    })
    .catch((err) => {
      title.value = "Token 验证失败，请确认 Token 是否正确。";
      buttonDisabled.value = false;
    });
};
</script>

<template>
  <router-view />
  <div v-show="!router.currentRoute.value.meta.hideParent ?? false">
    <div v-for="item in products" :key="item">
      <div v-show="!item.hidden">
        <div v-if="item.price == null">
          <h1>{{ item.name }}</h1>
          <p>{{ item.description }}</p>
        </div>
        <div v-else>
          <p>{{ item.name }}</p>
          <p>{{ item.description }}</p>
          <p v-show="item.feature">推荐</p>
          <p v-show="item.stock > 0">
            <n-button @click="show(item.id)">详情</n-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import http from "../../api/http";
import { ref, defineProps } from "vue";
import router from "../../plugins/router";

const products: any = ref({});

http.get("/products").then(function (response) {
  // console.log(response);
  products.value = response.data;
});

function show(id: number) {
  router.push({ name: "Products.Show", params: { id } });
}
</script>

<style scoped></style>

<template>
  <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
</template>

<script lang="ts" setup>
import { defineComponent, h, Component } from "vue";
import { NIcon, useMessage } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import { HomeOutline, GameControllerOutline } from "@vicons/ionicons5";
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Index",
          },
        },
        { default: () => "首页" }
      ),
    key: "Index",
    icon: renderIcon(HomeOutline),
  },

  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Products",
          },
        },
        { default: () => "Products" }
      ),
    key: "Products",
    icon: renderIcon(GameControllerOutline),
  },

  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Products",
          },
        },
        { default: () => "Products" }
      ),
    key: "Products",
    icon: renderIcon(GameControllerOutline),
  },

  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Pterodactyl",
          },
        },
        { default: () => "Pterodactyl" }
      ),
    key: "Pterodactyl",
    icon: renderIcon(GameControllerOutline),
  },
];

function handleUpdateValue(key: string, item: MenuOption) {
  // window.$message.info("[onUpdate:value]: " + JSON.stringify(key));
  // window.$message.info("[onUpdate:value]: " + JSON.stringify(item));
}
</script>

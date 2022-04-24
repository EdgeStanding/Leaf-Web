<template>
  <div>
    <n-divider />
    <n-h3 style="text-align: center"
      >创建 {{ product?.product?.name ?? null }}
    </n-h3>

    <p style="text-align: center">{{ product?.product?.description }}</p>

    <p>第一步都是设置名称</p>
    <n-input
      v-model:value="setup_environment.name"
      type="text"
      placeholder="你想设置的名称"
    />

    <!-- <n-space> -->
    <p>选择 Egg</p>
    <n-select
      v-model:value="setup_environment.nest_eggs.value"
      :options="setup_environment.nest_eggs.options"
      placeholder="选择 Egg"
      @update:value="updateDockerImage"
    />
    <!-- </n-space> -->

    <br />

    <!-- <n-space> -->
    <p>然后再选择 镜像</p>
    <n-select
      v-model:value="setup_environment.docker_image.value"
      clearable
      :options="setup_environment.docker_image.options"
      :placeholder="
        setup_environment.nest_eggs.value != null
          ? '现在请选择 Docker Image'
          : '选择 Docker Image'
      "
    />
    <!-- </n-space> -->

    <p>你想要什么配置？</p>
    <n-select
      v-model:value="setup_environment.packages.value"
      clearable
      :options="setup_environment.packages.options"
      placeholder="总有一款适合你的。"
    />

    <p>选择一个位置</p>
    <n-select
      v-model:value="setup_environment.nodes.value"
      clearable
      :options="setup_environment.nodes.options"
      placeholder="你想要让服务器架设在哪里？"
    />
  </div>
</template>

<script lang="ts" setup>
import http from "../../api/http";
import router from "../../plugins/router";
import { ref } from "vue";
import { SelectOption } from "naive-ui";
import setup from "naive-ui/lib/radio/src/use-radio";
// import CreateProduct from "../../components/CreateProduct.vue";

let routerParams = router.currentRoute.value.params;
const product: any = ref({});

const setup_environment: any = ref({
  name: null,
  nests: {
    key: null,
    value: null,
    options: [],
  },
  nest_eggs: {
    key: "egg_id",
    value: null,
    options: [],
  },
  packages: {
    key: "package_id",
    value: null,
    options: [],
  },
  locations: {
    key: null,
    value: null,
    options: [],
  },
  nodes: {
    key: "node_id",
    value: null,
    options: [],
  },
  validate: {
    key: null,
    value: null,
    options: [],
  },
  docker_image: {
    key: "docker_image",
    value: null,
    options: [
      {
        label: "请选择 上个选项",
        disabled: true,
      },
    ],
  },
});

const showSelect = ref(false);

http.get("/products/" + routerParams.id).then(function (response) {
  product.value = response.data;

  let temp = null;
  for (let i in response.data.create) {
    // eval("setup_environment.value." + i + " = basic");
    eval("setup_environment.value." + i + ".options = [];");
    temp = [];
    for (let j in response.data.create[i][1]) {
      let current = response.data.create[i][1][j];

      temp.push({
        label: current.name,
        value: current.id,
      });
    }

    eval("setup_environment.value." + i + ".options = temp;");
    temp = [];
  }
  showSelect.value = true;

  // 更新 packages
  updatePackages();

  console.log(setup_environment.value);
});

function updateDockerImage(value: any, option: SelectOption) {
  setup_environment.value.docker_image.value = null;
  // search docker_images from product.value.create.nest_eggs

  let nest_eggs = product.value.create.nest_eggs;

  // console.log(nest_eggs);

  for (let i in nest_eggs[1]) {
    if (nest_eggs[1][i].id == parseInt(value)) {
      let temp = [];
      for (let j in nest_eggs[1][i].docker_images) {
        temp.push({
          label: nest_eggs[1][i].docker_images[j],
          value: nest_eggs[1][i].docker_images[j],
        });
      }

      // console.log(temp);

      setup_environment.value.docker_image.options = temp;

      break;
    }
  }

  // console.log(images);
}

function updatePackages() {
  setup_environment.value.packages.options = [];

  let temp = [];
  for (let i in product.value.create.packages[1]) {
    let p = product.value.create.packages[1][i];
    temp.push({
      label: `CPU数量: ${p.cpu_limit / 100}; 内存: ${p.memory}MB; 磁盘空间: ${
        p.disk_space
      }MB`,
      value: p.id,
    });
  }

  setup_environment.value.packages.options = temp;
}
</script>

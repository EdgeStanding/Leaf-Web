import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "./store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: {
      keepalive: false,
    },
    component: () => view("auth/login"),
  },
  {
    path: "/",
    name: "Index",
    component: () => view("index"),
    meta: {
      auth: true,
      keepalive: true,
    },
  },

  // Products
  {
    path: "/products",
    name: "Products",
    component: () => view("products/index"),
    meta: {
      auth: true,
    },
    children: [
      {
        name: "Products.Show",
        path: ":id",
        component: () => view("products/show"),
        meta: {
          hideParent: true,
        },
      },
    ],
  },

  // Pterodactyl
  {
    path: "/pterodactyl",
    name: "Pterodactyl",
    component: () => view("pterodactyl/index"),
    meta: {
      auth: true,
    },
  },

  // Errors routes
  {
    path: "/errors/404",
    name: "error.404",
    component: () => view("errors/404"),
    meta: {
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function view(fn: string) {
  return import("../views/" + fn + ".vue");
}

router.beforeEach((to, from) => {
  if (to.matched.length === 0) {
    return router.push({ name: "errors.404" });
  }
  if (to.meta.auth ?? true) {
    // 验证是否登录
    if (store.state.user.api_token == null) {
      if (to.name === "Login") {
        return true;
      } else {
        router.push({ name: "Login" });
      }
      return false;
    } else {
      return true;
    }
  } else {
    // 无需登录
    return true;
  }
});

console.log(router.options.routes);

store.subscribe((mutation, state) => {
  if (mutation.payload.length === 0) {
    router.push("/login");
  }
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "./store";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "Login",
        meta: {
            keepalive: false,
            auth: false
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
    // console.log(from)

    // if route need login
    if (to.meta.auth ?? true) {
        // if (to.name === "Login") {
        //     return router.back();
        // }

        // validate login state
        if (store.state.token == null) {
            if (to.name === "Login") {
                return true;
            } else {
                let query = {}
                if (from.query.token != null) {
                    query = { token: from.query.token }
                }
                router.push({ name: "Login", query: query });
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

// console.log(router.options.routes);

store.subscribe((mutation, state) => {
    if (mutation.type === 'updateToken') {
        // get token
        const token = state.token;
        if (token === null) {
            router.push("/login");
        }
    }

});

export default router;

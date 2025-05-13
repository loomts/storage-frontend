import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout.vue";
import menu from "./menu";
import { setupRouterGuards } from "./modules/guard";

Vue.use(VueRouter);

const createRouter = () =>
  new VueRouter({
    routes: [
      {
        path: "/",
        redirect: "/storage/mixedchain",
        component: Layout,
        name: "main",
        meta: {
          title: "首页",
          icon: "fa fa-yx-home",
        },
        children: menu,
      },
      {
        path: "*",
        component: () => import("../views/404.vue"),
        hidden: true,
        meta: {
          title: "404"
        }
      }
    ],
  });

const router = createRouter();

// 设置路由守卫
setupRouterGuards(router);

export default router;

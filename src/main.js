import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./index.scss";
import "./assets/styles/theme.scss";
import App from "@/App.vue";
import store from "@/store";
import router from "@/router";
import themeManager from "@/utils/theme";
import setupErrorHandler from "@/utils/errorHandler";

// 初始化全局错误处理
setupErrorHandler();

// 初始化主题
themeManager.initTheme();

// 使用ElementUI
Vue.use(ElementUI);

// 关闭生产环境提示
Vue.config.productionTip = false;

// 创建Vue实例
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

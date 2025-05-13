/**
 * 设置路由守卫函数
 * @param {VueRouter} router Vue路由实例
 */
export function setupRouterGuards(router) {
  // 路由前置守卫
  router.beforeEach((to, from, next) => {
    // 设置页面标题
    document.title = to.meta.title || '区块链存储';
    next();
  });

  // 路由后置守卫
  router.afterEach(() => {
    // 滚动到顶部
    window.scrollTo(0, 0);
  });
}
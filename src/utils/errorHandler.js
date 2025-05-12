/**
 * 全局错误处理
 */
import Vue from 'vue';
import { Message } from 'element-ui';

const isProd = process.env.NODE_ENV === 'production';

export default function setupErrorHandler() {
  // Vue 错误处理
  Vue.config.errorHandler = (err, vm, info) => {
    if (isProd) {
      Message.error('系统错误，请刷新重试');
    } else {
      console.error('[Vue Error]', err);
      Message.error(`错误: ${err.message}`);
    }
  };

  // 全局Promise错误处理
  window.addEventListener('unhandledrejection', event => {
    event.preventDefault();
    if (!isProd) {
      console.error('[Promise]', event.reason);
    }
  });
}

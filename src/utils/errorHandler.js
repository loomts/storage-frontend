/**
 * 全局错误处理
 */
import Vue from 'vue';
import { Message } from 'element-ui';

const isProd = process.env.NODE_ENV === 'production';

// 处理API错误
export function handleError(error) {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || '请求出错';
    
    if (status === 401) {
      Message.error('未授权，请重新登录');
    } else if (status === 403) {
      Message.error('没有权限访问该资源');
    } else if (status === 404) {
      Message.error('请求的资源不存在');
    } else if (status === 500) {
      Message.error('服务器内部错误');
    } else {
      Message.error(message);
    }
  } else if (error.request) {
    Message.error('网络请求失败，请检查网络连接');
  } else {
    if (isProd) {
      Message.error('请求错误');
    } else {
      console.error('[请求错误]', error.message);
      Message.error(`请求错误: ${error.message}`);
    }
  }
}

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

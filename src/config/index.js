/**
 * 全局配置文件
 */

// 环境配置
const ENV = {
  development: {
    apiBaseUrl: '/api',  // 使用相对路径，确保请求通过代理
    timeout: 30000
  },
};

// 获取当前环境
const currentEnv = process.env.NODE_ENV || 'development';

/**
 * 获取API基础URL
 * @returns {string} API基础URL
 */
export function getBaseURL() {
  return ENV[currentEnv].apiBaseUrl;
}

/**
 * 获取API超时时间
 * @returns {number} API超时时间(毫秒)
 */
export function getTimeout() {
  return ENV[currentEnv].timeout;
}

/**
 * 获取当前环境配置
 * @returns {Object} 环境配置对象
 */
export function getEnvConfig() {
  return ENV[currentEnv];
}

export default {
  ...ENV[currentEnv],
  isDev: currentEnv === 'development',
};

/**
 * 全局配置文件
 */

// 环境配置
const ENV = {
  development: {
    apiBaseUrl: 'http://10.69.46.129:9001/api',
    timeout: 30000
  },
  production: {
    apiBaseUrl: '/api',
    timeout: 60000
  }
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
  isProd: currentEnv === 'production'
};

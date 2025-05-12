/**
 * 常用工具函数
 */

/**
 * 格式化文件大小
 * @param {number} bytes 字节大小
 * @returns {string} 格式化后的文件大小
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 格式化日期
 * @param {Date|string|number} date 日期对象或时间戳
 * @returns {string} 格式化后的日期字符串 YYYY-MM-DD HH:mm:ss
 */
export function formatDate(date) {
  if (!date) return '';
  
  const d = new Date(date);
  
  return d.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * 简化克隆对象
 * @param {any} obj 需要拷贝的对象
 * @returns {any} 拷贝后的新对象
 */
export function clone(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 延迟时间(ms)
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * 节流函数
 * @param {Function} fn 需要节流的函数
 * @param {number} interval 间隔时间(ms)
 */
export function throttle(fn, interval = 300) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 下载文件
 * @param {Blob} blob 文件Blob对象
 * @param {string} filename 文件名
 */
export function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * 生成简单ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * 链上存储相关 API
 */
import request from '../index';

export default {
  /**
   * 写入键值对
   * @param {Object} data - 键值对数据
   * @returns {Promise} 请求结果
   */
  writeKeyValue(data) {
    return request({
      url: '/putkv',
      method: 'post',
      data
    });
  },

  /**
   * 读取键值对
   * @param {string} key - 键名
   * @returns {Promise} 请求结果
   */
  readKeyValue(key) {
    return request({
      url: '/getkv',
      method: 'get',
      params: { key }
    });
  },

  /**
   * Base64编码
   * @param {string} key - 要编码的字符串
   * @returns {Promise} 请求结果
   */
  base64Encode(key) {
    return request({
      url: '/base64encode',
      method: 'get',
      params: { string: key }
    });
  },

  /**
   * Base64解码
   * @param {string} key - 要解码的字符串
   * @returns {Promise} 请求结果
   */
  base64Decode(key) {
    return request({
      url: '/base64decode',
      method: 'get',
      params: { string: key }
    });
  }
};

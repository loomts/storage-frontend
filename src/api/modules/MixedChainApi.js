/**
 * 协同存储相关 API
 */
import request from '../index';

export default {
  /**
   * 混合存储上传
   * @param {FormData} formData - 包含文件的FormData
   * @returns {Promise} 请求结果
   */
  coStorage(formData) {
    return request({
      url: '/coStorage',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  /**
   * 混合存储下载
   * @param {string} id - 文件ID
   * @returns {Promise} 请求结果，响应类型为blob
   */
  coDownload(id) {
    return request({
      url: '/coDownload',
      method: 'get',
      params: { id },
      responseType: 'blob'
    });
  },
  
  /**
   * 获取混合存储的文件列表
   * @returns {Promise} 请求结果
   */
  listCoObjects() {
    return request({
      url: '/listCoObjects',
      method: 'get'
    });
  }
};

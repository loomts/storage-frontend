/**
 * 链下存储相关 API
 */
import request from '../index';

export default {
  /**
   * 上传文件到链下存储
   * @param {FormData} formData - 包含文件的FormData
   * @returns {Promise} 请求结果
   */
  uploadFile(formData) {
    return request({
      url: '/offChainUploadFile',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  /**
   * 从链下存储下载文件
   * @param {string} id - 文件ID
   * @returns {Promise} 请求结果，响应类型为blob
   */
  downloadFile(id) {
    return request({
      url: '/offChainDownloadFile',
      method: 'get',
      params: { id },
      responseType: 'blob'
    });
  },

  /**
   * 获取链下存储的文件列表
   * @returns {Promise} 请求结果
   */
  listObjects() {
    return request({
      url: '/listObjects',
      method: 'get'
    });
  }
};

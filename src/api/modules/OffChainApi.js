/**
 * 链下存储相关 API
 */
import request from '../index';

export default {
  /**
   * 上传文件到链下存储
   * @param {FormData} formData - 包含文件的FormData
   * @param {string} storageType - 存储类型，'ceph'或'ipfs'
   * @returns {Promise} 请求结果
   */
  uploadFile(formData, storageType) {
    return request({
      url: storageType === 'ipfs' ? '/ipfsupload' : '/cephupload',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  /**
   * 从链下存储下载文件
   * @param {string} id - 文件ID
   * @param {string} storageType - 存储类型，'ceph'或'ipfs'
   * @returns {Promise} 请求结果，响应类型为blob
   */
  downloadFile(id, storageType) {
    return request({
      url: storageType === 'ipfs' ? '/ipfsdownload' : '/cephdownload',
      method: 'get',
      params: { id },
      responseType: 'blob'
    });
  },

  /**
   * 获取链下存储的文件列表
   * @param {string} storageType - 存储类型，'ceph'或'ipfs'
   * @returns {Promise} 请求结果
   */
  listObjects(storageType) {
    return request({
      url: storageType === 'ipfs' ? '/ipfslist' : '/cephlist',
      method: 'get'
    });
  },

  /**
   * 删除链下存储中的文件
   * @param {string} id - 文件ID
   * @param {string} storageType - 存储类型，'ceph'或'ipfs'
   * @returns {Promise} 请求结果
   */
  deleteFile(id, storageType) {
    return request({
      url: storageType === 'ipfs' ? '/ipfsdelete' : '/cephdelete',
      method: 'delete',
      params: { id: id }
    });
  },

  /**
   * 检查存储系统健康状态
   * @param {string} storageType - 存储类型，'ceph'或'ipfs'
   * @returns {Promise} 请求结果
   */
  checkHealth(storageType) {
    return request({
      url: storageType === 'ipfs' ? '/ipfshealth' : '/cephhealth',
      method: 'get'
    });
  }
};

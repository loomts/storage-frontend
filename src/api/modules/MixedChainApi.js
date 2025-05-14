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
      url: '/costorage',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  /**
   * 混合存储下载
   * @param {string} id - 文件ID
   * @param {string} onChainType - 链上存储类型，默认为'tendermint'
   * @param {string} offChainType - 链下存储类型，'ceph'或'ipfs'
   * @param {boolean} metadataOnly - 是否只获取元数据
   * @param {boolean} autoDetect - 是否自动检测存储类型
   * @returns {Promise} 请求结果，响应类型为blob
   */
  coDownload(id, onChainType = 'tendermint', offChainType = 'ceph', metadataOnly = false, autoDetect = true) {
    return request({
      url: '/codownload',
      method: 'get',
      params: { 
        id,
        on_chain_type: onChainType,
        off_chain_type: offChainType,
        metadata_only: metadataOnly,
        auto_detect: autoDetect
      },
      responseType: 'blob'
    });
  },
  
  /**
   * 获取混合存储的文件列表
   * @returns {Promise} 请求结果
   */
  listCoObjects() {
    return request({
      url: '/colist',
      method: 'get'
    });
  },

  /**
   * 获取EC编码信息
   * @returns {Promise} 请求结果
   */
  getECInfo() {
    return request({
      url: '/ecinfo',
      method: 'get'
    });
  },

  /**
   * 获取分片信息
   * @returns {Promise} 请求结果
   */
  getShardInfo() {
    return request({
      url: '/shardinfo',
      method: 'get'
    });
  }
};

import request from '..';

/**
 * 特征提取方法API
 */
export default {
  /**
   * 获取特定文件类型可用的特征提取方法
   * @param {string} type - 文件类型，如'number'、'text'、'image'、'sequence'、'video'
   * @returns {Promise} 请求结果
   */
  getExtractionMethods(type) {
    return request({
      url: '/getExtractionMethods',
      method: 'get',
      params: { type }
    });
  }
};

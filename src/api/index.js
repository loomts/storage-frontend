import axios from 'axios';
import { getBaseURL, getTimeout } from '@/config';
import { handleError } from '@/utils/errorHandler';

const service = axios.create({
    baseURL: getBaseURL(),
    withCredentials: false, // 修改为false，因为我们使用的是跨域API
    timeout: getTimeout()
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求前做些处理
        return config;
    }, 
    error => {
        // 处理请求错误
        handleError(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做处理
        return response.data;
    },
    error => {
        // 处理响应错误
        handleError(error);
        return Promise.reject(error);
    }
)

export default service;
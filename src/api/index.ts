import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://182.92.164.178:1024/api',
  timeout: 10000, // 可选：设置请求超时时间
});

export default apiClient;

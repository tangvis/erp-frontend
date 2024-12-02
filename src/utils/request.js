import store from '@/store'
import axios from 'axios'
import { getCookie } from './cookies'  // Import the getCookie function

// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:8081", // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true, // Add this line to enable cookies
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// Request interceptor (add this if you need to handle requests)
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // Handle rate limit error
    if (response.status === 429) {
      // alert('Too many requests. Please try again later.')
      return Promise.reject(new Error('Too many requests'))
    }

    if (response.status !== 200) {
      // alert('unknown status code', response.status)
      return Promise.reject(new Error('unknown status code', response.status))
    }

    // Handle business code errors
    if (res.code !== 0) {
      if (res.code === -8911001) {
        // Login error, needs to re-login
        // alert('Login expired. Please log in again.')
        store.dispatch('frontLogOut').then(() => {
          router.push('/'); // redirect to login page, adjust path as needed
        });
        return Promise.reject(new Error('Login expired'))
      } else {
        // Other business code errors
        // alert(res.message || 'Error');
        return Promise.reject(new Error(res.message || 'Error'))
      }
    }

    // If no error, return data
    return res.data
  },
  error => {
    // Handle fatal errors
    // alert(error.message || 'Request failed')
    return Promise.reject(error);
  }
)

export default service

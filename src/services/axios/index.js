import axios from 'axios'
import store from 'store'
import { notification } from 'ant-design-vue'
import config from '@/configs'

console.log(config)

const apiClient = axios.create({
  baseURL: config.api.base,
  timeout: 2000,
  headers: { 'X-Client-Type': 'tpm-dashboard' },
})

apiClient.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    request.headers.AccessToken = accessToken
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data) {
    notification.warning({
      message: data.error || data.message || 'Someting is wrong, try it later...',
    })
  }
})

export default apiClient

import axios from 'axios'
import env from '../../env'

export const api = axios.create({
  baseURL: env.apiUrl,
})

// Request interceptor — loga antes de enviar
if ('debugRequests' in env && env.debugRequests) {
  console.log(
    'Debug Requests is enabled. Logging all API requests and responses.',
  )
  api.interceptors.request.use((request) => {
    console.log('➡️ REQUEST:', request.method?.toUpperCase(), request.url)
    console.log('Headers:', request.headers)
    console.log('Body:', request.data)
    return request
  })
}

// Response interceptor — loga ao receber resposta
if ('debugRequests' in env && env.debugRequests) {
  api.interceptors.response.use(
    (response) => {
      console.log('✅ RESPONSE:', response.status, response.config.url)
      console.log('Data:', response.data)
      return response
    },
    (error) => {
      console.error('❌ ERROR:', error.response?.status, error.config?.url)
      console.error('Error Data:', error.response?.data)
      return Promise.reject(error)
    },
  )
}

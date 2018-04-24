import axios from 'axios'

const axiosInstace = axios.create({
  baseURL: process.env.API
})

// Interceptar request para enviar el encabezado de autorización
axiosInstace.interceptors.request.use(config => {
  // Enviar el token si existe en LocalStorage
  let token = localStorage.getItem('token')
  if (token !== null) {
    config['headers']['Authorization'] = 'JWT ' + token
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstace
}

'use client'

import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { env } from '../../config/env'


const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = error.response.data.message || 'Invalid request'
          break
        case 401:
          error.message = 'Credenciales incorrectas'
          if (
            !error.config.url?.includes('/login') &&
            useAuthStore.persist.hasHydrated()
          ) {
            useAuthStore.getState().logout()
            if (
              typeof window !== 'undefined' &&
              !window.location.pathname.includes('/login')
            ) {
              window.location.href = '/user/login'
            }
          }
          break
        case 403:
          error.message = 'Acceso denegado'
          break
        case 404:
          error.message = 'Recurso no encontrado'
          break
        case 500:
          error.message = 'Error del servidor'
          break
        default:
          error.message = error.response.data.message || 'Ha ocurrido un error'
      }
    } else if (error.request) {
      error.message = 'No se recibió respuesta del servidor'
    } else {
      error.message = 'Error al realizar la solicitud'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

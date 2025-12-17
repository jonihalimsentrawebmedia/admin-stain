import axios, { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

AxiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get('token')
    const headers = new AxiosHeaders({
      ...config.headers,
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    })

    return {
      ...config,
      headers,
      withCredentials: false,
    }
  },
  (err: AxiosError) => Promise.reject(err)
)

AxiosClient.interceptors.response.use(
  (res: any): any => {
    return {
      ...res,
    }
  },
  async (error: AxiosError) => {
    if (error.response === undefined) {
      const errorMessage = 'Sorry, something went wrong on Our Server'
      return Promise.reject({
        response: {
          status: 500,
          data: {
            error: {
              status: 500,
              message: errorMessage,
            },
          },
        },
      })
    }
    if (error.status === 401) {
      const token = Cookies.get('token')
      if (token) {
        Cookies.remove('token')
        window.location.href = '/'
      } else {
        Cookies.remove('token')
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

export default AxiosClient

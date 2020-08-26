import apiClient from '@/services/axios'
import store from 'store'
import config from '@/configs'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

// Utils functions
export async function persistToken(accessToken) {
  Cookies.set('TPM_ADMIN_ACCESS_TOKEN', accessToken, { expires: 7, path: '', sameSite: 'Lax' })
}

export function retrieveAccount() {
  const token = Cookies.get('TPM_ADMIN_ACCESS_TOKEN')
  return token ? jwt.decode(token) : null
}

// Login with basic auth
export async function login(identity, password) {
  return apiClient
    .post(config.api.auth.login, { identity, password })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
          persistToken(accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function register(name, username, email, password) {
  return apiClient
    .post(config.api.auth.register, { name, username, email, password })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
          persistToken(accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function currentAccount() {
  // if the local access token already exist
  return retrieveAccount() || apiClient
    .get(config.api.auth.account)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function logout() {
  return apiClient
    .get('/auth/logout')
    .then(() => {
      store.remove('accessToken')
      Cookies.remove('TPM_ADMIN_ACCESS_TOKEN')
      return true
    })
    .catch(err => console.log(err))
}

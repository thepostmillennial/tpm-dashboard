const BASE_URL = process.env.VUE_APP_BASE_API

export default {
  api: {
    base: BASE_URL,
    auth: {
      login: `${BASE_URL}/auth/login`,
      logout: `${BASE_URL}/auth/logout`,
      register: `${BASE_URL}/auth/register`,
      reset: `${BASE_URL}/auth/reset`,
      account: `${BASE_URL}/auth/account`,
    },
  },
}

const BASE_URL = process.env.VUE_APP_BASE_API

export default {
  api: {
    base: BASE_URL,
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      register: '/auth/register',
      reset: '/auth/reset',
      account: '/auth/account',
    },
    content: {
      editorspicks: '/auth/editorspicks',
    },
  },
}

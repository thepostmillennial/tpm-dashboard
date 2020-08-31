const BASE_URL = process.env.VUE_APP_BASE_API

export default {
  access_token_name: 'TPM_ACCESS_TOKEN',
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
    members: {
      members: '/members',
    },
    system: {
      users: '/users',
      user_by_username: '/users/username',
    },
  },
}

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
    cms: {
      base: '/cms',
      posts: '/cms/posts',
      posts_count: '/cms/posts/count',
    },
    content: {
      base: '/content',
      pick: '/content/pick',
      picks: '/content/picks',
      picks_redis: '/content/picks/redis',
      picks_count: '/content/picks/count',
    },
    members: {
      members: '/members',
      count: '/members/count',
    },
    contributions: {
      base: '/contributions',
      count: '/contributions/count',
      reminders: '/contributions/reminders',
      reminders_count: '/contributions/reminders/count',
    },
    system: {
      users: '/users',
      user_by_username: '/users/username',
    },
  },
}

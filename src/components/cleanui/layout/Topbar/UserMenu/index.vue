<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft" @visibleChange="addCount">
    <div :class="$style.dropdown">
      <a-badge :count="count">
        <a-avatar shape="square" icon="user" size="large" :class="$style.avatar" />
      </a-badge>
    </div>
    <a-menu slot="overlay">
      <a-menu-item>
        <div>
          <strong>{{ $t('topBar.profileMenu.hello') }}, {{ user.name || 'Anonymous' }}</strong>
        </div>
        <div>
          <strong class="mr-1">{{ $t('topBar.profileMenu.billingPlan') }}:</strong>
          Professional
        </div>
        <div>
          <strong class="mr-1">{{ $t('topBar.profileMenu.roles') }}:</strong>
          {{ user.roles || '—' }}
        </div>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <div>
          <strong class="mr-1">{{ $t('topBar.profileMenu.email') }}:</strong>
          {{ user.email || '—' }}
        </div>
        <div>
          <strong class="mr-1">{{ $t('topBar.profileMenu.phone') }}:</strong>
          {{ user.phone || '—' }}
        </div>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a href="javascript: void(0);">
          <i class="fe fe-user mr-2"></i>
          {{ $t('topBar.profileMenu.editProfile') }}
        </a>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a href="javascript: void(0);" @click="logout">
          <i class="fe fe-log-out mr-2"></i>
          {{ $t('topBar.profileMenu.logout') }}
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    loading() {
      return this.$store.state.user.loading
    },
  },
  data: function () {
    return {
      count: 7,
    }
  },
  methods: {
    addCount() {
      this.count++
    },
    logout() {
      this.$store.dispatch('user/LOGOUT')
    },
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>

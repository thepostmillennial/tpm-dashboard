<template>
  <a-layout-sider
    :width="settings.leftMenuWidth"
    :collapsible="settings.isMobileView ? false : true"
    :collapsed="settings.isMenuCollapsed && !settings.isMobileView"
    @collapse="onCollapse"
    :class="{
      [$style.menu]: true,
      [$style.white]: settings.menuColor === 'white',
      [$style.gray]: settings.menuColor === 'gray',
      [$style.dark]: settings.menuColor === 'dark',
      [$style.unfixed]: settings.isMenuUnfixed,
      [$style.shadow]: settings.isMenuShadow,
    }"
  >
    <div
      :class="$style.menuOuter"
      :style="{
        width: settings.isMenuCollapsed && !settings.isMobileView ? '80px' : settings.leftMenuWidth + 'px',
        height: settings.isMobileView || settings.isMenuUnfixed ? 'calc(100% - 64px)' : 'calc(100% - 110px)',
      }"
    >
      <div :class="$style.logoContainer">
        <div :class="$style.logo">
          <img src="/resources/images/dashboard.svg" class="mr-2" style="width: 24px" alt="TPM Dashboard" />
          <div :class="$style.name">{{ settings.logo }}</div>
        </div>
      </div>
      <vue-custom-scrollbar
        :style="{
          height: settings.isMobileView || settings.isMenuUnfixed ? 'calc(100vh - 64px)' : 'calc(100vh - 110px)',
        }"
      >
        <a-menu
          forceSubMenuRender
          :inlineCollapsed="settings.isMobileView ? false : settings.isMenuCollapsed"
          :mode="'inline'"
          :selectedKeys="selectedKeys"
          :openKeys.sync="openKeys"
          @click="handleClick"
          @openChange="handleOpenChange"
          :inlineIndent="15"
          :class="$style.navigation"
        >
          <template v-for="(item, index) in menu">
            <template v-if="hasPermission(item.roles)">
              <a-menu-item-group :key="index" v-if="item.category">
                <template slot="title">{{ item.title }}</template>
              </a-menu-item-group>
              <item v-if="!item.children && !item.category" :menu-info="item" :styles="$style" :key="item.key" />
              <sub-menu v-if="item.children" :menu-info="item" :styles="$style" :key="item.key" />
            </template>
          </template>
        </a-menu>
      </vue-custom-scrollbar>
    </div>
  </a-layout-sider>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from 'store'
import find from 'lodash/find'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import SubMenu from './partials/submenu'
import Item from './partials/item'

export default {
  name: 'menu-left',
  components: { vueCustomScrollbar, SubMenu, Item },
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
    }
  },
  methods: {
    hasPermission(roles) {
      return roles ? roles.some((r) => this.user.roles.includes(r)) : true
    },
    onCollapse: function (collapsed, type) {
      const value = !this.settings.isMenuCollapsed
      this.$store.commit('CHANGE_SETTING', { setting: 'isMenuCollapsed', value })
    },
    handleClick(e) {
      if (e.key === 'settings') {
        this.$store.commit('CHANGE_SETTING', { setting: 'isSettingsOpen', value: true })
        return
      }
      store.set('app.menu.selectedKeys', [e.key])
      this.selectedKeys = [e.key]
    },
    handleOpenChange(openKeys) {
      store.set('app.menu.openedKeys', openKeys)
      this.openKeys = openKeys
    },
    setSelectedKeys() {
      const pathname = this.$route.path
      const menuData = this.menu.concat()
      const flattenItems = (items, key) =>
        items.reduce((flattenedItems, item) => {
          flattenedItems.push(item)
          if (Array.isArray(item[key])) {
            return flattenedItems.concat(flattenItems(item[key], key))
          }
          return flattenedItems
        }, [])
      const selectedItem = find(flattenItems(menuData, 'children'), ['url', pathname])
      this.selectedKeys = selectedItem ? [selectedItem.key] : []
    },
  },
  watch: {
    'settings.isMenuCollapsed'() {
      this.openKeys = []
    },
    $route() {
      this.setSelectedKeys()
    },
  },
  computed: {
    ...mapState(['settings']),
    ...mapState(['menu']),
    ...mapGetters('user', ['user']),
  },
  mounted() {
    this.openKeys = store.get('app.menu.openedKeys') || []
    this.selectedKeys = store.get('app.menu.selectedKeys') || []
    this.setSelectedKeys()
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>

import 'ant-design-vue/lib/style/index.less' // antd core styles
import './components/kit/vendors/antd/themes/default.less' // default theme antd components
import './components/kit/vendors/antd/themes/dark.less' // dark theme antd components
import './global.scss' // app & third-party component styles

import Vue from 'vue'
import VuePageTitle from 'vue-page-title'
import NProgress from 'vue-nprogress'
import VueLayers from 'vuelayers'
import BootstrapVue from 'bootstrap-vue'
import moment from 'vue-moment'
import animated from 'animate.css'

import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './localization'
import './antd'
import './registerServiceWorker'

// mocking api
import './services/axios/fakeApi'

Vue.use(animated)
Vue.use(moment)
Vue.use(BootstrapVue)
Vue.use(VueLayers)
Vue.use(NProgress)
Vue.use(VuePageTitle, {
  prefix: 'TPM Dashboard | ',
  router,
})

Vue.config.productionTip = false
const nprogress = new NProgress({ parent: 'body' })

new Vue({
  router,
  store,
  nprogress,
  i18n,
  render: (h) => h(App),
}).$mount('#app')

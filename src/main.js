// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import './common'
// import i18n from '@/locale'
import config from '@/config'
import 'iview/dist/styles/iview.css'
import env from '../config/env'
import AppTable from '@/components/app/app-table'
import AppDatePicker from '@/components/app/app-date-picker'
if (env === 'development') require('@/mock')

Vue.use(iView)
Vue.config.productionTip = false

Vue.component('AppTable', AppTable)
Vue.component('AppDatePicker', AppDatePicker)

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  render: h => h(App)
})

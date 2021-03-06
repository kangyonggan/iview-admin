// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import './common'
import '@/locale'
import config from '@/config'
import 'iview/dist/styles/iview.css'
import env from '../config/env'
import './components/app/table'
import './components/app/data-picker'
import './components/app/modal'
import './components/app/tree'
import './components/app/form'
import './components/app/markdown'
import './components/app/select-category'
import './components/app/drop-down'
import './components/app/md-pretty'
if (env === 'development') require('@/mock')

Vue.use(iView)
Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

iView.Notice.config({
  duration: 1.5
})

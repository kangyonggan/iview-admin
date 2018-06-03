import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZhCn from './lang/zh-CN'
import customEnUs from './lang/en-US'
import zhLocale from 'iview/src/locale/lang/zh-CN'
import enLocale from 'iview/src/locale/lang/en-US'

Vue.use(VueI18n)
Vue.config.lang = 'zh-CN'

// 多语言配置
const mergeZH = Object.assign(zhLocale, customZhCn)
const mergeEN = Object.assign(enLocale, customEnUs)
Vue.locale('zh-CN', mergeZH)
Vue.locale('en-US', mergeEN)

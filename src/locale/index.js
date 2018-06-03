import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZhCn from './lang/zh-CN'
import customEnUs from './lang/en-US'
import zhLocale from 'iview/src/locale/lang/zh-CN'
import enLocale from 'iview/src/locale/lang/en-US'

Vue.use(VueI18n)

// 自动设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
const lang = window.localStorage.lang || localLang || 'zh-CN'

Vue.config.lang = lang

// 多语言配置
const mergeZH = Object.assign(zhLocale, customZhCn)
const mergeEN = Object.assign(enLocale, customEnUs)
Vue.locale('zh-CN', mergeZH)
Vue.locale('en-US', mergeEN)

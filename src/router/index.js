import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import iView from 'iview'
import {loadRoutes} from './routers'
import {getToken, getLockStatus} from '@/libs/util'

Vue.use(Router)
const router = new Router()
loadRoutes(router)

const LOCK_PAGE_NAME = 'lock_page'
const LOGIN_PAGE_NAME = 'login'
const IS_LOCKED = getLockStatus()

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '404'
  iView.LoadingBar.start()
  if (IS_LOCKED && to.name !== LOCK_PAGE_NAME) {
    // 当前是锁定状态并且用户要跳转到的页面不是解锁页面
    next({
      replace: true, // 重定向到解锁页面
      name: LOCK_PAGE_NAME
    })
  } else if (IS_LOCKED && to.name === LOCK_PAGE_NAME) {
    // 当前未锁定且用户要跳转到的页面是解锁页面
    next(false) // 不做跳转
  } else {
    const token = getToken()
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      next({
        name: 'home' // 跳转到home页
      })
    } else {
      store.dispatch('getUserInfo').then(data => {
        if (data) {
          next()
        }
      })
    }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
